const assert = require('assert');
const app = require('../../api/v2/src/app');

describe('\'projectCampaignOfUser\' service', () => {
  it('registered the service', () => {
    const service = app.service('project-campaign-of-user');

    assert.ok(service, 'Registered the service');
  });
});
