const assert = require('assert');
const app = require('../../api/v2/src/app');

describe('\'timeEntryApprove\' service', () => {
  it('registered the service', () => {
    const service = app.service('time-entry-approve');

    assert.ok(service, 'Registered the service');
  });
});
