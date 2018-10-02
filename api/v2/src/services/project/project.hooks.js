const { authenticate } = require('@feathersjs/authentication').hooks;
const populateProjectPermission = require('../../middleware/populate-project-permission');
const { get } = require('lodash');
const ProjectRepo = require('../../repos/project.repo');
const errors = require('@feathersjs/errors');

module.exports = {
  before: {
    all: [ authenticate('jwt'), populateProjectPermission() ],
    find: [
      async hook => {
        let searchFilter = Object.assign({}, hook.params.query, {projectPermission: hook.params.projectPermission});
        const projectRepo = ProjectRepo(hook.app);

        hook.result = await projectRepo.searchProject(searchFilter);
        return hook;
      }
    ],
    get: [
      async hook => {
        let searchFilter = {project_id: hook.id, returnSingleResult: true, projectPermission: hook.params.projectPermission};
        const projectRepo = ProjectRepo(hook.app);

        const projectResult = await projectRepo.searchProject(searchFilter);
        const projectResultData = get(projectResult, 'data', []);

        if(projectResultData[0]) {
          hook.result = {
            status: 1,
            message: 'Request successful',
            data: projectResultData[0]
          };
        } else {
          hook.result = {};
        }
        return hook;
      }
    ],
    create: [
      async hook => {
        const canCreateProject = hook.params.projectPermission.PROJECT_CREATE.canEdit;
        const canEditReleaseDate = hook.params.projectPermission.PROJECT_RELEASE_DATE.canEdit;
        const canEditProjectName = hook.params.projectPermission.PROJECT_NAME.canEdit;
        const canEditProjectCodeName = hook.params.projectPermission.PROJECT_CODENAME.canEdit;

        if(!canCreateProject) {
          throw new errors.GeneralError('Access denied');
        }

        const data = {
          customerId: parseInt(hook.data.customer_id) || null,
          projectName: canEditProjectName && (hook.data.name || null),
          projectCode: canEditProjectCodeName && (hook.data.project_code || null),
          projectRelease: canEditReleaseDate && (hook.data.project_release || null),
          notes: hook.data.notes || null,
          createdByUserId: hook.params.user.id
        };

        hook.users = hook.data.users ? JSON.parse(hook.data.users) : [];

        if (data.customerId && (data.projectName || data.projectCode)) {
          const customer = await hook.app.service('customer').find({query: {id: data.customerId}, paginate: false});

          if (!customer.length) {
            throw new errors.GeneralError('Customer not found');
          }

          hook.data = data;

          return hook;
        }

        throw new errors.GeneralError('Please provide required data(project_name or project_code and customer_id).');
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
    create: [
      hook => {
        if(hook.result) {
        // if ($projectId && $users && count($users)) {
        //   foreach ($users as $user) {
        //       if (isset($user['id'], $user['role_id'])) {
        //           $projectUser = new RediProjectUser();
        //           $projectUser->setProjectId($projectId);
        //           $projectUser->setUserId($user['id']);
        //           $projectUser->setRoleId($user['role_id']);
        //           $this->_em->persist($projectUser);
        //       }
        //   }

        //   $this->_em->flush();
        //   }
        //   // project history
        //   if ($projectName && $projectCode) {
        //       $projectNameString = '"' . $projectName . '" (codename: "' . $projectCode . '")';
        //   } else if ($projectName) {
        //       $projectNameString = '"' . $projectName . '"';
        //   } else if ($projectCode) {
        //       $projectNameString = '"' . $projectCode . '"';
        //   }

        //   $historyMessage = 'Project ' . $projectNameString . ' created for client "' . $customer->getCustomerName() . '"';
        //   $projectHistory = new RediProjectHistory();
        //   $projectHistory->setProjectId($projectId);
        //   $projectHistory->setUserId($this->_user_id);
        //   $projectHistory->setMessage($historyMessage);
        //   $projectHistory->setCreatedAt(new \DateTime('now'));
        //   $this->_em->persist($projectHistory);
        }
      }
    ],
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