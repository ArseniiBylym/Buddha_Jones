const {authenticate} = require('@feathersjs/authentication').hooks;
const TimeEntryRepo = require('../../repos/time-entry.repo');
const populateProjectPermission = require('../../middleware/populate-project-permission');
const TimeEntryModel = require('../../models/time-entry.model');
const TimeEntryFileModel = require('../../models/time-entry-file.model');

module.exports = {
  before: {
    all: [
      authenticate('jwt'), populateProjectPermission()
    ],
    find: [
      async hook => {
        let searchFilter = Object.assign({}, hook.params.query, {
          current_user_type_id: hook.params.user.typeId,
          projectPermission: hook.params.projectPermission
        });

        const timeEntryRepo = new TimeEntryRepo(hook.app);
        const data = await timeEntryRepo.search(searchFilter);

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
        let searchFilter = {
          id: hook.id,
          get_single: true,
          current_user_type_id: hook.params.user.typeId,
          projectPermission: hook.params.projectPermission
        };

        const timeEntryRepo = new TimeEntryRepo(hook.app);
        const data = await timeEntryRepo.search(searchFilter);
        let result = {
          status: 0,
          message: 'Not found'
        };

        if (data.data.length) {
          result = {
            status: 1,
            message: 'Request successful',
            data: data.data[0]
          };
        }

        hook.result = result;

        return hook;
      }
    ],
    create: [
      hook => {
        const data = hook.data;
        hook.project = data.project || null;

        hook.data = {
          userId: data.worker_id || hook.params.user.id,
          projectCampaignId: data.project_campaign_id || null,
          spotId: data.spot_id || null,
          versionId: data.version_id || null,
          startDate: data.start_date_time || null,
          duration: data.duration || null,
          activityId: data.activity_id || null,
          activityDescription: data.activity_description || null,
          notes: data.notes || null,
          nonBillable: data.non_billable
            ? 1
            : 0
        };

        if (!hook.data.userId || !hook.data.startDate || !hook.data.duration) {
          hook.result = {
            status: 0,
            message: 'Please provide required data(worker_id, start_date, duration).'
          };
        }

        hook.files = data.files && JSON.parse(data.files);
        return hook;
      }
    ],
    update: [
      async hook => {
        const timeEntryModel = new TimeEntryModel(hook.app);
        const data = hook.data;
        hook.project = data.project || null;

        const existingData = await timeEntryModel.findById(hook.id);

        if(!existingData) {
          hook.result = {
            stauts: 0,
            message: 'Time entry does not exist'
          };

          return hook;
        }

        hook.data = Object.assign({}, existingData, {
          userId: data.worker_id || existingData.userId,
          projectCampaignId: data.project_campaign_id || existingData.projectCampaignId,
          spotId: data.spot_id || existingData.spotId,
          versionId: data.version_id || existingData.versionId,
          startDate: data.start_date_time || existingData.startDateTime,
          duration: data.duration || existingData.duration,
          activityId: data.activity_id || existingData.activityId,
          activityDescription: data.activity_description || existingData.activityDescription,
          notes: data.notes || existingData.notes,
          nonBillable: data.non_billable !== undefined
            ? data.non_billable
            : existingData.nonBillable
        });

        hook.files = data.files && JSON.parse(data.files);
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
        if (hook.result && hook.files) {
          for (let fileIndex in hook.files) {
            const file = hook.files[fileIndex];
            
            if (file.filename) {
              // if duration is not provided then default duration is 1
              const duration = file.duration || 1;
              const fileName = file.filename;
              const timeEntryId = hook.result.id;
              const description = file.description || null;

              await hook
                .app
                .service('time-entry-file')
                .create({timeEntryId, fileName, duration, description});
            }
          }
        }

        hook.result = await hook
          .app
          .service('time-entry')
          .get(hook.result.id, {user: hook.params.user});

        return hook;
      }
    ],
    update: [
      async hook => {
        if (hook.result && hook.files) {
          const timeEntryFileModel = TimeEntryFileModel(hook.app);
          timeEntryFileModel.destroy({where: {timeEntryId: hook.result.id}});

          for (let fileIndex in hook.files) {
            const file = hook.files[fileIndex];

            if (file.filename) {
              // if duration is not provided then default duration is 1
              const duration = file.duration || 1;
              const fileName = file.filename;
              const timeEntryId = hook.result.id;
              const description = file.description || null;

              await hook
                .app
                .service('time-entry-file')
                .create({timeEntryId, fileName, duration, description});
            }
          }
        }

        hook.result = await hook
          .app
          .service('time-entry')
          .get(hook.result.id, {user: hook.params.user});

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
