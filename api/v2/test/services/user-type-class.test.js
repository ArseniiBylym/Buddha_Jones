const assert = require('assert');
const app = require('../../api/v2/src/app');

describe('\'userTypeClass\' service', () => {
  it('registered the service', () => {
    const service = app.service('user-type-class');

    assert.ok(service, 'Registered the service');
  });
});
