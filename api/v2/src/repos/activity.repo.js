const ActivityModel = require('../models/activity.model');
const ActivityTypeModel = require('../models/activity-type.model');
const ActivityToTypeModel = require('../models/activity-to-type.model');
const ActivityToUserTypeModel = require('../models/activity-to-user-type.model');
const CustomerPriceModel = require('../models/customer-price.model');

module.exports = function(app){
  return {
    sequelizeClient: app.get('sequelizeClient'),

    search: async function(filter = []) {
      const paginate = app.get('paginate');

      // filters
      const search = filter.search || '';
      const typeId = parseInt(filter.type_id || 0);
      const userTypeId = parseInt(filter.user_type_id || 0);
      const projectCampaignRequired = filter.project_campaign_required || null;
      const projectCampaignSpotVersionRequired = filter.project_campaign_spot_version_required || null;
      const allowedInFuture = filter.allowed_in_future || null;
      const customerId = parseInt(filter.customer_id || 0);
      const activityId = parseInt(filter.id || 0);
      const offset = filter.offset || 0;
      const length = filter.length || paginate.default;

      //select fields for query    
      let selectFields = [
        'a.id', 
        'a.name', 
        'a.description_required AS descriptionRequired', 
        'a.billable', 
        'a.project_campaign_required AS projectCampaignRequired', 
        'a.project_campaign_spot_version_required AS projectCampaignSpotVersionRequired',
        'a.files_included AS filesIncluded', 
        'a.status', 
        'a.allowed_in_future AS allowedInFuture'
      ];

      if (customerId) {
        selectFields.push('cp.price');
      }

      let tableJoins = ` redi_activity a 
                        LEFT JOIN redi_activity_to_type att
                          ON att.activity_id=a.id
                        LEFT JOIN redi_activity_to_user_type atut
                          ON atut.activity_id=a.id
                        LEFT JOIN redi_activity_type at
                          ON at.id=att.type_id
                        LEFT JOIN redi_customer_price cp
                          ON cp.activity_id=a.id AND cp.customer_id=:customer_id`;

      let queryfilter = [];

      if(activityId) {
        queryfilter.push('a.id = :activity_id');
      }

      if (userTypeId) {
        queryfilter.push('(atut.user_type_id IN (:user_type_id) OR atut.user_type_id IS NULL)');
      }

      if (typeId) {
        queryfilter.push('(att.type_id IN (:type_id))');
      }

      if (search) {
        queryfilter.push('(a.name LIKE :search)');
      }

      if (projectCampaignRequired !== null) {
        queryfilter.push(' (a.project_campaign_required = :project_campaign_required) ');
      }

      if (projectCampaignSpotVersionRequired !== null) {
        queryfilter.push(' (a.project_campaign_spot_version_required = :project_campaign_spot_version_required) ');
      }

      if (allowedInFuture) {
        queryfilter.push(' (a.allowed_in_future = :allowed_in_future) ');
      }

      const whereCondition = queryfilter.length ? `  WHERE ${queryfilter.join(' AND ')} ` : '';
      const searchQuery = `SELECT ${selectFields.join(',')} 
                            FROM ${tableJoins} 
                            ${whereCondition} 
                            GROUP BY a.id 
                            ORDER BY a.name ASC, at.activity_type ASC
                            LIMIT ${length} OFFSET ${offset} `;
      const searchCountQuery = `SELECT COUNT(DISTINCT a.id) AS total_count FROM ${tableJoins} ${whereCondition} `;
      
      const queryReplacements = {
        activity_id: activityId,
        user_type_id: userTypeId,
        type_id: typeId,
        project_campaign_required: projectCampaignRequired,
        project_campaign_spot_version_required: projectCampaignSpotVersionRequired,
        allowed_in_future: allowedInFuture,
        customer_id: customerId,
        search: '%' + search + '%'
      };

      let result = await this.sequelizeClient.query(searchQuery, {
        replacements: queryReplacements,
        type: this.sequelizeClient.QueryTypes.SELECT
      });

      const pool = result.map(({id}) => id);
      const poolActivityType = await this.getActivityTypeByActivityId(pool);
      const poolUserType = await this.getUserTypeByActivityId(pool);

      result = result.map(row => {
        const type = poolActivityType.filter(activityType => activityType.activityId == row.id);
        const userType = poolUserType.filter(userType => userType.activityId == row.id);

        return Object.assign({}, row, {type, userType});
      });

      let resultCount = await this.sequelizeClient.query(searchCountQuery, {
        replacements: queryReplacements,
        type: this.sequelizeClient.QueryTypes.SELECT
      });
    
      return {
        data: result,
        totalCount: resultCount[0].total_count
      };
    },

    getActivityTypeByActivityId: async function(activityId) {
      if (!activityId || !activityId.length) {
        return [];
      }

      const query = `SELECT at.*, att.activity_id AS activityId
                      FROM redi_activity_to_type att
                      INNER JOIN redi_activity_type at
                        ON at.id=att.type_id 
                      WHERE att.activity_id IN (:activity_id)
                      GROUP BY at.id
                      ORDER BY at.activity_type ASC`;

      let result = await this.sequelizeClient.query(query, {
        replacements: {
          activity_id: activityId
        },
        type: this.sequelizeClient.QueryTypes.SELECT,
        raw: true
      });

      return result;
    },

    getUserTypeByActivityId: async function(activityId) {
      if (!activityId || !activityId.length) {
        return [];
      }
      
      const query = `SELECT ut.*, atut.activity_id AS activityId
                FROM redi_activity_to_user_type atut
                INNER JOIN redi_user_type ut
                  ON ut.id=atut.user_type_id 
                WHERE atut.activity_id IN (:activity_id)
                GROUP BY ut.id
                ORDER BY ut.id ASC`;

      let result = await this.sequelizeClient.query(query, {
        replacements: {
          activity_id: activityId
        },
        type: this.sequelizeClient.QueryTypes.SELECT,
        raw: true
      });

      return result;
    },

    getActivityByName: async function(name, activityId = 0) {
      const activityModel = new ActivityModel(app);
      let whereCondition = {
        name
      };

      if(activityId) {
        whereCondition = Object.assign({}, whereCondition, {id: {$ne: activityId}});
      }

      const activity = await activityModel.findOne({
        where: whereCondition,
        raw: true
      });

      return activity;
    },

    addActivityToType: async function(activityId, typeIds, deleteExisting = false) {
      if(!activityId || !typeIds || !typeIds.length) {
        return;
      }

      const activityToTypeModel = new ActivityToTypeModel(app);

      if(deleteExisting) {
        await activityToTypeModel.destroy({where: {activityId}});
      }

      const createData = typeIds.map(typeId => ({
        typeId,
        activityId
      }));
      await activityToTypeModel.bulkCreate(createData);
    },

    addActivityToUserType: async function(activityId, userTypeIds, deleteExisting = false) {
      if(!activityId || !userTypeIds || !userTypeIds.length) {
        return;
      }

      const activityToUserTypeModel = new ActivityToUserTypeModel(app);

      if(deleteExisting) {
        await activityToUserTypeModel.destroy({where: {activityId}});
      }

      const createData = userTypeIds.map(userTypeId => ({
        userTypeId,
        activityId
      }));

      await activityToUserTypeModel.bulkCreate(createData);
    },

    getAllActivityType: async function(){
      const activityTypeModel = new ActivityTypeModel(app);

      const result = await activityTypeModel.findAll({
        order: [['id', 'ASC']],
        raw: true
      });
      
      return result;
    },

    createOrUpdateCustomerPrice: async function(data) {
      const customerPriceModel = new CustomerPriceModel(app);

      customerPriceModel.upsert(data);
    }
  };
};
