const assert = require('assert');
const app = require('../../api/v2/src/app');

describe('\'activityType\' service', () => {
  it('registered the service', () => {
    const service = app.service('activity-type');

    assert.ok(service, 'Registered the service');
  });
});
