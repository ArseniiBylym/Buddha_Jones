// const TimeApprovalPermissionModel = require('../models/time-approval-permission.model');
// const TimeEntryPermissionModel = require('../models/time-entry-permission.model');
const ProjectRepo = require('../repos/project.repo');
const CampaignRepo = require('../repos/campaign.repo');

module.exports = function (app) {
  return {
    sequelizeClient: app.get('sequelizeClient'),

    search: async function(filter = []) {
      const projectRepo = new ProjectRepo(app);
      const campaignRepo = new CampaignRepo(app);
      const paginate = app.get('paginate');
      const baseUrl = app.get('base_url');
      const profileImagePath = app.get('profile_image_path')

      // filters
      const projectId = parseInt(filter.project_id || 0);
      const campaignId = parseInt(filter.campaign_id || 0);
      const projectCampaignId = parseInt(filter.project_campaign_id || 0);
      const reqeustWritingTeam = parseInt(filter.request_writing_team || 0);
      const requestMusicTeam = parseInt(filter.request_music_team || 0);
      const getUser = parseInt(filter.get_user || 0);
      const userId = parseInt(filter.user_id || 0);
      const offset = filter.offset || 0;
      const length = filter.length || paginate.default;

      // project permission
      const canViewCampaign = filter.projectPermission && filter.projectPermission.PROJECT_CAMPAIGNS.canView;
      const canViewCreativeTeam = filter.projectPermission && filter.projectPermission.CAMPAIGN_PEOPLE_CREATIVE.canView;
      const canViewDesigner = filter.projectPermission && filter.projectPermission.CAMPAIGN_PEOPLE_DESIGN.canView;
      const canViewEditor = filter.projectPermission && filter.projectPermission.CAMPAIGN_PEOPLE_EDITORIAL.canView;
      const canViewBilling = filter.projectPermission && filter.projectPermission.CAMPAIGN_PEOPLE_BILLING.canView;
      const canViewInvoice = filter.projectPermission && filter.projectPermission.CAMPAIGN_INVOICE_CONTACT.canView;
      const canViewBudget = filter.projectPermission && filter.projectPermission.CAMPAIGN_BUDGET.canView;
      const canViewNote = filter.projectPermission && filter.projectPermission.CAMPAIGN_NOTES.canView;
      const canViewMaterialReceived = filter.projectPermission && filter.projectPermission.DATE_MATERIAL_RECEIVED.canView;
      const canViewRequestMusicTeam = filter.projectPermission && filter.projectPermission.CAMPAIGN_MUSIC_TEAM.canView;
      const canViewRequestWrittingTeam = filter.projectPermission && filter.projectPermission.CAMPAIGN_WRITING_TEAM.canView;
      const canViewPor = filter.projectPermission && filter.projectPermission.CAMPAIGN_POR.canView;


      //select fields for query    
      let selectFields = [
        'ptc.id',
        'ptc.project_id AS projectId',
        'p.project_name AS projectName',
        'p.project_code AS projectCode',
        'ptc.campaign_id AS campaignId', 
        'c.campaign_name AS campaignName',
        'ptc.first_point_of_contact_id AS firstPointOfContactId',
        'ptc.request_writing_team AS requestWritingTeam', 
        'ptc.writing_team_notes AS writingTeamNotes',
        'ptc.request_music_team AS requestMusicTeam', 
        'ptc.music_team_notes AS musicTeamNotes',
        'MAX(ph.created_at) AS maxHistoryCreatedAt',
        'ptc.note', 
        'ptc.budget', 
        'ptc.budget_note AS budgetNote',
        'ptc.por', 
        'ptc.invoice_contact AS invoiceContact'
      ];

      if(canViewMaterialReceived) {
        selectFields.push('ptc.material_receive_date AS materialReceiveDate');
      }

      let tableJoins = ` redi_project_to_campaign ptc
                        INNER JOIN redi_project p
                          ON p.id=ptc.project_id
                        INNER JOIN redi_campaign c
                          ON c.id=ptc.campaign_id `;

      let tableJoinsOnlyOnSearch = `LEFT JOIN redi_project_history ph
                                  ON ph.project_id=ptc.project_id
                                  AND ph.campaign_id=ptc.campaign_id `;

      let userTableJoins = userId ? `
                    LEFT JOIN redi_project_to_campaign_user ptcu
                      ON ptc.id=ptcu.project_campaign_id
                        AND ptcu.user_id = :user_id
                    LEFT JOIN redi_project_to_campaign_billing ptcbu
                        ON ptc.id=ptcbu.project_campaign_id
                        AND ptcbu.user_id = :user_id
                    LEFT JOIN redi_project_campaign_designer ptcd
                        ON ptc.id=ptcd.project_campaign_id
                        AND ptcd.user_id = :user_id
                    LEFT JOIN redi_project_to_campaign_editor ptce
                        ON ptc.id=ptce.project_campaign_id
                        AND ptce.user_id = :user_id` : '';
          
      let queryfilter = [];

      if (projectCampaignId) {
        queryfilter.push(' ptc.id=:project_campaign_id ');
      }

      if (projectId) {
        queryfilter.push(' ptc.project_id=:project_id ');
      }

      if (campaignId) {
        queryfilter.push(' ptc.campaign_id=:campaign_id ');
      }

      if (reqeustWritingTeam && reqeustWritingTeam !==  null) {
        queryfilter.push(' ptc.request_writing_team=:request_writing_team ');
      }

      if (requestMusicTeam && requestMusicTeam !== null) {
        queryfilter.push(' ptc.request_music_team=:request_music_team ');
      }

      if(userId){
        queryfilter.push(' (ptcu.user_id IS NOT NULL OR ptcbu.user_id IS NOT NULL OR ptcd.user_id IS NOT NULL OR ptce.user_id  IS NOT NULL) ');
      }

      const whereCondition = queryfilter.length ? `  WHERE ${queryfilter.join(' AND ')} ` : '';
      const orderBy = userId ? ' ORDER BY max_history_created_at DESC ' : '';
      const groupBy = 'GROUP BY ptc.id ';
      const searchQuery = `SELECT ${selectFields.join(',')} 
                            FROM ${tableJoins} 
                            ${tableJoinsOnlyOnSearch}
                            ${userTableJoins}
                            ${whereCondition} 
                            ${groupBy}
                            ${orderBy}
                            LIMIT ${length} OFFSET ${offset} `;
      const searchCountQuery = `SELECT COUNT(ptc.id) AS total_count FROM ${tableJoins} ${userTableJoins} ${whereCondition} `;
      
      const queryReplacements = {
        project_campaign_id: projectCampaignId,
        campaign_id: campaignId,
        project_id: projectId,
        request_writing_team: reqeustWritingTeam,
        request_music_team: requestMusicTeam
      };

      let result = await this.sequelizeClient.query(searchQuery, {
        replacements: queryReplacements,
        type: this.sequelizeClient.QueryTypes.SELECT
      });


      let resultCount = await this.sequelizeClient.query(searchCountQuery, {
        replacements: queryReplacements,
        type: this.sequelizeClient.QueryTypes.SELECT
      });
    

      for(let index in result) {
        let row = result[index];

        // set project name
        let projectName = projectRepo.decideProjectName(filter.projectPermission, row.projectName, row.projectCode, true);;

        if (getUser) {
          if(canViewCreativeTeam) {
            row.user = await campaignRepo.getCampaignProjectPeople('user', row['id'], null, null, null, `${baseUrl}/${profileImagePath}`);
          }

          if(canViewDesigner) {
            row.designer = await campaignRepo.getCampaignProjectPeople('designer', row['id'], null, null, null, `${baseUrl}/${profileImagePath}`);
          }

          if(canViewEditor) {
            row.editor = await campaignRepo.getCampaignProjectPeople('editor', row['id'], null, null, null, `${baseUrl}/${profileImagePath}`);
          }

          if(canViewBilling) {
            row.billingUser = await campaignRepo.getCampaignProjectPeople('billing', row['id'], null, null, null, `${baseUrl}/${profileImagePath}`);
          }
        }

        if(!canViewBudget) {
          delete row.budget;
          delete row.budgetNote;
        }

        if(!canViewNote) {
          delete row.note;
        }

        if(!canViewMaterialReceived) {
          delete row.materialReceiveDate;
        }

        if(!canViewRequestMusicTeam) {
          delete row.requestMusicTeam;
          delete row.musicTeamNotes;
        }

        if(!canViewRequestWrittingTeam) {
          delete row.requestWritingTeam;
          delete row.writingTeamNotes;
        }

        if(!canViewPor) {
          delete row.por;
        }

        if(!canViewInvoice) {
          delete row.invoiceContact;
        }

        result[index] = Object.assign({}, row, {...projectName});
      }

      return {
        data: result,
        totalCount: resultCount[0].total_count
      };
    }
  };
};
