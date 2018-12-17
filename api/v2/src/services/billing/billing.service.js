// Initializes the `billing` service on path `/billing`
const createService = require('feathers-sequelize');
const createModel = require('../../models/billing.model');
const hooks = require('./billing.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/billing', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('billing');

  service.hooks(hooks);
};