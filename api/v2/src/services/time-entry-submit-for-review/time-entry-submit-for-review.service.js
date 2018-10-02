// Initializes the `timeEntrySubmitForReview` service on path `/time-entry-submit-for-review`
const createService = require('./time-entry-submit-for-review.class.js');
const hooks = require('./time-entry-submit-for-review.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/time-entry-submit-for-review', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('time-entry-submit-for-review');

  service.hooks(hooks);
};
