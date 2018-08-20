const errors = require('@feathersjs/errors');
const _ = require('lodash');

module.exports = function () {
  return async function (hook) {
    const userTypeId = _.get(hook, 'params.user.typeId');

    if(userTypeId) {
      let projectPermission = await hook.app.service('project-permissions').find({paginate: false});
      const userProjectPermission = await hook.app.service('user-type-project-permission').find({query: {userTypeId: userTypeId}, paginate: false});

      projectPermission = projectPermission.map(up => {
        const permission = userProjectPermission.find(upp => upp.projectPermissionId === up.id);
        const canView = (permission && permission.canView) || 0;
        const canEdit = (permission && permission.canEdit) || 0;

        const response = {
          key: up.key,
          id: up.id,
          canView: canView || canEdit,
          canEdit: canEdit
        };

        return response;
      });

      let userPermission = _.keyBy(projectPermission, up => _.replace(up.key, /-/g, '_').toUpperCase());

      hook.params = Object.assign({}, hook.params, { projectPermission: userPermission });
    }

    return hook;
  };
};
