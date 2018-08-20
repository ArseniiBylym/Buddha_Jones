const assert = require('assert');
const app = require('../../api/v2/src/app');

describe('\'billingEstimate\' service', () => {
  it('registered the service', () => {
    const service = app.service('billing-estimate');

    assert.ok(service, 'Registered the service');
  });
});
