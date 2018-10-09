// Initializes the `projectHistory` service on path `/project-history`
const createService = require('feathers-sequelize');
const createModel = require('../../models/project-history.model');
const hooks = require('./project-history.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/project-history', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('project-history');

  service.hooks(hooks);
};
