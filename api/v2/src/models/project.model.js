// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const project = sequelizeClient.define('redi_project', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    projectName: {
      type: DataTypes.STRING(200),
      allowNull: true,
      field: 'project_name'
    },
    projectCode: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'project_code'
    },
    projectRelease: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'project_release'
    },
    customerId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'customer_id'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
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
  project.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return project;
};
