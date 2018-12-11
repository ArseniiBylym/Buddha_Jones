module.exports = function (app) {
  return {
    sequelizeClient: app.get('sequelizeClient'),

    getProjectName: async function (projectId, projectPermission, projectNameOnly = false) {
      // Get project data
      const projectQuery = `SELECT p.project_name as projectName, p.project_code AS projectCode
                              FROM redi_project p
                            WHERE
                              p.id=:project_id `;

      let project = await this
        .sequelizeClient
        .query(projectQuery, {
          replacements: {
            project_id: projectId
          },
          type: this.sequelizeClient.QueryTypes.SELECT
        });

      if (!project[0]) {
        return;
      }

      project = project[0];

      const result = this.decideProjectName(projectPermission, project['projectName'], project['projectCode'], projectNameOnly);

      return result;
    },

    decideProjectName: function (projectPermission, projectName, projectCodeName, projectNameOnly = false) {
      const projectNameView = projectPermission.PROJECT_NAME.canView;
      const projectCodeNameView = projectPermission.PROJECT_CODENAME.canView;

      let result = {};

      if (projectNameView && projectCodeNameView) {
        result = {
          projectName: projectName,
          projectCode: projectCodeName
        };
      } else if (projectNameView || projectCodeNameView) {
        if (projectCodeName) {
          result = {
            projectCode: projectCodeName
          };
        } else {
          result = {
            projectName: projectName
          };
        }
      }

      if (projectNameOnly) {
        if (!result['projectName'] && projectCodeName) {
          result = {
            projectName: projectCodeName
          };
        } else {
          result = {
            projectName
          };
        }
      }

      return result;
    },

    getVersionBySpotId: async function (spotId) {
      const versionQuery = `SELECT v.id, v.version_name AS versionName, v.custom,
                              sv.version_status_id AS versionStatusId, vs.name AS versionStatusName, 
                              sv.version_note AS versionNote
                              FROM redi_spot_version sv
                              INNER JOIN redi_version v
                                ON sv.version_id=v.id
                              LEFT JOIN redi_version_status vs
                                ON vs.id=sv.version_status_id
                              WHERE
                                sv.spot_id=:spot_id 
                              ORDER BY v.seq ASC`;

      let data = await this
        .sequelizeClient
        .query(versionQuery, {
          replacements: {
            spot_id: spotId
          },
          type: this.sequelizeClient.QueryTypes.SELECT
        });

      return data;
    },

    getSpotByProjectCampaignId: async function (projectCampaignId) {

      const projectCampaignQuery = `SELECT 
                                    s.id, s.spot_name AS spotName, 
                                    s.revision_not_counted AS revisionNotCounted, s.notes, s.revisions, 
                                    s.graphics_revisions AS graphicsRevisions,
                                    s.billing_type AS billingType, s.billing_note AS billingNote, 
                                    s.first_revision_cost AS firstRevisionCost, 
                                    s.internal_deadline AS internalDeadline, s.client_deadline AS clientDeadline,
                                    s.project_campaign_id AS projectCampaignId
                                  FROM redi_spot s
                                  WHERE
                                    s.project_campaign_id=:project_campaign_id`;

      let data = await this
        .sequelizeClient
        .query(projectCampaignQuery, {
          replacements: {
            project_campaign_id: projectCampaignId
          },
          type: this.sequelizeClient.QueryTypes.SELECT
        });

      for (let index in data) {
        data[index]['version'] = await this.getVersionBySpotId(data[index]['id']);
      }

      return data;
    },

    getHistoryByProjectId: async function (projectId) {
      const siteUrl = app.get('base_url');
      const imagePath = app.get('profile_image_path');
      const fullImagePath = `${siteUrl}/${imagePath}`;

      const historyQuery = `SELECT
                            ph.id, ph.message, 
                            ph.user_id AS userId, u.username, 
                            u.first_name AS firstName, u.last_name AS lastName, '' AS fullName,
                            u.image, ph.created_at AS createdAt
                          FROM redi_project_history ph
                          INNER JOIN redi_user u
                            ON ph.user_id=u.id
                          WHERE
                            ph.project_id=:project_id
                          ORDER BY ph.created_at DESC`;

      let data = await this
        .sequelizeClient
        .query(historyQuery, {
          replacements: {
            project_id: projectId
          },
          type: this.sequelizeClient.QueryTypes.SELECT
        });

      data = data.map(row => {
        const fullName = `${row.firstName} ${row.lastName}`;
        const image = row.image
          ? `${fullImagePath}${row.image}`
          : null;

        return Object.assign({}, row, {fullName, image});
      });

      return data;
    },

    getCampaignProjectPeople: async function (tableSuffix, projectCampaignId, offset = 0, length = 10, type = null) {
      const siteUrl = app.get('base_url');
      const imagePath = app.get('profile_image_path');
      const fullImagePath = `${siteUrl}/${imagePath}`;
      let typeCondition = '';
      const tableName = `redi_project_to_campaign_${tableSuffix}`;

      if (type && type.elngth) {
        typeCondition = ` AND u.type_id IN (${type.join(',')}) `;
      }

      let additionalColumn = '';
      let additionalColumnJoin = '';

      if (tableSuffix === 'user') {
        additionalColumn = `ur.id AS roleId,
                              ur.role_name AS role,`;
        additionalColumnJoin = `LEFT JOIN 
                                  redi_user_role ur ON ur.id=ptcu.role_id`;
      } else if (tableSuffix === 'billing') {
        additionalColumn = 'ptcu.role AS billingRole,';
      }

      let peopleQuery = `SELECT DISTINCT
                            ptc.id AS projectCampaignId,
                            ptc.project_id AS projectId,
                            ptc.campaign_id AS campaignId,
                            ptcu.user_id AS userId,
                            u.username,
                            u.email,
                            u.first_name AS firstName,
                            u.last_name AS lastName,
                            u.image,
                            u.type_id AS typeId,
                            ut.type_name AS type,
                            ${additionalColumn}
                            u.image
                        FROM
                            redi_project_to_campaign ptc
                                INNER JOIN
                            ${tableName} ptcu ON ptc.id = ptcu.project_campaign_id
                                INNER JOIN
                            redi_user u ON u.id = ptcu.user_id
                                LEFT JOIN
                            redi_user_type ut ON u.type_id = ut.id
                            ${additionalColumnJoin}
                        WHERE
                            ptc.id = :project_to_campaign_id
                                ${typeCondition}
                                ORDER BY typeId, username `;

      // if offset and length both are null that means no condition required for limit
      // it is asking for all the results
      if (offset !== null && length !== null) {
        peopleQuery += ` LIMIT ${offset}, ${length}`;
      }

      let data = await this
        .sequelizeClient
        .query(peopleQuery, {
          replacements: {
            project_to_campaign_id: projectCampaignId
          },
          type: this.sequelizeClient.QueryTypes.SELECT
        });

      data = data.map(row => {
        const extraData = {
          image: row.image
            ? `${fullImagePath}${row.image}`
            : null,
          fullName: `${row.firstName} ${row.lastName}`,
          userId: Number(row.userId),
          typeId: Number(row.typeId),
          projectId: Number(row.projectId),
          campaignId: Number(row.campaignId),
          roleId: row.roleId
            ? Number(row.roleId)
            : null
        };

        return Object.assign({}, row, extraData);
      });

      return data;
    },

    searchProject: async function (filter = []) {
      const paginate = app.get('paginate');
      const siteUrl = app.get('base_url');
      const imagePath = app.get('profile_image_path');
      const fullImagePath = `${siteUrl}/${imagePath}`;
      const projectToCampaignUserId = filter.project_to_campaign_user_id || 0;
      const search = filter.search || '';
      const allProjectAccess = filter.projectPermission.ALL_PROJECTS_CAMPAIGNS.canView;
      const releaseDateView = filter.projectPermission.PROJECT_RELEASE_DATE.canView;
      const projectNameViewAccess = filter.projectPermission.PROJECT_NAME.canView;
      const projectCodeNameViewAccess = filter.projectPermission.PROJECT_CODENAME.canView;
      const canViewMaterialReceived = filter.projectPermission.DATE_MATERIAL_RECEIVED.canView;
      const canViewBudget = filter.projectPermission.CAMPAIGN_BUDGET.canView;
      const canViewNote = filter.projectPermission.CAMPAIGN_NOTES.canView;
      const canViewRequestWrittingTeam = filter.projectPermission.CAMPAIGN_WRITING_TEAM.canView;
      const canViewRequestMusicTeam = filter.projectPermission.CAMPAIGN_MUSIC_TEAM.canView;
      const canViewPor = filter.projectPermission.CAMPAIGN_POR.canView;
      const canViewInvoice = filter.projectPermission.CAMPAIGN_INVOICE_CONTACT.canView;
      const canViewCreativeTeam = filter.projectPermission.CAMPAIGN_PEOPLE_CREATIVE.canView;
      const canViewDesigner = filter.projectPermission.CAMPAIGN_PEOPLE_DESIGN.canView;
      const canViewEditor = filter.projectPermission.CAMPAIGN_PEOPLE_EDITORIAL.canView;
      const canViewBilling = filter.projectPermission.CAMPAIGN_PEOPLE_BILLING.canView;
      const customerId = filter.customer_id || 0;
      const projectId = filter.project_id || 0;
      const sort = filter.sort || '';
      const offset = filter.offset || 0;
      const length = filter.length || paginate.default;
      const returnSingleResult = filter.returnSingleResult || false;
      const getUser = filter.get_user || 0;

      const selectFields = `p.id, 
                            p.customer_id AS customerId, 
                            c.cardname AS customerName, 
                            c.cardcode, 
                            p.notes, 
                            p.project_release AS projectRelease, 
                            MAX(ph.created_at) as lastUpdatedAt`;

      let tableJoins = ` redi_project p
                        LEFT JOIN redi_project_to_campaign ptc
                          ON p.id=ptc.project_id
                        LEFT JOIN redi_campaign ca
                          ON ca.id=ptc.campaign_id
                        LEFT JOIN redi_project_history ph
                          ON p.id=ph.project_id
                        LEFT JOIN redi_customer c
                          ON c.id=p.customer_id
                        LEFT JOIN redi_project_to_campaign_user ptcu
                          ON ptcu.project_campaign_id = ptc.id
                        LEFT JOIN redi_user u
                          ON u.id=ptcu.user_id 
                        LEFT JOIN redi_customer_contact cc 
                          ON cc.id=ptc.first_point_of_contact_id `;

      // If user does not have access to all time entry (if user does not belong to
      // those selected user type) then join tables to get only the projects he is
      // assigned to
      if (!allProjectAccess && projectToCampaignUserId) {
        tableJoins += ` LEFT JOIN redi_project_to_campaign_billing ptcb
                      ON ptcb.project_campaign_id=ptc.id
                    LEFT JOIN redi_project_to_campaign_designer ptcd
                      ON ptcd.project_campaign_id=ptc.id
                    LEFT JOIN redi_project_to_campaign_editor ptce
                      ON ptce.project_iampaign_id=ptc.id `;
      }

      let projectFilter = [];

      if (search) {
        /**
         * should be searchable by:
         * 1) creative team user name(and user belongs to role producer or lead producer),
         * 2) campaign name,
         * 3) studio/customer name,
         * 4) client(name of creative executive name, or customer contact), (first point of contact for now)
         */

        let projectNameView = [];

        if (projectNameViewAccess && projectCodeNameViewAccess) {
          projectNameView.push(' p.project_name LIKE :search ');
        }

        if (projectNameViewAccess || projectCodeNameViewAccess) {
          projectNameView.push(' p.project_name LIKE :search ');
        }

        projectNameView.push(' ca.campaign_name LIKE :search ');
        projectNameView.push(' ((u.first_name LIKE :search OR u.last_name LIKE :search) AND ptcu.role_id IN (1' +
            ',2)) ');
        projectNameView.push(' c.customer_name LIKE :search ');
        projectNameView.push(' cc.name LIKE :search ');

        projectFilter.push(` ( ${projectNameView.join(' OR ')} )`);
      }

      if (customerId) {
        projectFilter.push(' p.customer_id=:customer_id ');
      }

      if (projectId) {
        projectFilter.push(' p.id=:project_id ');
      }

      if (!allProjectAccess && projectToCampaignUserId) {
        projectFilter.push(` (ptcu.user_id = :project_to_campaign_user_id
                          OR ptcb.user_id = :project_to_campaign_user_id
                          OR ptcd.user_id = :project_to_campaign_user_id
                          OR ptce.user_id = :project_to_campaign_user_id
                          OR p.created_by_user_id = :project_to_campaign_user_id
                          OR ca.created_by_user_id = :project_to_campaign_user_id) `);
      }

      const projectCondition = projectFilter.length
        ? `  WHERE ${projectFilter.join(' AND ')} `
        : '';
      const projectSort = ` ORDER BY ${ (sort === 'last_update_date')
        ? ' lastUpdatedAt DESC'
        : 'p.project_name ASC'}`;
      const projectQuery = `SELECT ${selectFields} FROM ${tableJoins} ${projectCondition} GROUP BY p.id ${projectSort} LIMIT ${length} OFFSET ${offset} `;
      const projectCountQuery = `SELECT COUNT(DISTINCT p.id) AS total_count FROM ${tableJoins} ${projectCondition} `;
      const commentQuery = `SELECT COUNT(c.id) AS total_count, MIN(c.comment_read) AS read_c 
                            FROM redi_comment c 
                            WHERE 
                              c.parent_id = :project_id
                              AND c.type_id = 3
                            GROUP BY c.id`;
      const lastUpdatedUserQuery = `SELECT
                          ph2.user_id, u.first_name, u.last_name, u.image
                        FROM
                          redi_project_history ph2
                        INNER JOIN redi_user u
                          ON u.id=ph2.user_id
                        WHERE ph2.project_id = :project_id
                        ORDER BY created_at DESC
                        LIMIT 1`;

      const campaignQuery = `SELECT ptc.id AS projectCampaignId, c.id AS campaignId, 
                              c.campaign_name AS campaignName, ptc.first_point_of_contact_id AS firstPointOfContactId,
                              ptc.request_writing_team AS requestWritingTeam, ptc.writing_team_notes AS writingTeamNotes,
                              ptc.request_music_team AS requestMusicTeam, ptc.music_team_notes AS musicTeamNotes, ptc.note,
                              ptc.budget, ptc.budget_note AS budgetNote, ptc.por, 
                              ptc.invoice_contact AS invoiceContact, ptc.material_receive_date AS materialReceiveDate
                              FROM redi_project_to_campaign ptc
                              INNER JOIN redi_campaign c
                                ON ptc.campaign_id=c.id
                              WHERE ptc.project_id=:project_id`;

      const queryReplacements = {
        project_id: projectId,
        all_project_access: allProjectAccess,
        search: '%' + search + '%',
        customerId: customerId,
        project_to_camapign_user_id: projectToCampaignUserId
      };
      const sequelizeClient = app.get('sequelizeClient');

      let result = await sequelizeClient.query(projectQuery, {
        replacements: queryReplacements,
        type: sequelizeClient.QueryTypes.SELECT
      });

      let resultCount = await sequelizeClient.query(projectCountQuery, {
        replacements: queryReplacements,
        type: sequelizeClient.QueryTypes.SELECT
      });

      for (let index in result) {
        const row = result[index];
        let comment = await sequelizeClient.query(commentQuery, {
          replacements: {
            project_id: row.id
          },
          type: sequelizeClient.QueryTypes.SELECT
        });

        comment = comment[0] || {};

        let lastUpdateUser = await sequelizeClient.query(lastUpdatedUserQuery, {
          replacements: {
            project_id: row.id
          },
          type: sequelizeClient.QueryTypes.SELECT
        });

        if (lastUpdateUser[0]) {
          lastUpdateUser = {
            userId: Number(lastUpdateUser[0]['user_id']),
            name: `${lastUpdateUser[0]['first_name']} ${lastUpdateUser[0]['last_name']}`,
            image: (lastUpdateUser[0]['image'])
              ? `${fullImagePath}${lastUpdateUser[0]['image']}`
              : null
          };
        }

        let campaign = await sequelizeClient.query(campaignQuery, {
          replacements: {
            project_id: row.id
          },
          type: sequelizeClient.QueryTypes.SELECT
        });

        let history = [];

        if (returnSingleResult) {
          for (let campaignIndex in campaign) {
            campaign[campaignIndex]['spot'] = await this.getSpotByProjectCampaignId(campaign[campaignIndex]['projectCampaignId']);
          }

          history = await this.getHistoryByProjectId(row.id);
        }

        for (let campaignIndex in campaign) {
          if (getUser || returnSingleResult) {
            if (canViewCreativeTeam) {
              campaign[campaignIndex]['user'] = await this.getCampaignProjectPeople('user', campaign[campaignIndex]['projectCampaignId'], null, null, null);
            }

            if (canViewDesigner) {
              campaign[campaignIndex]['designer'] = await this.getCampaignProjectPeople('designer', campaign[campaignIndex]['projectCampaignId'], null, null, null);
            }

            if (canViewEditor) {
              campaign[campaignIndex]['editor'] = await this.getCampaignProjectPeople('editor', campaign[campaignIndex]['projectCampaignId'], null, null, null);
            }

            if (canViewBilling) {
              campaign[campaignIndex]['billingUser'] = await this.getCampaignProjectPeople('billing', campaign[campaignIndex]['projectCampaignId'], null, null, null);
            }
          }

          if (!canViewMaterialReceived) {
            delete campaign[campaignIndex].materialReceiveDate;
          }

          if (!canViewBudget) {
            delete campaign[campaignIndex].budget;
            delete campaign[campaignIndex].budgetNote;
          }

          if (!canViewNote) {
            delete campaign[campaignIndex].note;
          }

          if (!canViewRequestWrittingTeam) {
            delete campaign[campaignIndex].requestWritingTeam;
            delete campaign[campaignIndex].writingTeamNotes;
          }

          if (!canViewRequestMusicTeam) {
            delete campaign[campaignIndex].requestMusicTeam;
            delete campaign[campaignIndex].musicTeamNotes;
          }

          if (!canViewPor) {
            delete campaign[campaignIndex].por;
          }

          if (!canViewInvoice) {
            delete campaign[campaignIndex].invoiceContact;
          }
        }

        let extraData = {
          lastUpdateUser: lastUpdateUser,
          campaign: campaign,
          comment: {
            count: Number(comment.total_count) || 0,
            unread: Number(comment.read_c)
              ? 0
              : 1
          }
        };

        if (returnSingleResult) {
          extraData = Object.assign({}, extraData, {history});
        }

        const projectName = await this.getProjectName(row.id, filter.projectPermission);

        if (!releaseDateView) {
          delete row.projectRelease;
        }
        result[index] = Object.assign({}, row, extraData, projectName);
      }

      return {
        status: 1,
        message: 'Request successful',
        total_count: resultCount[0].total_count,
        object_count: result.length || 0,
        data: result
      };
    }
  };
};