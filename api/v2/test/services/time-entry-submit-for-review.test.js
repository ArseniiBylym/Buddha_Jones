const assert = require('assert');
const app = require('../../api/v2/src/app');

describe('\'timeEntrySubmitForReview\' service', () => {
  it('registered the service', () => {
    const service = app.service('time-entry-submit-for-review');

    assert.ok(service, 'Registered the service');
  });
});
