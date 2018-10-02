// Initializes the `activityLevel` service on path `/activity-level`
const createService = require('./activity-level.class.js');
const hooks = require('./activity-level.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/activity-level', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('activity-level');

  service.hooks(hooks);
};
