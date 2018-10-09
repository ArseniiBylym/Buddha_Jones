const assert = require('assert');
const app = require('../../api/v2/src/app');

describe('\'projectCampaignBillingUser\' service', () => {
  it('registered the service', () => {
    const service = app.service('project-campaign-billing-user');

    assert.ok(service, 'Registered the service');
  });
});
