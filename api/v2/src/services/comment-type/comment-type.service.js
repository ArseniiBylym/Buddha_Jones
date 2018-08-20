// Initializes the `commentType` service on path `/comment-type`
const createService = require('feathers-sequelize');
const createModel = require('../../models/comment-type.model');
const hooks = require('./comment-type.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/comment-type', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('comment-type');

  service.hooks(hooks);
};
