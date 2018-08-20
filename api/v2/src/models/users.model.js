// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const users = sequelizeClient.define('redi_user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name',
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name',
    },
    initials: {
      type: DataTypes.STRING(20),
    },
    image: {
      type: DataTypes.STRING,
    },
    typeId: {
      type: DataTypes.INTEGER,
      field: 'type_id',
    },
    token: {
      type: DataTypes.STRING,
    },
    tokenCreated: {
      type: DataTypes.STRING,
      field: 'token_created',
    },
    resetToken: {
      type: DataTypes.STRING,
      field: 'reset_token',
    },
    hourlyRate: {
      type: DataTypes.DOUBLE,
      field: 'hourly_rate'
    },
    salaryType: {
      type: DataTypes.CHAR(1),
      field: 'salary_type',
    },
    salaryAmount: {
      type: DataTypes.DOUBLE,
      field: 'salary_amount',
    },
    minHour: {
      type: DataTypes.INTEGER,
      field: 'min_hour',
    },
    lastLoginData: {
      type: DataTypes.DATE,
      field: 'last_login_date',
    },
    createdDate: {
      type: DataTypes.DATE,
      field: 'created_date',
    },
    status: {
      type: DataTypes.SMALLINT,
    },  
  }, {
    timestamps: false,
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  users.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return users;
};
