const assert = require('assert');
const app = require('../../api/v2/src/app');

describe('\'activityPrice\' service', () => {
  it('registered the service', () => {
    const service = app.service('activity-price');

    assert.ok(service, 'Registered the service');
  });
});
