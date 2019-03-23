const TasksController = require('./tasks.controller');
const middlewares = require('../../middlewares/middlewares');

module.exports = app => {
  app.route('/tasks')
    .get(TasksController.list)
    .post(middlewares.isValidDomain, TasksController.create)
  app.route('/tasks/:id')
    .get(TasksController.read)
    .put(middlewares.isValidDomain, TasksController.update)
    .delete(middlewares.isValidDomain, TasksController.delete);
  app.route('/tasks/:id/completed')
    .put(middlewares.isValidDomain, TasksController.updateCompleted)
  app.route('/tasks/:id/images')
    .put(middlewares.isValidDomain, TasksController.updateImages)
};