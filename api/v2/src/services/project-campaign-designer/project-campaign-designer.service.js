// Initializes the `projectCampaignDesigner` service on path `/project-campaign-designer`
const createService = require('feathers-sequelize');
const createModel = require('../../models/project-campaign-designer.model');
const hooks = require('./project-campaign-designer.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/project-campaign-designer', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('project-campaign-designer');

  service.hooks(hooks);
};
