// Initializes the `campaign` service on path `/campaign`
const createService = require('feathers-sequelize');
const createModel = require('../../models/campaign.model');
const hooks = require('./campaign.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/campaign', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('campaign');

  service.hooks(hooks);
};
