const { authenticate } = require('@feathersjs/authentication').hooks;
const ActivityRepo = require('../../repos/activity.repo');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [
      async hook => {
        const activityRepo = new ActivityRepo(hook.app);
        const data = await activityRepo.getAllActivityType();

        hook.result = {
          status: 1,
          message: 'Request successful',
          data: data
        };

        return hook;
      }
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
