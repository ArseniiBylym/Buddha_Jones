// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const projectCamapign = sequelizeClient.define('redi_project_to_campaign', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    projectId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'project_id'
    },
    campaignId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'campaign_id'
    },
    firstPointOfContactId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'first_point_of_contact_id'
    },
    requestWritingTeam: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0',
      field: 'request_writing_team'
    },
    writingTeamNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'writing_team_notes'
    },
    requestMusicTeam: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0',
      field: 'request_music_team'
    },
    musicTeamNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'music_team_notes'
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    budget: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    budgetNote: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'budget_note'
    },
    POR: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    invoiceContact: {
      type: DataTypes.STRING(200),
      allowNull: true,
      field: 'invoice_contact'
    },
    materialReceiveDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'material_receive_date'
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
  projectCamapign.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return projectCamapign;
};
