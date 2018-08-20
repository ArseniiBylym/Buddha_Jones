// Initializes the `projectPermissions` service on path `/project-permissions`
const createService = require('feathers-sequelize');
const createModel = require('../../models/project-permissions.model');
const hooks = require('./project-permissions.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/project-permissions', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('project-permissions');

  service.hooks(hooks);
};
