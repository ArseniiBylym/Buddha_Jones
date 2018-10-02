// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const timeEntry = sequelizeClient.define('redi_time_entry', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'user_id'
    },
    projectCampaignId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'project_campaign_id'
    },
    versionId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'version_id'
    },
    spotId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'spot_id'
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'start_date'
    },
    duration: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    activityId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'activity_id'
    },
    activityDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'activity_description'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    nonBillable: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      field: 'non_billable'
    },
    createdBy: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'created_by'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_at'
    },
    approvedBy: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'approved_by'
    },
    approvedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'approved_at'
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '1'
    }
  }, {
    timestamps: false,
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  timeEntry.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return timeEntry;
};
