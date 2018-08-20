const assert = require('assert');
const app = require('../../api/v2/src/app');

describe('\'versionStatus\' service', () => {
  it('registered the service', () => {
    const service = app.service('version-status');

    assert.ok(service, 'Registered the service');
  });
});
