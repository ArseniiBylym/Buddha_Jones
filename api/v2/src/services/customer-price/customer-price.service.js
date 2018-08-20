// Initializes the `customerPrice` service on path `/customer-price`
const createService = require('feathers-sequelize');
const createModel = require('../../models/customer-price.model');
const hooks = require('./customer-price.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/customer-price', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('customer-price');

  service.hooks(hooks);
};
