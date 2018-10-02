const assert = require('assert');
const app = require('../../api/v2/src/app');

describe('\'timeEntryPermission\' service', () => {
  it('registered the service', () => {
    const service = app.service('time-entry-permission');

    assert.ok(service, 'Registered the service');
  });
});
