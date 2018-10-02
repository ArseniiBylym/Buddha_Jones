const { authenticate } = require('@feathersjs/authentication').hooks;
const ActivityRepo = require('../../repos/activity.repo');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [
      async hook => {
        let searchFilter = Object.assign({}, hook.params.query, {projectPermission: hook.params.projectPermission});

        const activityRepo = new ActivityRepo(hook.app);
        const data = await activityRepo.search(searchFilter);

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
    get: [
      async hook => {
        const activityRepo = new ActivityRepo(hook.app);
        const data = await activityRepo.search({id: hook.id, length: 1});

        const result = {
          status: 1,
          message: 'Request successful',
          data: data.data[0] || []
        };

        hook.result = result;

        return hook;
      }
    ],
    create: [
      async hook => {
        const data = hook.data;
        hook.project = data.project || null;

        hook.data = {
          name: data.name || null,
          status: data.status || 1,
          billable: data.billable || 0,
          descriptionRequired: data.description_required || 0,
          projectCampaignRequired: data.project_campaign_required || 0,
          filesIncluded: data.files_included || 0,
          allowedInRuture: data.allowed_in_future || 0
        };    
        
        hook.typeId = JSON.parse(data.type_id || null);
        hook.userTypeId = JSON.parse(data.user_type_id || null);

        // check if all data are provided
        if(!data.name || !hook.typeId.length) {
          hook.result = {
            status: 0,
            message: 'Please provide required data(name, type_id, description_required (only for timesheet)).'
          };
        }

        // check if activity with the same name already exists
        const activityRepo = new ActivityRepo(hook.app);
        const checkActivityByName = await activityRepo.getActivityByName(hook.data.name);
        
        if (checkActivityByName) {
          hook.result = {
            status: 0,
            message: 'Activity name already exists.'
          };
        }

        return hook;
      }
    ],
    update: [
      async hook => {
        const data = hook.data;
        hook.project = data.project || null;

        const currentData = await hook.app.service('activity').get(hook.id);

        if(!currentData) {
          hook.result = {
            status: 0,
            message: 'Activity not found'
          };
        }

        hook.data = {
          name: data.name || currentData.name,
          status: data.status || currentData.status,
          billable: data.billable || currentData.billable,
          descriptionRequired: data.description_required || currentData.descriptionRequired,
          projectCampaignRequired: data.project_campaign_required || currentData.projectCampaignRequired,
          filesIncluded: data.files_included || currentData.filesIncluded,
          allowedInRuture: data.allowed_in_future || currentData.allowedInRuture
        };    
        
        hook.typeId = JSON.parse(data.type_id || null);
        hook.userTypeId = JSON.parse(data.user_type_id || null);

        // check if activity with the same name already exists
        if(data.name) {
          const activityRepo = new ActivityRepo(hook.app);
          const checkActivityByName = await activityRepo.getActivityByName(data.name, hook.id);
          
          if (checkActivityByName) {
            hook.result = {
              status: 0,
              message: 'Activity name already exists.'
            };
          }
        }

        return hook;
      }
    ],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      async hook => {
        if(hook.result && hook.result.id) {
          const activityRepo = new ActivityRepo(hook.app);

          if(hook.typeId) {
            await activityRepo.addActivityToType(hook.result.id, hook.typeId);
          }

          if (hook.userTypeId) {
            await activityRepo.addActivityToUserType(hook.result.id, hook.userTypeId);
          }

          hook.result = await hook.app.service('activity').get(hook.result.id);
        }

        return hook;
      }
    ],
    update: [
      async hook => {
        if(hook.result && hook.result.id) {
          const activityRepo = new ActivityRepo(hook.app);

          if(hook.typeId) {
            await activityRepo.addActivityToType(hook.result.id, hook.typeId, true);
          }

          if (hook.userTypeId) {
            await activityRepo.addActivityToUserType(hook.result.id, hook.userTypeId, true);
          }

          hook.result = await hook.app.service('activity').get(hook.result.id);
        }

        return hook;
      }
    ],
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
