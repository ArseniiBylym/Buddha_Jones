const { authenticate } = require('@feathersjs/authentication').hooks;
const ActivityRepo = require('../../repos/activity.repo');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [
      async hook => {
        const data = hook.data;
        hook.project = data.project || null;

        const insertData = {
          customerId: parseInt(data.customer_id || 0),
          activityId: parseInt(data.activity_id || 0),
          price: parseFloat(data.price || 0)
        };    

        if(!insertData.customerId || !insertData.activityId) {
          hook.result = {
            status: 0,
            message: 'Please provide required data(customer_id, activity_id, price).'
          };

          return hook;
        }

        const activityRepo = new ActivityRepo(hook.app);
        await activityRepo.createOrUpdateCustomerPrice(insertData);

        hook.result = {
          status: 1,
          message: 'Request successful.',
          data: insertData
        };

        return hook;

      }
    ],
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
