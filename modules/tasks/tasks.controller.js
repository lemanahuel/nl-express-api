const _ = require('lodash');
const async = require('async');
const Cloudy = require('../../integrations/cloudinary');
const Sendgrid = require('../../integrations/sendgrid');
const TaskModel = require('./tasks.model');

module.exports = class Tasks {
  static create(req, res) {
    TaskModel.create(req.body).then(doc => { res.send(doc); }, err => { res.status(500).send(err); });
  }

  static list(req, res) {
    let q = req.query;
    let findParams = { enable: true };
    let queryParams = {};

    if (q.sort) {
      queryParams.sort = q.sort;
    }
    if (q.filter) {
      findParams[_.replace(q.filter, '-', '')] = _.indexOf(q.filter, '-') > -1 ? false : true;
    }


    TaskModel.find(findParams, null, queryParams).lean().exec().then(doc => {
      res.send(doc);
    }, err => {
      res.status(500).send(err);
    });
  }

  static read(req, res) {
    TaskModel.findById(req.params.id).lean().exec().then(doc => { res.send(doc); }, err => { res.status(500).send(err); });
  }

  static update(req, res) {
    TaskModel.findByIdAndUpdate(taskId, body, { new: true, safe: true }).lean().exec().then(doc => { res.send(doc); }, err => { res.status(500).send(err); })
  }

  static updateCompleted(req, res) {
    TaskModel.findByIdAndUpdate(req.params.id, {
      completed: req.body.completed
    }, { new: true, safe: true }).lean().exec().then(doc => {
      Sendgrid.send({
        task: doc
      }).then(() => {
        res.send(doc);
      }, err => { res.status(500).send(err); });
    }, err => { res.status(500).send(err); });
  }

  static async updateImages(req, res) {
    let images = await Cloudy.uploadImages(req.files);
    let taskTmp = await TaskModel.findById(req.params.id).select('images').lean().exec();

    TaskModel.findByIdAndUpdate(taskTmp._id, {
      images: _.concat(taskTmp.images || [], _.map(images, img => img.url))
    }).lean().exec().then(doc => { res.send(doc); }, err => { res.status(500).send(err); });
  }

  static delete(req, res) {
    // TaskModel.findByIdAndRemove(req.params.id).lean().exec().then(doc => {       res.send(doc);     }, err => {       res.status(500).send(err);     });
    TaskModel.findByIdAndUpdate(req.params.id, {
      enable: false
    }).lean().exec().then(doc => { res.send(doc); }, err => { res.status(500).send(err); });
  }
};