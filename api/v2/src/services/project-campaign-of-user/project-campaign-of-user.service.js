// Initializes the `projectCampaignOfUser` service on path `/project-campaign-of-user`
const createService = require('./project-campaign-of-user.class.js');
const hooks = require('./project-campaign-of-user.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/project-campaign-of-user', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('project-campaign-of-user');

  service.hooks(hooks);
};
