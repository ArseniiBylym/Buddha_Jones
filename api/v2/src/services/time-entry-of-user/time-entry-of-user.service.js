// Initializes the `timeEntryOfUser` service on path `/time-entry-of-user`
const createService = require('./time-entry-of-user.class.js');
const hooks = require('./time-entry-of-user.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/time-entry-of-user', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('time-entry-of-user');

  service.hooks(hooks);
};
