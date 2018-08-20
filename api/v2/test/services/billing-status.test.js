const assert = require('assert');
const app = require('../../api/v2/src/app');

describe('\'billingStatus\' service', () => {
  it('registered the service', () => {
    const service = app.service('billing-status');

    assert.ok(service, 'Registered the service');
  });
});
