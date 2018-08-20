const assert = require('assert');
const app = require('../../api/v2/src/app');

describe('\'commentType\' service', () => {
  it('registered the service', () => {
    const service = app.service('comment-type');

    assert.ok(service, 'Registered the service');
  });
});
