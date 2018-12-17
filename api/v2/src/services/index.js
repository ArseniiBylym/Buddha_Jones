const users = require('./users/users.service.js');
const testa = require('./testa/testa.service.js');
const version = require('./version/version.service.js');
const versionStatus = require('./version-status/version-status.service.js');
const activity = require('./activity/activity.service.js');
const activityToType = require('./activity-to-type/activity-to-type.service.js');
const activityToUserType = require('./activity-to-user-type/activity-to-user-type.service.js');
const activityType = require('./activity-type/activity-type.service.js');
const billing = require('./billing/billing.service.js');
const billingActivity = require('./billing-activity/billing-activity.service.js');
const billingApproval = require('./billing-approval/billing-approval.service.js');
const billingEstimate = require('./billing-estimate/billing-estimate.service.js');
const billingStatus = require('./billing-status/billing-status.service.js');
const campaign = require('./campaign/campaign.service.js');
const comment = require('./comment/comment.service.js');
const commentType = require('./comment-type/comment-type.service.js');
const customer = require('./customer/customer.service.js');
const customerContact = require('./customer-contact/customer-contact.service.js');
const userType = require('./user-type/user-type.service.js');
const userTypeClass = require('./user-type-class/user-type-class.service.js');
const userTypeProjectPermission = require('./user-type-project-permission/user-type-project-permission.service.js');
const projectPermissions = require('./project-permissions/project-permissions.service.js');
const customerPrice = require('./customer-price/customer-price.service.js');
const project = require('./project/project.service.js');
const status = require('./status/status.service.js');
const projectHistory = require('./project-history/project-history.service.js');
const activityLevel = require('./activity-level/activity-level.service.js');
const activityPrice = require('./activity-price/activity-price.service.js');
const timeEntryOfUser = require('./time-entry-of-user/time-entry-of-user.service.js');
const timeEntryPermission = require('./time-entry-permission/time-entry-permission.service.js');
const timeApprovalPermission = require('./time-approval-permission/time-approval-permission.service.js');
const timeEntry = require('./time-entry/time-entry.service.js');
const timeEntrySubmitForReview = require('./time-entry-submit-for-review/time-entry-submit-for-review.service.js');
const timeEntryApprove = require('./time-entry-approve/time-entry-approve.service.js');
const timeEntryFile = require('./time-entry-file/time-entry-file.service.js');
const projectCampaignPeople = require('./project-campaign-people/project-campaign-people.service.js');
const projectCampaignEditor = require('./project-campaign-editor/project-campaign-editor.service.js');
const projectCampaignDesigner = require('./project-campaign-designer/project-campaign-designer.service.js');
const projectCampaignBillingUser = require('./project-campaign-billing-user/project-campaign-billing-user.service.js');
const projectCampaignOfUser = require('./project-campaign-of-user/project-campaign-of-user.service.js');
const projectCampaign = require('./project-campaign/project-campaign.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(testa);
  app.configure(version);
  app.configure(versionStatus);
  app.configure(activity);
  app.configure(activityToType);
  app.configure(activityToUserType);
  app.configure(activityType);
  app.configure(billing);
  app.configure(billingActivity);
  app.configure(billingApproval);
  app.configure(billingEstimate);
  app.configure(billingStatus);
  app.configure(campaign);
  app.configure(comment);
  app.configure(commentType);
  app.configure(customer);
  app.configure(customerContact);
  app.configure(userType);
  app.configure(userTypeClass);
  app.configure(userTypeProjectPermission);
  app.configure(projectPermissions);
  app.configure(customerPrice);
  app.configure(project);
  app.configure(status);
  app.configure(projectHistory);
  app.configure(activityLevel);
  app.configure(activityPrice);
  app.configure(timeEntryOfUser);
  app.configure(timeEntryPermission);
  app.configure(timeApprovalPermission);
  app.configure(timeEntry);
  app.configure(timeEntrySubmitForReview);
  app.configure(timeEntryApprove);
  app.configure(timeEntryFile);
  app.configure(projectCampaignPeople);
  app.configure(projectCampaignEditor);
  app.configure(projectCampaignDesigner);
  app.configure(projectCampaignBillingUser);
  app.configure(projectCampaignOfUser);
  app.configure(projectCampaign);
};