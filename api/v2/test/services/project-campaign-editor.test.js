const assert = require('assert');
const app = require('../../api/v2/src/app');

describe('\'projectCampaignEditor\' service', () => {
  it('registered the service', () => {
    const service = app.service('project-campaign-editor');

    assert.ok(service, 'Registered the service');
  });
});
