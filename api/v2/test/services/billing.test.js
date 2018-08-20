const assert = require('assert');
const app = require('../../api/v2/src/app');

describe('\'billing\' service', () => {
  it('registered the service', () => {
    const service = app.service('billing');

    assert.ok(service, 'Registered the service');
  });
});
