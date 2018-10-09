const assert = require('assert');
const app = require('../../api/v2/src/app');

describe('\'projectCampaign\' service', () => {
  it('registered the service', () => {
    const service = app.service('project-campaign');

    assert.ok(service, 'Registered the service');
  });
});
