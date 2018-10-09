const TimeEntryRepo = require('../../repos/time-entry.repo');
const TimeEntryModel = require('../../models/time-entry.model');

class Service {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    return [];
  }

  async get(id, params) {
    return {id, text: `A new message with ID: ${id}!`};
  }

  async create(data, params) {
    const timeEntryRepo = new TimeEntryRepo(this.app);
    const timeEntryModel = new TimeEntryModel(this.app);
    const status = 3;
    let response = {};

    const userId = data.worker_id || params.user.id;
    const date = data.date || null;

    if (userId && date) {
      const timeEntry = await timeEntryRepo.getUserTimeEntryOfADate(userId, date);

      for (let timeEntryIndex in timeEntry) {
        const row = timeEntry[timeEntryIndex];
        timeEntryModel.update({
          status
        }, {
          where: {
            id: row.id
          }
        });
      }

      response = {
        'status': 1,
        'message': 'Request successful.'
      };
    } else {
      response = {
        'status': 0,
        'message': 'Please provide required data.'
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
