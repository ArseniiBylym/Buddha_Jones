const assert = require('assert');
const app = require('../../api/v2/src/app');

describe('\'userTypeProjectPermission\' service', () => {
  it('registered the service', () => {
    const service = app.service('user-type-project-permission');

    assert.ok(service, 'Registered the service');
  });
});
