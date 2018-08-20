const assert = require('assert');
const app = require('../../api/v2/src/app');

describe('\'campaign\' service', () => {
  it('registered the service', () => {
    const service = app.service('campaign');

    assert.ok(service, 'Registered the service');
  });
});
