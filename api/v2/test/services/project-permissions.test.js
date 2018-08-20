const assert = require('assert');
const app = require('../../api/v2/src/app');

describe('\'projectPermissions\' service', () => {
  it('registered the service', () => {
    const service = app.service('project-permissions');

    assert.ok(service, 'Registered the service');
  });
});
