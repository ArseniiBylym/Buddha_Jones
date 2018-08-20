// Initializes the `billingApproval` service on path `/billing-approval`
const createService = require('feathers-sequelize');
const createModel = require('../../models/billing-approval.model');
const hooks = require('./billing-approval.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/billing-approval', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('billing-approval');

  service.hooks(hooks);
};
