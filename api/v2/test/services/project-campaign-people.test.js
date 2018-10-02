const assert = require('assert');
const app = require('../../api/v2/src/app');

describe('\'projectCampaignPeople\' service', () => {
  it('registered the service', () => {
    const service = app.service('project-campaign-people');

    assert.ok(service, 'Registered the service');
  });
});
