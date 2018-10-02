const assert = require('assert');
const app = require('../../api/v2/src/app');

describe('\'timeEntryOfUser\' service', () => {
  it('registered the service', () => {
    const service = app.service('time-entry-of-user');

    assert.ok(service, 'Registered the service');
  });
});
