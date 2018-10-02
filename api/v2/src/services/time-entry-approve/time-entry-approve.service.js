// Initializes the `timeEntryApprove` service on path `/time-entry-approve`
const createService = require('./time-entry-approve.class.js');
const hooks = require('./time-entry-approve.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/time-entry-approve', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('time-entry-approve');

  service.hooks(hooks);
};
