const assert = require('assert');
const app = require('../../api/v2/src/app');

describe('\'billingApproval\' service', () => {
  it('registered the service', () => {
    const service = app.service('billing-approval');

    assert.ok(service, 'Registered the service');
  });
});
