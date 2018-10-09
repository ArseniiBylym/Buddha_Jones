// Initializes the `activityPrice` service on path `/activity-price`
const createService = require('./activity-price.class.js');
const hooks = require('./activity-price.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/activity-price', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('activity-price');

  service.hooks(hooks);
};
