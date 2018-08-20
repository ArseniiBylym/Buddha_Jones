const assert = require('assert');
const app = require('../../api/v2/src/app');

describe('\'customer\' service', () => {
  it('registered the service', () => {
    const service = app.service('customer');

    assert.ok(service, 'Registered the service');
  });
});
