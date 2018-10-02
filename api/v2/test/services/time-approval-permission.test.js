const assert = require('assert');
const app = require('../../api/v2/src/app');

describe('\'timeApprovalPermission\' service', () => {
  it('registered the service', () => {
    const service = app.service('time-approval-permission');

    assert.ok(service, 'Registered the service');
  });
});
