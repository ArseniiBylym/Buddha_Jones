// Initializes the `billingStatus` service on path `/billing-status`
const createService = require('feathers-sequelize');
const createModel = require('../../models/billing-status.model');
const hooks = require('./billing-status.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/billing-status', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('billing-status');

  service.hooks(hooks);
};
