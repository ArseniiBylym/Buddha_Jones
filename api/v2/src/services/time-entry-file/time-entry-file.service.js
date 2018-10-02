// Initializes the `timeEntryFile` service on path `/time-entry-file`
const createService = require('feathers-sequelize');
const createModel = require('../../models/time-entry-file.model');
const hooks = require('./time-entry-file.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/time-entry-file', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('time-entry-file');

  service.hooks(hooks);
};
