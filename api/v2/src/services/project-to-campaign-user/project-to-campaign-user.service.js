// Initializes the `projectToCampaignUser` service on path `/project-to-campaign-user`
const createService = require('feathers-sequelize');
const createModel = require('../../models/project-to-campaign-user.model');
const hooks = require('./project-to-campaign-user.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/project-to-campaign-user', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('project-to-campaign-user');

  service.hooks(hooks);
};
