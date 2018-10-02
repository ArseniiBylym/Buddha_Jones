const { authenticate } = require('@feathersjs/authentication').hooks;
const CampaignRepo = require('../../repos/campaign.repo');
const populateProjectPermission = require('../../middleware/populate-project-permission');
const errors = require('@feathersjs/errors');
const Sequelize = require('sequelize');
const ProjectModel = require('../../models/project.model');

module.exports = {
  before: {
    all: [ authenticate('jwt'), populateProjectPermission() ],
    find: [
      async hook => {
        let searchFilter = Object.assign({}, hook.params.query, {projectPermission: hook.params.projectPermission});

        const campaignRepo = new CampaignRepo(hook.app);
        const data = await campaignRepo.searchCampaign(searchFilter);

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
        let searchFilter = Object.assign({}, {campaign_id: hook.id, projectPermission: hook.params.projectPermission});

        const campaignRepo = new CampaignRepo(hook.app);
        const data = await campaignRepo.searchCampaign(searchFilter);

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
      hook => {
        const canEditMaterialReceived = hook.params.projectPermission.DATE_MATERIAL_RECEIVED.canEdit;
        const canCreateCampaign = hook.params.projectPermission.PROJECT_CAMPAIGNS.canEdit;

        if(!canCreateCampaign) {
          hook.result = {
            status: 0,
            message: 'Permission denied.'
          };

          return hook;
        }
        
        const data = hook.data;
        hook.project = data.project || null;

        hook.data = {
          campaignName: data.name || null,
          description: data.description || null,
          editorReq: data.editor_req || null,
          materialReceived: canEditMaterialReceived && (data.material_received || null),
          createdByUserId: hook.params.user.id
        };    
        
        if(!data.name) {
          hook.result = {
            status: 0,
            message: 'Please provide required data(name).'
          };

          return hook;
        }
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
      async hook => {
        if(hook.result && hook.project) {
          const projectModel = new ProjectModel(hook.app);
          const projects = JSON.parse(hook.project);

          if(projects) {
            for(const projectIndex in projects) {
              const project = projects[projectIndex];

              if(project.project_id) {
                const projectInfo = await projectModel.findById(project.project_id, { raw: true });

                if(projectInfo) {
                  // insert project campaign
                  const projectCampaign = await hook.app.service('project-to-campaign').create({
                    projectId: project.project_id,
                    campaignId: hook.result.id,
                    firstPointOfContactId: project.first_point_of_contact_id || null
                  });

                  //insert history
                  hook.app.service('project-history').create({
                    message: `Campaign ${hook.result.campaignName} was added to project ${projectInfo.projectName}`,
                    projectId: projectInfo.id,
                    campaignId: hook.result.id,
                    createdAt: Sequelize.literal('CURRENT_TIMESTAMP')
                  });

                  // insert users
                  if(project.user) {
                    for (const userIndex in project.user) {
                      const user = project.user[userIndex];

                      if(user.id && user.role_id) {
                        hook.app.service('project-to-campaign-user').create({
                          projectCampaignId: projectCampaign.id,
                          userId: user.id,
                          roleId: user.role_id
                        }).then(projectCampaignUser => {
                          hook.app.service('project-history').create({
                            message: `User was added to campaign ${hook.result.campaignName}`,
                            projectId: projectInfo.id,
                            campaignId: hook.result.data.id,
                            createdAt: Sequelize.literal('CURRENT_TIMESTAMP')
                          });
                        });
                      }
                    }
                  }
                }              
              }
            }
          }

          // get campaign result
          let searchFilter = Object.assign({}, {campaign_id: hook.result.id, projectPermission: hook.params.projectPermission});

          const campaignRepo = new CampaignRepo(hook.app);
          const data = await campaignRepo.searchCampaign(searchFilter);

          const result = {
            status: 1,
            message: 'Request successful',
            data: data.data[0] || []
          };

          hook.result = result;
          
          return hook;
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
