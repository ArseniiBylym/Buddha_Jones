const assert = require('assert');
const app = require('../../api/v2/src/app');

describe('\'timeEntry\' service', () => {
  it('registered the service', () => {
    const service = app.service('time-entry');

    assert.ok(service, 'Registered the service');
  });
});
