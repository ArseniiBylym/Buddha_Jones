const assert = require('assert');
const app = require('../../api/v2/src/app');

describe('\'activity\' service', () => {
  it('registered the service', () => {
    const service = app.service('activity');

    assert.ok(service, 'Registered the service');
  });
});
