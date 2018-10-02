// Initializes the `timeApprovalPermission` service on path `/time-approval-permission`
const createService = require('feathers-sequelize');
const createModel = require('../../models/time-approval-permission.model');
const hooks = require('./time-approval-permission.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/time-approval-permission', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('time-approval-permission');

  service.hooks(hooks);
};
