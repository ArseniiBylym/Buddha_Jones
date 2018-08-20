// Initializes the `billingEstimate` service on path `/billing-estimate`
const createService = require('feathers-sequelize');
const createModel = require('../../models/billing-estimate.model');
const hooks = require('./billing-estimate.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/billing-estimate', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('billing-estimate');

  service.hooks(hooks);
};
