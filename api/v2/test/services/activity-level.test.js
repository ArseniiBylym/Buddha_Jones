const assert = require('assert');
const app = require('../../api/v2/src/app');

describe('\'activityLevel\' service', () => {
  it('registered the service', () => {
    const service = app.service('activity-level');

    assert.ok(service, 'Registered the service');
  });
});
