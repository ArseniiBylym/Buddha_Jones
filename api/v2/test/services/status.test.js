const assert = require('assert');
const app = require('../../api/v2/src/app');

describe('\'status\' service', () => {
  it('registered the service', () => {
    const service = app.service('status');

    assert.ok(service, 'Registered the service');
  });
});
