const TimeEntryRepo = require('../../repos/time-entry.repo');
const UserRepo = require('../../repos/user.repo');
const TimeEntryModel = require('../../models/time-entry.model');
const moment = require('moment');
const _ = require('lodash');

class Service {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    let response = {};
    let searchFilter = Object.assign({}, params.query, {
      current_user_type_id: params.user.typeId,
      projectPermission: params.projectPermission,
      offset: 0,
      length: 9999999999999999999
    });

    const timeEntryRepo = new TimeEntryRepo(this.app);
    const timeEntryData = await timeEntryRepo.search(searchFilter);
    let data = {};

    for (let index in timeEntryData.data) {
      const row = timeEntryData.data[index];
      const rowDate = moment(row.startDate).format('YYYY-MM-DD');

      if (!data[rowDate]) {
        data[rowDate] = {
          'date': rowDate,
          'users': {}
        };
      }

      if (!data[rowDate]['users'][row['userId']]) {
        data[rowDate]['users'][row.userId] = {
          'userId': row.userId,
          'userName': row.username,
          'userInitials': row.initials,
          'userFullName': `${row.firstName} ${row.lastName}`,
          'userMinHours': row.minHour,
          'entries': []
        };
      }

      const userId = row['userId'];
      delete row.userId;
      delete row.username;
      delete row.initials;
      delete row.firstName;
      delete row.lastName;
      delete row.minHour;

      data[rowDate]['users'][userId]['entries'].push(row);
    }

    for (let index in data) {
      data[index]['date'] = index;
      data[index]['users'] = Object.values(data[index]['users']);
    }

    data = Object.values(data);

    response = {
      'status': 1,
      'message': 'Request successful',
      'data': data
    };

    return response;
  }

  async get(id, params) {
    return {id, text: `A new message with ID: ${id}!`};
  }

  async create(data, params) {
    const userRepo = new UserRepo(this.app);
    const timeEntryRepo = new TimeEntryRepo(this.app);
    const timeEntryModel = new TimeEntryModel(this.app);

    const allTimeEntryPermission = userRepo.getUserTimeEntryAccess(params.user.typeId);
    const canApproveTimeEntryOfUser = userRepo.getUserToApproveTimeEntry(params.user.typeId);

    const existingStatus = 3; // filter time entries which are sent for review
    let userTypeIds = [0];
    let response = {};
    let ids = JSON.parse(data.ids || '');
    const status = parseInt(data.status) || null

    if (allTimeEntryPermission && canApproveTimeEntryOfUser.length > 0) {
      userTypeIds = canApproveTimeEntryOfUser;
    }

    const searchFilter = Object.assign({}, params.query, {
      current_user_type_id: params.user.typeId,
      user_type_id: userTypeIds,
      projectPermission: params.projectPermission,
      status: existingStatus,
      offset: 0,
      length: 9999999999999999999
    });

    let timeEntryData = await timeEntryRepo.search(searchFilter);
    timeEntryData = timeEntryData
      .data
      .map(({id}) => id);

    if (timeEntryData.length) {
      if (ids && status && [4, 6].includes(status)) {
        ids = _.intersection(timeEntryData, ids);

        if (ids.length) {
          await timeEntryModel.update({
            status: status
          }, {
            where: {
              id: ids
            }
          });
        }

        response = {
          status: 1,
          message: 'Request successful'
        };
      } else {
        response = {
          status: 0,
          message: 'Please provide required data(ids and status(approve=4, reopen=6).'
        };
      }
    } else {
      response = {
        status: 0,
        message: 'Permission denied'
      };
    }

    return response;
  }

  async update(id, data, params) {
    return data;
  }

  async patch(id, data, params) {
    return data;
  }

  async remove(id, params) {
    return {id};
  }

  setup(app) {
    this.app = app;
    this.sequelizeClient = app.get('sequelizeClient');
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
