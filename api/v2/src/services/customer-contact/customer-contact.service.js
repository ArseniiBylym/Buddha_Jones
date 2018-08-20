// Initializes the `customerContact` service on path `/customer-contact`
const createService = require('feathers-sequelize');
const createModel = require('../../models/customer-contact.model');
const hooks = require('./customer-contact.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/customer-contact', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('customer-contact');

  service.hooks(hooks);
};
