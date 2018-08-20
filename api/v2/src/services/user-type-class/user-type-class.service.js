// Initializes the `userTypeClass` service on path `/user-type-class`
const createService = require('feathers-sequelize');
const createModel = require('../../models/user-type-class.model');
const hooks = require('./user-type-class.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/user-type-class', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('user-type-class');

  service.hooks(hooks);
};
