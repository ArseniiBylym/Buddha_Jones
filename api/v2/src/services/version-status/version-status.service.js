// Initializes the `versionStatus` service on path `/version-status`
const createService = require('feathers-sequelize');
const createModel = require('../../models/version-status.model');
const hooks = require('./version-status.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/version-status', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('version-status');

  service.hooks(hooks);
};
