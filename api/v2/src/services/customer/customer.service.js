// Initializes the `customer` service on path `/customer`
const createService = require('feathers-sequelize');
const createModel = require('../../models/customer.model');
const hooks = require('./customer.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/customer', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('customer');

  service.hooks(hooks);
};
