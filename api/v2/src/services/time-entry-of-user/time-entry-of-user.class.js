const moment = require('moment');
const TimeEntryRepo = require('../../repos/time-entry.repo');

class Service {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    const timeEntryRepo = new TimeEntryRepo(this.app);
    const workerId = params.query.worker_id || params.user.id;
    let projectId = params.query.project_id || null;
    const startDate = params.query.start_date || null;
    const endDate = params.query.end_date || null;
    let response = {};

    if (projectId === '' || projectId === 'null') {
      projectId = null;
    }

    if (startDate && endDate) {
      const dateRange = this.getDatesFromRange(startDate, endDate);

      let timeEntryData = await timeEntryRepo.searchUserTimeEntry(params.projectPermission, startDate, endDate, workerId, projectId);
      let data = {};

      for (let rangeIndex in dateRange) {
        data[dateRange[rangeIndex]] = [];
      }

      for (let timeEntryIndex in timeEntryData) {
        const row = timeEntryData[timeEntryIndex];
        const rowDate = moment(row.startDate).format('YYYY-MM-DD');

        data[rowDate].push(row);
      }

      timeEntryData = [];

      for (let rowIndex in data) {

        const row = data[rowIndex];
        timeEntryData.push({'date': rowIndex, 'entries': row});
      }

      response = {
        'status': 1,
        'message': 'Request successful',
        'data': timeEntryData
      };
    } else {
      response = {
        'status': 0,
        'message': 'Please provide required data.'
      };
    }

    return response;
  }

  async get(id, params) {
    return {id, text: `A new message with ID: ${id}!`};
  }

  async create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
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

  getDatesFromRange(startDate, endDate, dateFormat = 'YYYY-MM-DD') {
    let dates = [];
    startDate = moment(startDate);
    endDate = moment(endDate);
    const end = moment(endDate);
    const diff = endDate.diff(startDate, 'days');

    if (!startDate.isValid() || !endDate.isValid() || diff <= 0) {
      return;
    }

    for (var i = 0; i <= diff; i++) {
      dates.push(end.subtract(1, 'd').format(dateFormat));
    }

    return dates.reverse();
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
