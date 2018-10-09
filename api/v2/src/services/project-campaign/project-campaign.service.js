// Initializes the `projectCampaign` service on path `/project-campaign`
const createService = require('feathers-sequelize');
const createModel = require('../../models/project-campaign.model');
const hooks = require('./project-campaign.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/project-campaign', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('project-campaign');

  service.hooks(hooks);
};
