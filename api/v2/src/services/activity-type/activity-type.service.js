// Initializes the `activityType` service on path `/activity-type`
const createService = require('feathers-sequelize');
const createModel = require('../../models/activity-type.model');
const hooks = require('./activity-type.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/activity-type', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('activity-type');

  service.hooks(hooks);
};
