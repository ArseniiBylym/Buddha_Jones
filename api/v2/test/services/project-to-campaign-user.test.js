const assert = require('assert');
const app = require('../../api/v2/src/app');

describe('\'projectToCampaignUser\' service', () => {
  it('registered the service', () => {
    const service = app.service('project-to-campaign-user');

    assert.ok(service, 'Registered the service');
  });
});
