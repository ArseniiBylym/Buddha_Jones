// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const userTypeProjectPermission = sequelizeClient.define('redi_user_type_project_permission', {
    userTypeId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      field: 'user_type_id'
    },
    projectPermissionId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      field: 'project_permission_id'
    },
    canView: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0',
      field: 'can_view'
    },
    canEdit: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0',
      field: 'can_edit'
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
  userTypeProjectPermission.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return userTypeProjectPermission;
};
