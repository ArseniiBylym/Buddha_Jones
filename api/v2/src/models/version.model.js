const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const version = sequelizeClient.define('redi_version', {
    version_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    seq: {
      type: DataTypes.SMALLINT,
      defaultValue: 1
    },
    custom: {
      type: DataTypes.SMALLINT,
      defaultValue: 1
    },
    active: {
      type: DataTypes.SMALLINT,
      defaultValue: 1
    },
    created_user_id: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    updated_user_id: {
      type: DataTypes.INTEGER,
      defaultValue: null
    }    
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  version.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return version;
};
