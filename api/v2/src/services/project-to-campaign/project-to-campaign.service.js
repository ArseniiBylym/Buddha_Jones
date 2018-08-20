// Initializes the `projectToCampaign` service on path `/project-to-campaign`
const createService = require('feathers-sequelize');
const createModel = require('../../models/project-to-campaign.model');
const hooks = require('./project-to-campaign.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/project-to-campaign', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('project-to-campaign');

  service.hooks(hooks);
};
