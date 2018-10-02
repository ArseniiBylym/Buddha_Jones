const TimeApprovalPermissionModel = require('../models/time-approval-permission.model');
const TimeEntryPermissionModel = require('../models/time-entry-permission.model');

module.exports = function (app) {
  return {
    sequelizeClient: app.get('sequelizeClient'),

    getUserTimeEntryAccess: async function (userTypeId) {
      const timeEntryPermissionModel = new TimeEntryPermissionModel(app);

      const count = await timeEntryPermissionModel.count({
        where: {
          user_type_id: userTypeId
        },
        raw: true
      });

      return Boolean(count);
    },

    getUserToApproveTimeEntry: async function (approverUserTypeId) {
      const timeApprovalPermissionModel = new TimeApprovalPermissionModel(app);

      const result = await timeApprovalPermissionModel.findAll({
        attribute: ['submittingUserTypeId'],
        where: {
          approver_user_type_id: approverUserTypeId
        },
        raw: true
      });

      return result.map(row => row.submittingUserTypeId);
    }
  };
};
