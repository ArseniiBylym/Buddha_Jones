// Initializes the `projectCampaignEditor` service on path `/project-campaign-editor`
const createService = require('feathers-sequelize');
const createModel = require('../../models/project-campaign-editor.model');
const hooks = require('./project-campaign-editor.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/project-campaign-editor', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('project-campaign-editor');

  service.hooks(hooks);
};
