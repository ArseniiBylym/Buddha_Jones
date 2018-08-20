const ProjectRepo = require('../project/project.repo');

module.exports = function(app){
  return {
    sequelizeClient: app.get('sequelizeClient'),

    searchCampaign: async function (filter = []) {
      const projectRepo = new ProjectRepo(app);
      const paginate = app.get('paginate');

      // filters
      const search = filter.search || '';
      const projectId = parseInt(filter.project_id || 0);
      const campaignId = parseInt(filter.campaign_id || 0);
      const offset = filter.offset || 0;
      const length = filter.length || paginate.default;

      // project permission
      const canViewMaterialReceived = filter.projectPermission && filter.projectPermission.DATE_MATERIAL_RECEIVED.canView;

      //select fields for query    
      let selectFields = [
        'c.id',
        'c.campaign_name AS campaignName', 
        'c.description', 
        'c.editor_req AS editorReq', 
        'c.created_by_user_id AS createdByUserId'
      ];

      if(canViewMaterialReceived) {
        selectFields.push('material_received AS materialReceived');
      }

      let tableJoins = ` redi_campaign c 
                        LEFT JOIN redi_project_to_campaign ptc 
                          ON c.id=ptc.campaign_id`;
          
      let queryfilter = [];
         
      if (campaignId) {
        queryfilter.push('c.id = :campaign_id');
      }

      if (projectId) {
        queryfilter.push('ptc.project_id = :project_id');
      }

      if (search) {
        queryfilter.push('(c.campaign_name LIKE ":search")');
      }

      const campaignCondition = queryfilter.length ? `  WHERE ${queryfilter.join(' AND ')} ` : '';
      const campaignQuery = `SELECT ${selectFields.join(',')} 
                            FROM ${tableJoins} ${campaignCondition} 
                            GROUP BY c.id 
                            ORDER BY c.campaign_name ASC 
                            LIMIT ${length} OFFSET ${offset} `;
      const campaignCountQuery = `SELECT COUNT(DISTINCT c.id) AS total_count FROM ${tableJoins} ${campaignCondition} `;
      
      const queryReplacements = {
        campaign_id: campaignId,
        project_id: projectId,
        search: '%' + search + '%'
      };

      let campaigns = await this.sequelizeClient.query(campaignQuery, {
        replacements: queryReplacements,
        type: this.sequelizeClient.QueryTypes.SELECT
      });

      // get campaign project
      const campaignList = campaigns.map(campaign => campaign.id);
      const campaignProject = await this.getCampaignProject(campaignList);

      campaigns = campaigns.map(campaign => {
        let project = campaignProject.filter(cp => cp.campaignId === campaign.id);

        project = project.map(p => {
          let projectName = projectRepo.decideProjectName(filter.projectPermission, p.projectName, p.projectCode, true);

          delete p.projectCode;

          return Object.assign({}, p, {...projectName});
        });

        return Object.assign({}, campaign, {project});
      });

      let campaignCount = await this.sequelizeClient.query(campaignCountQuery, {
        replacements: queryReplacements,
        type: this.sequelizeClient.QueryTypes.SELECT
      });
    
      return {
        data: campaigns,
        totalCount: campaignCount[0].total_count
      };
    },

    getCampaignProject: async function(campaignId = [])
    {
      campaignId.push(0);

      let selectFields = [
        'ptc.campaign_id AS campaignId',
        'ptc.id AS projectCampaignEntryId', 
        'p.id',
        'p.project_name AS projectName',
        'p.project_code AS projectCode',
        'ptc.first_point_of_contact_id AS firstPointOfContactId',
        'GROUP_CONCAT(pcu.user_id) AS user',
        'cc.customer_id AS firstPointOfContactCustomId',
        'cc.cardcode AS firstPointOfContactCardcode',
        'cc.name AS firstPointOfContactName',
        'cc.email AS firstPointOfContactEmail',
        'cc.mobile_phone AS firstPointOfContactMobilePhone',
        'cc.office_phone AS firstPointOfContactOfficePhone',
        'cc.postal_address AS firstPointOfContactPostalAddress'
      ];

      const campaignProjectSql = `SELECT 
                              ${selectFields.join(',')}
                              FROM 
                                redi_project_to_campaign ptc 
                              INNER JOIN redi_project p
                                ON p.id=ptc.project_id 
                              LEFT JOIN redi_project_to_campaign_user pcu
                                ON pcu.project_campaign_id=ptc.id
                              LEFT JOIN redi_customer_contact cc
                                ON cc.id = ptc.first_point_of_contact_id
                              WHERE ptc.campaign_id IN (:campaign_id)
                              GROUP BY ptc.id
                              ORDER BY p.id`;

      const queryReplacements = {
        campaign_id: campaignId
      };

      let campaignProject = await this.sequelizeClient.query(campaignProjectSql, {
        replacements: queryReplacements,
        type: this.sequelizeClient.QueryTypes.SELECT
      });

      campaignProject = campaignProject.map(cp => {
        let user = cp.user ? cp.user.split(',') : [];
        let firstPointOfContact = {
          id: cp.firstPointOfContactId,
          customerId: cp.firstPointOfContactCustomId,
          cardcode: cp.firstPointOfContactCardcode,
          name: cp.firstPointOfContactName,
          email: cp.firstPointOfContactEmail,
          mobilePhone: cp.firstPointOfContactMobilePhone,
          officePhone: cp.firstPointOfContactOfficePhone,
          postalAddress: cp.firstPointOfContactPostalAddress
        };

        delete cp.firstPointOfContactCustomId;
        delete cp.firstPointOfContactCardcode;
        delete cp.firstPointOfContactName;
        delete cp.firstPointOfContactEmail;
        delete cp.firstPointOfContactMobilePhone;
        delete cp.firstPointOfContactOfficePhone;
        delete cp.firstPointOfContactPostalAddress;

        return Object.assign({}, cp, {user, firstPointOfContact});
      });

      return campaignProject;
    }
  };
};
