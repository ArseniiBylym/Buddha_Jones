// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const activityType = sequelizeClient.define('redi_activity_type', {
    id: {
      type: DataTypes.INTEGER(22),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    activity_type: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  activityType.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return activityType;
};
