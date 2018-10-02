const { authenticate } = require('@feathersjs/authentication').hooks;
const populateProjectPermission = require('../../middleware/populate-project-permission');
const ProjectCampaignRepo = require('../../repos/project-campaign.repo');

module.exports = {
  before: {
    all: [ authenticate('jwt'), populateProjectPermission() ],
    find: [
      async hook => {
        let searchFilter = Object.assign({}, hook.params.query, {projectPermission: hook.params.projectPermission});

        const projectCampaignRepo = new ProjectCampaignRepo(hook.app);
        const data = await projectCampaignRepo.search(searchFilter);

        const result = {
          status: 1,
          message: 'Request successful',
          total_count: data.totalCount,
          object_count: data.data.length,
          data: data.data
        };

        hook.result = result;

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
