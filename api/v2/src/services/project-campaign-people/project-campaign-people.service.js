// Initializes the `projectCampaignPeople` service on path `/project-campaign-people`
const createService = require('feathers-sequelize');
const createModel = require('../../models/project-campaign-people.model');
const hooks = require('./project-campaign-people.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/project-campaign-people', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('project-campaign-people');

  service.hooks(hooks);
};
