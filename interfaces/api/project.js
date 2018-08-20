/**
 * @typedef ApiProjectCampaignUser
 * @type {Object}
 * @prop {number} userId
 * @prop {string} username
 * @prop {string} firstName
 * @prop {string} lastName
 * @prop {string} email
 * @prop {string | null} image
 * @prop {number} typeId
 * @prop {string} type
 * @prop {number} roleId
 * @prop {string} role
 */

/**
 * @typedef ApiProjectLastUpdateUser
 * @type {Object}
 * @prop {number} userId
 * @prop {string} name
 * @prop {string | null} image
 */

/**
 * @typedef ApiProjectHistory
 * @type {Object}
 * @prop {string} id
 * @prop {number} userId
 * @prop {string} username
 * @prop {string} firstName
 * @prop {string} lastName
 * @prop {string | null} image
 * @prop {string} message
 * @prop {string} createdAt
 */

/**
 * @typedef ApiProjectCampaignSpotVersion
 * @type {Object}
 * @prop {number} id
 * @prop {string} versionName
 */

/**
 * @typedef ApiProjectCampaignSpot
 * @type {Object}
 * @prop {string} id
 * @prop {string} spotName
 * @prop {number} revisions
 * @prop {number} graphicsRevisions
 * @prop {string} firstRevisionCost
 * @prop {boolean | null} revisionNotCounted
 * @prop {string | null} notes
 * @prop {ApiProjectCampaignSpotVersion[]} version
 */

/**
 * @typedef ApiProjectCampaign
 * @type {Object}
 * @prop {number} campaignId
 * @prop {string} campaignName
 * @prop {number} firstPointOfContactId
 * @prop {string | null} description
 * @prop {string | null} budget
 * @prop {boolean} requestMusicTeam
 * @prop {string | null} musicTeamNotes
 * @prop {boolean} requestWritingTeam
 * @prop {string | null} writingTeamNotes
 * @prop {ApiProjectCampaignUser[]} user
 * @prop {ApiProjectCampaignUser[]} billingUser
 */

/**
 * @typedef ApiProjectData
 * @type {Object}
 * @prop {number} id
 * @prop {string} projectName
 * @prop {string | null} notes
 * @prop {number} customerId
 * @prop {string} customerName
 * @prop {ApiProjectHistory[]} history
 * @prop {ApiProjectCampaign[]} campaign
 * @prop {ApiProjectLastUpdateUser} lastUpdateUser
 * @prop {string} lastUpdatedAt
 */

/**
 * @typedef ApiProject
 * @type {Object}
 * @prop {ApiProjectData} data
 * @prop {string} message
 * @prop {number} status
 */
