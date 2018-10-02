const {authenticate} = require('@feathersjs/authentication').hooks;

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [hook => {
      const paginate = hook
        .app
        .get('paginate');
      hook.params.query = Object.assign({}, hook.params.query, {$limit: paginate.max});
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
    find: [hook => {
      hook.result = {
        status: 1,
        message: 'Request successful',
        object_count: hook.result.total,
        data: hook.result.data
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
