const assert = require('assert');
const app = require('../../api/v2/src/app');

describe('\'billingActivity\' service', () => {
  it('registered the service', () => {
    const service = app.service('billing-activity');

    assert.ok(service, 'Registered the service');
  });
});
