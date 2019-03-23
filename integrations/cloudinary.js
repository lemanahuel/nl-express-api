
const config = require('../config/config');
const Cloudinary = require('cloudinary');
const async = require('async');
const _ = require('lodash');

Cloudinary.config({
  url: config.CLOUDINARY_URL
});

module.exports = class Cloudy {

  static uploadImages(images) {
    return new Promise((resolve, reject) => {
      let uploaded = [];
      async.each(images.file, (file, cb) => {
        if (file && file.data) {
          Cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.data.toString('base64')}`, res => {
            uploaded.push({
              url: res.url ? res.url.replace(/http:\/\//, 'https://') : res.url
            });
            cb(null);
          });
        } else {
          cb(null);
        }
      }, err => {
        if (!err) {
          return resolve(uploaded);
        }
        return reject(err);
      });
    });
  }

}