const assert = require('assert');
const app = require('../../api/v2/src/app');

describe('\'timeEntryFile\' service', () => {
  it('registered the service', () => {
    const service = app.service('time-entry-file');

    assert.ok(service, 'Registered the service');
  });
});
