// Initializes the `timeEntryPermission` service on path `/time-entry-permission`
const createService = require('feathers-sequelize');
const createModel = require('../../models/time-entry-permission.model');
const hooks = require('./time-entry-permission.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/time-entry-permission', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('time-entry-permission');

  service.hooks(hooks);
};
