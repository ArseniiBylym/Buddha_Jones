const assert = require('assert');
const app = require('../../api/v2/src/app');

describe('\'projectCamapign\' service', () => {
  it('registered the service', () => {
    const service = app.service('project-camapign');

    assert.ok(service, 'Registered the service');
  });
});
