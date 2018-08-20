// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const campaign = sequelizeClient.define('redi_campaign', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    campaignName: {
      type: DataTypes.STRING(22),
      allowNull: true,
      field: 'campaign_name'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    editorReq: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'editor_req'
    },
    materialReceived: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'material_received'
    },
    createdByUserId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'created_by_user_id'
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
  campaign.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return campaign;
};
