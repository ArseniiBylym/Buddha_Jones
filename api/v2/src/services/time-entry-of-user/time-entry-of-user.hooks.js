const { authenticate } = require('@feathersjs/authentication').hooks;
const populateProjectPermission = require('../../middleware/populate-project-permission');

module.exports = {
  before: {
    all: [ authenticate('jwt'), populateProjectPermission() ],
    find: [],
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
