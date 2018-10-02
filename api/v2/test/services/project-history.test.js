const assert = require('assert');
const app = require('../../api/v2/src/app');

describe('\'projectHistory\' service', () => {
  it('registered the service', () => {
    const service = app.service('project-history');

    assert.ok(service, 'Registered the service');
  });
});
