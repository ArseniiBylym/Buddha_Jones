// Initializes the `userTypeProjectPermission` service on path `/user-type-project-permission`
const createService = require('feathers-sequelize');
const createModel = require('../../models/user-type-project-permission.model');
const hooks = require('./user-type-project-permission.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/user-type-project-permission', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('user-type-project-permission');

  service.hooks(hooks);
};
