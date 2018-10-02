// Initializes the `timeEntry` service on path `/time-entry`
const createService = require('feathers-sequelize');
const createModel = require('../../models/time-entry.model');
const hooks = require('./time-entry.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/time-entry', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('time-entry');

  service.hooks(hooks);
};
