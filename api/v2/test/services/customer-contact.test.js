const assert = require('assert');
const app = require('../../api/v2/src/app');

describe('\'customerContact\' service', () => {
  it('registered the service', () => {
    const service = app.service('customer-contact');

    assert.ok(service, 'Registered the service');
  });
});
