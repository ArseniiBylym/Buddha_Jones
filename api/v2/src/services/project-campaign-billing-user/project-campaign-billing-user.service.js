// Initializes the `projectCampaignBillingUser` service on path `/project-campaign-billing-user`
const createService = require('feathers-sequelize');
const createModel = require('../../models/project-campaign-billing-user.model');
const hooks = require('./project-campaign-billing-user.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/project-campaign-billing-user', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('project-campaign-billing-user');

  service.hooks(hooks);
};
