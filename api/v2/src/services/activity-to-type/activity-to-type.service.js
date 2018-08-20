// Initializes the `activityToType` service on path `/activity-to-type`
const createService = require('feathers-sequelize');
const createModel = require('../../models/activity-to-type.model');
const hooks = require('./activity-to-type.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/activity-to-type', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('activity-to-type');

  service.hooks(hooks);
};
