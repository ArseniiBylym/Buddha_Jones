const TimeEntryFileModel = require('../models/time-entry-file.model');
const UserRepo = require('./user.repo');
const ProjectRepo = require('./project.repo');
const moment = require('moment');

module.exports = function (app) {
  return {
    sequelizeClient: app.get('sequelizeClient'),

    search: async function (filter = []) {
      const userRepo = new UserRepo(app);
      const projectRepo = new ProjectRepo(app);
      const paginate = app.get('paginate');

      // filters
      let id = filter.id || 0;
      const getSingle = filter.get_single || false;
      const activityId = filter.activity_id || 0;
      let userId = filter.user_id || 0;
      const currentUserTypeId = filter.current_user_type_id || null;
      let currentUserId = filter.current_user_id || null;
      const excludeUserTimeEntry = filter.hasOwnProperty('exclude_user_time_entry')
        ? filter.exclude_user_time_entry
        : null;
      const currentCustomerId = filter.current_user_id || null;
      let userTypeId = filter.user_type_id || [];
      const status = filter.status || null;
      let startDate = filter.start_date || null;
      let endDate = filter.end_date || null;
      let projectId = filter.project_id || null;
      const offset = filter.offset || 0;
      const length = filter.length || paginate.default;

      // permissions
      const allTimeEntryPermission = await userRepo.getUserTimeEntryAccess(currentUserTypeId);
      const canApproveTimeEntryOfUser = await userRepo.getUserToApproveTimeEntry(currentUserTypeId);

      if (['', 'null'].includes(projectId)) {
        projectId = null;
      }

      if (!allTimeEntryPermission) {
        if (canApproveTimeEntryOfUser.length) {
          userTypeId = canApproveTimeEntryOfUser;
        } else {
          userId = currentUserId;
        }
      }

      let pool = !getSingle
        ? await this.getPool(filter)
        : [];

      pool.push(id);

      if (activityId) {
        const activityDateFilter = await this.getFilterForActivity(filter);
        pool = pool.concat(activityDateFilter);
      }

      //select fields for query
      let selectFields = [
        'a.id',
        'a.user_id AS userId',
        'ut.id AS userTypeId',
        'ut.type_name AS userTypeName',
        'u.username',
        'u.initials',
        'u.first_name AS firstName',
        'u.last_name AS lastName',
        'u.min_hour AS minHour',
        'a.project_campaign_id AS projectCampaignId',
        'ptc.project_id AS projectId',
        'p.project_name AS projectName',
        'ptc.campaign_id AS campaignId',
        'c.campaign_name AS campaignName',
        'a.spot_id AS spotId',
        's.spot_name AS spotName',
        'a.version_id AS versionId',
        'v.version_name AS versionName',
        'a.activity_id AS activityId',
        'ac.name AS activityValue',
        'a.activity_description AS activityDescription',
        'atp.id AS activityTypeId',
        'atp.activity_type AS activityType',
        'cu.id AS customerId',
        'cu.customer_name AS customerName',
        'a.start_date AS startDate',
        'a.duration',
        'a.approved_by AS approvedBy',
        'a.approved_at AS approvedAt',
        'a.notes',
        'a.status',
        'st.status as statusName'
      ];

      let tableJoins = ` redi_time_entry a 
                        LEFT JOIN redi_spot s
                            ON a.spot_id=s.id
                        LEFT JOIN redi_project_to_campaign ptc
                            ON ptc.id=a.project_campaign_id
                        LEFT JOIN redi_project p
                            ON p.id=ptc.project_id
                        LEFT JOIN redi_campaign c
                            ON c.id=ptc.campaign_id
                        LEFT JOIN redi_version v
                            ON v.id=a.version_id
                        LEFT JOIN redi_status st
                            ON a.status=st.id
                        LEFT JOIN redi_user u 
                            ON u.id=a.user_id
                        LEFT JOIN redi_user_type ut
                            ON ut.id=u.type_id
                        LEFT JOIN redi_user_type_time_approval_permission tap
                            ON u.type_id=tap.submitting_user_type_id 
                        LEFT JOIN redi_activity ac
                            ON ac.id=a.activity_id
                        LEFT JOIN redi_activity_to_type att
                            ON att.activity_id=a.activity_id
                        LEFT JOIN redi_activity_type  atp
                            ON att.type_id=atp.id 
                        LEFT JOIN redi_customer cu 
                            ON cu.id=p.customer_id`;

      let queryFilter = [];

      if (id) {
        queryFilter.push(' a.id IN (:id)');
      }

      if (userId) {
        queryFilter.push(' a.user_id=:user_id ');
      }

      if (excludeUserTimeEntry !== null) {
        queryFilter.push(' a.user_id!=:current_user_id ');
      }

      if (userTypeId.length && !getSingle) {
        queryFilter.push(' tap.submitting_user_type_id IN (:user_type_id)');
      }

      if (status) {
        queryFilter.push(' a.status=:status ');
      }

      if (startDate) {
        startDate = moment(startDate).format('YY-MM-DD 00:00:00');

        if (startDate) {
          queryFilter.push(' a.start_date>=:start_date ');
        }
      }

      if (endDate) {
        endDate = moment(startDate).format('YY-MM-DD 23:59:59');

        if (endDate) {
          queryFilter.push(' a.start_date<=:end_date ');
        }
      }

      const whereCondition = queryFilter.length
        ? `  WHERE ${queryFilter.join(' AND ')} `
        : '';
      const searchQuery = `SELECT ${selectFields.join(',')} 
                            FROM ${tableJoins} 
                            ${whereCondition} 
                            GROUP BY a.id 
                            ORDER BY a.start_date ASC
                            LIMIT ${length} OFFSET ${offset} `;
      const searchCountQuery = `SELECT COUNT(DISTINCT a.id) AS total_count FROM ${tableJoins} ${whereCondition} `;

      const queryReplacements = {
        id: pool,
        user_id: userId,
        current_customer_id: currentCustomerId,
        user_type_id: userTypeId,
        status: status,
        start_date: startDate,
        end_date: endDate
      };

      let result = await this
        .sequelizeClient
        .query(searchQuery, {
          replacements: queryReplacements,
          type: this.sequelizeClient.QueryTypes.SELECT,
          raw: true
        });

      const resultCount = await this
        .sequelizeClient
        .query(searchCountQuery, {
          replacements: queryReplacements,
          type: this.sequelizeClient.QueryTypes.SELECT,
          raw: true
        });

      const timeEntryIds = result.map(row => row.id);
      const files = await this.getTimeEntryFiles(timeEntryIds);

      result = result.map(row => {
        let rowFiles = files.filter(file => file.timeEntryId == row.id);
        let projectName = projectRepo.decideProjectName(filter.projectPermission, row.projectName, null, true);

        delete row.projectName;

        return Object.assign({}, row, {
          files: rowFiles
        }, projectName);
      });

      return {data: result, totalCount: resultCount[0].total_count};
    },

    getPool: async function (filter = {}) {
      const projectId = filter.project_id || null;
      let startDate = filter.start_date || null;
      let endDate = filter.end_date || null;
      let queryFilter = [];

      if (projectId !== null) {
        if (projectId) {
          queryFilter.push(' ptc.project_id=:project_id ');
        } else if (projectId === 0) {
          queryFilter.push(' ptc.project_id IS NULL ');
        }
      }

      if (startDate) {
        startDate = moment(startDate).format('YY-MM-DD 00:00:00');

        if (startDate) {
          queryFilter.push(' start_date>=:start_date ');
        }
      }

      if (endDate) {
        endDate = moment(startDate).format('YY-MM-DD 23:59:59');

        if (endDate) {
          queryFilter.push(' start_date<=:end_date ');
        }
      }

      const whereCondition = queryFilter.length
        ? ` AND ${queryFilter.join(' AND ')} `
        : '';

      const searchQuery = `SELECT
                                id 
                            FROM redi_time_entry 
                            WHERE DATE(start_date) IN (SELECT 
                              DISTINCT DATE(a.start_date) AS start_date
                            FROM redi_time_entry a 
                            INNER JOIN redi_project_to_campaign ptc
                                ON ptc.id=a.project_campaign_id)
                            ${whereCondition}`;

      const queryReplacements = {
        project_id: projectId,
        start_date: startDate,
        end_date: endDate
      };

      let result = await this
        .sequelizeClient
        .query(searchQuery, {
          replacements: queryReplacements,
          type: this.sequelizeClient.QueryTypes.SELECT,
          raw: true
        });

      return result.map(row => row.id);
    },

    searchUserTimeEntry: async function (projectPermission, startDate, endDate, userId, projectId = null) {
      const projectRepo = new ProjectRepo(app);
      const projectDatePool = this.getPool({'project_id': projectId});
      let queryFilter = [];

      if (projectId) {
        projectDatePool.push(0);
        queryFilter.push(' p.id IN (:project_date_pool) ');
      }

      const whereCondition = queryFilter.length
        ? ` AND ${queryFilter.join(' AND ')} `
        : '';

      startDate = moment(startDate).format('YY-MM-DD 00:00:00');
      endDate = moment(endDate).format('YY-MM-DD 23:59:59');

      let selectFields = [
        'a.id',
        'a.project_campaign_id AS projectCampaignId',
        'ptc.project_id AS projectId',
        'ptc.campaign_id AS campaignId',
        'c.campaign_name AS campaignName',
        'cu.id AS customerId',
        'cu.customer_name AS customerName',
        'a.spot_id AS spotId',
        's.spot_name AS spotName',
        'a.version_id AS versionId',
        'v.version_name AS versionName',
        'a.activity_id AS activityId',
        'ac.name AS activityValue',
        'a.activity_description AS activityDescription',
        'a.start_date AS startDate',
        'a.duration',
        'a.notes',
        'a.status',
        'st.status as statusName'
      ];

      let tableJoins = ` redi_time_entry a 
        LEFT JOIN redi_spot s
          ON a.spot_id=s.id
        LEFT JOIN redi_project_to_campaign ptc
          ON ptc.id=a.project_campaign_id
        LEFT JOIN redi_project p
          ON p.id=ptc.project_id
        LEFT JOIN redi_campaign c
          ON c.id=ptc.campaign_id
        LEFT JOIN redi_version v
          ON v.id=a.version_id 
        LEFT JOIN redi_status st
          ON a.status=st.id
        LEFT JOIN redi_activity ac
          ON ac.id=a.activity_id
        LEFT JOIN redi_activity_to_type att
            ON att.activity_id=a.activity_id
        LEFT JOIN redi_activity_type atp
            ON att.type_id=atp.id
        LEFT JOIN redi_customer cu 
            ON cu.id=p.customer_id`;

      const searchQuery = `SELECT ${selectFields.join(',')} 
                FROM ${tableJoins}
                WHERE 
                  a.user_id=:user_id
                AND a.start_date>=:start_date
                AND a.start_date<=:end_date
                ${whereCondition}
                ORDER BY a.start_date ASC`;

      const queryReplacements = {
        user_id: userId,
        project_date_pool: projectDatePool,
        start_date: startDate,
        end_date: endDate
      };

      let result = await this
        .sequelizeClient
        .query(searchQuery, {
          replacements: queryReplacements,
          type: this.sequelizeClient.QueryTypes.SELECT,
          raw: true
        });

      const timeEntryIds = result.map(row => row.id);
      const files = await this.getTimeEntryFiles(timeEntryIds);

      result = result.map(row => {
        let rowFiles = files.filter(file => file.timeEntryId == row.id);
        let projectName = projectRepo.decideProjectName(projectPermission, row.projectName, null, true);

        if (projectId) {
          delete row.customerId;
          delete row.customerName;
        }

        return Object.assign({}, row, {
          files: rowFiles
        }, projectName);
      });

      return result;
    },

    // getById: async function($id)   { $dql = "SELECT a.id, a.userId,
    // a.projectCampaignId,   ptc.projectId, ptc.campaignId, c.campaignName,
    // a.spotId, s.spotName, a.versionId, v.versionName, a.activityId, ac.name AS
    // activityValue, a.activityDescription,    atp.id AS activityTypeId,
    // atp.activityType,   a.startDate, a.duration,    a.notes, a.status, st.status
    // as statusName FROM \Application\Entity\RediTimeEntry a LEFT JOIN
    // \Application\Entity\RediSpot s                   WITH a.spotId=s.id LEFT JOIN
    // \Application\Entity\RediProjectToCampaign ptc   WITH
    // ptc.id=a.projectCampaignId                 LEFT JOIN
    // \Application\Entity\RediProject p                   WITH p.id=ptc.projectId
    // LEFT JOIN \Application\Entity\RediCampaign c WITH c.id=ptc.campaignId LEFT
    // JOIN \Application\Entity\RediVersion v WITH v.id=a.versionId   LEFT JOIN
    // \Application\Entity\RediActivity ac WITH ac.id=a.activityId LEFT JOIN
    // \Application\Entity\RediStatus st  WITH a.status=st.id     LEFT JOIN
    // \Application\Entity\RediActivityToType att WITH att.activityId=a.activityId
    // LEFT JOIN \Application\Entity\RediActivityType  atp         WITH
    // att.typeId=atp.id                 WHERE a.id=:id"; $query =
    // $this->getEntityManager()->createQuery($dql); $query->setParameter('id',
    // $id);         $query->setMaxResults(1); $result = $query->getArrayResult();
    // $response = (isset($result[0])?$result[0]:null);         return $response; },
    getUserTimeEntryOfADate: async function (userId, date) {
      const startDate = moment(date).format('YY-MM-DD 00:00:00');
      const endDate = moment(date).format('YY-MM-DD 23:59:59');

      const searchQuery = `SELECT
                              *
                            FROM redi_time_entry  
                            WHERE 
                              user_id=:user_id 
                              AND start_date>=:start_date
                              AND start_date<=:end_date `;

      const queryReplacements = {
        user_id: userId,
        start_date: startDate,
        end_date: endDate
      };

      let result = await this
        .sequelizeClient
        .query(searchQuery, {
          replacements: queryReplacements,
          type: this.sequelizeClient.QueryTypes.SELECT,
          raw: true
        });

      return result;
    },
    getTimeEntryFiles: async function (timeEntryIds = []) {
      if (!timeEntryIds.length) {
        return [];
      }
      const timeEntryFileModel = new TimeEntryFileModel(app);

      const files = await timeEntryFileModel.findAll({
        attributes: [
          'timeEntryId', 'fileName', 'description', 'duration'
        ],
        where: {
          time_entry_id: timeEntryIds
        },
        order: [
          ['id', 'ASC']
        ],
        raw: true
      });

      return files;
    },

    getFilterForActivity: async function (filter = []) {
      const id = filter.id || 0;
      const userId = filter.user_id || 0;
      const status = filter.status || 0;
      const activityId = filter.activity_id || 0;

      let queryFilter = [];

      if (id) {
        queryFilter.push(' a.id=:id ');
      }

      if (userId) {
        queryFilter.push(' a.user_id=:user_id ');
      }

      if (status) {
        queryFilter.push(' a.status=:status ');
      }

      const whereCondition = queryFilter.length
        ? `  AND ${queryFilter.join(' AND ')} `
        : '';

      const searchQuery = `SELECT id 
                            FROM redi_time_entry a
                            WHERE DATE(start_date) IN (SELECT
                              DATE(a.start_date)
                            FROM redi_time_entry a 
                            WHERE 
                              a.activity_id=:activity_id)
                            ${whereCondition}`;

      const queryReplacements = {
        id,
        user_id: userId,
        status,
        activity_id: activityId
      };

      let result = await this
        .sequelizeClient
        .query(searchQuery, {
          replacements: queryReplacements,
          type: this.sequelizeClient.QueryTypes.SELECT,
          raw: true
        });

      return result.map(row => row.id);
    },
    // getTimeEntryPermissionList: async function()     {         $dql = "SELECT ut
    // FROM \Application\Entity\RediUserTypeTimeEntryPermission a  INNER JOIN
    // \Application\Entity\RediUserType ut        WITH ut.id = a.userTypeId ORDER BY
    // ut.typeName ";    $query = $this->getEntityManager()->createQuery($dql);
    // $result = $query->getArrayResult();         return $result;     },
    // getTimeApprovalPermissionList: async function()     {         $dql = "SELECT
    // a.approverUserTypeId,                   ut1.typeName AS
    // approverUserTypeName,                   a.submittingUserTypeId, ut2.typeName
    // AS submittingUserTypeName                 FROM
    // \Application\Entity\RediUserTypeTimeApprovalPermission a INNER JOIN
    // \Application\Entity\RediUserType ut1                     WITH ut1.id =
    // a.approverUserTypeId                 INNER JOIN
    // \Application\Entity\RediUserType ut2                     WITH ut2.id =
    // a.submittingUserTypeId ";         $query =
    // $this->getEntityManager()->createQuery($dql);         $result =
    // $query->getArrayResult();         $data = array();         foreach($result as
    // $row) {             if(empty($data[$row['approverUserTypeId']])) {
    // $data[$row['approverUserTypeId']] = array( 'approverUserTypeId' =>
    // $row['approverUserTypeId'], 'approverUserTypeName' =>
    // $row['approverUserTypeName'], 'submittingUserType' => array(),  );  }
    // $data[$row['approverUserTypeId']]['submittingUserType'][] = array(
    // 'submittingUserTypeId' => $row['submittingUserTypeId'],
    // 'submittingUserTypeName' => $row['submittingUserTypeName']             ); }
    // return array_values($data);     }, deleteApproverTimeApprovalPermission:
    // async function($approverIds)     { $dql = "DELETE                 FROM
    // \Application\Entity\RediUserTypeTimeApprovalPermission a WHERE
    // a.approverUserTypeId IN (:approver_user_type_id)                 "; $query =
    // $this->getEntityManager()->createQuery($dql);
    // $query->setParameter('approver_user_type_id', $approverIds);
    // $query->execute();     },     truncateTimeEntryPermissionTable: async
    // function()     {         $dql = "TRUNCATE
    // redi_user_type_time_entry_permission";         $query =
    // $this->getEntityManager()->getConnection()->prepare($dql); $query->execute();
    //     }
  };
};
