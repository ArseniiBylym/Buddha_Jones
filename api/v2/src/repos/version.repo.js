const VersionModel = require('../models/version.model');
const VersionStatusModel = require('../models/version-status.model');

module.exports = function (app) {
  return {
    sequelizeClient: app.get('sequelizeClient'),

    
  };
};
