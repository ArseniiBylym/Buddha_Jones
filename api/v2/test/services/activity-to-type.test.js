const assert = require('assert');
const app = require('../../api/v2/src/app');

describe('\'activityToType\' service', () => {
  it('registered the service', () => {
    const service = app.service('activity-to-type');

    assert.ok(service, 'Registered the service');
  });
});
