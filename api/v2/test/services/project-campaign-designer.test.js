const assert = require('assert');
const app = require('../../api/v2/src/app');

describe('\'projectCampaignDesigner\' service', () => {
  it('registered the service', () => {
    const service = app.service('project-campaign-designer');

    assert.ok(service, 'Registered the service');
  });
});
