const assert = require('assert');
const app = require('../../api/v2/src/app');

describe('\'customerPrice\' service', () => {
  it('registered the service', () => {
    const service = app.service('customer-price');

    assert.ok(service, 'Registered the service');
  });
});
