import { Route, RouteAccessKey } from 'types/routes';
import { DashboardAsync } from './Dashboard';
import { ProjectsListAsync } from './Projects';
import { ProjectsBoardAsync, ProjectCreateAsync } from './Project';
import { ActivitiesDefinitionListAsync, ActivityDefinitionFormAsync } from './Configuration/ActivitiesDefinition/index';
import { TimeEntryAsync } from './TimeTracking';
import { UserAccountAsync } from './User';
import { TimeApprovalAsync } from './TimeTracking/Approval';
import { ProducerSpotSentListAsync, ProducerSpotSentFormAsync } from './SpotSent';
import { ProjectBoardPermissionListAsync } from './Configuration/UserManagement/ProjectBoardPermission/List';
import { ProjectBoardPermissionEditAsync } from './Configuration/UserManagement/ProjectBoardPermission/Form';
import { UserManagementUsersListAsync } from './Configuration/UserManagement/UsersList/List';
import { NewClientRequestListAsync } from './StudioClient/NewClientRequest/List';
import { BillingStudioRateCardsAsync } from './Billing/StudioRateCard';

// Icons
const dashboardIcon = require('../assets/images/navigation/navigation-icon-dashboard.png');
const projectsIcon = require('../assets/images/navigation/navigation-icon-projects.png');
const studioIcon = require('../assets/images/navigation/navigation-icon-customer.png');
const configurationIcon = require('../assets/images/navigation/navigation-icon-activity.png');
const billingIcon = require('assets/images/navigation/navigation-icon-billing.png');

// Groups
const dashboardGroup = { key: 'dashboard', name: 'Dashboard', icon: dashboardIcon };
const projectsGroup = { key: 'projects', name: 'Projects', icon: projectsIcon };
const studioGroup = { key: 'studio', name: 'Studio', icon: studioIcon };
const configurationGroup = { key: 'configuration', name: 'Configuration', icon: configurationIcon };
const StudioClientGroup = { key: 'studio-client', name: 'StudioClient', icon: studioIcon };
const billingGroup = { key: 'billing', name: 'Billing', icon: billingIcon };

export const routes: Route[] = [
    {
        component: DashboardAsync,
        key: 'dashboard',
        accessKey: RouteAccessKey.Dashboard,
        group: dashboardGroup,
        name: 'Dashboard',
        path: '/portal',
        entry: '/portal',
        exact: true,
        allowAllUsers: true,
    },
    {
        component: ProjectsListAsync,
        key: 'projects-listing',
        accessKey: RouteAccessKey.ProjectBoard,
        group: projectsGroup,
        name: 'Projects',
        path: '/portal/projects/:pageId',
        entry: '/portal/projects/1',
        exact: false,
        allowAllUsers: false,
    },
    {
        component: ProjectCreateAsync,
        key: 'project-create',
        accessKey: RouteAccessKey.ProjectCreate,
        name: 'Create new project',
        path: '/portal/project/new',
        exact: true,
        allowAllUsers: false,
    },
    {
        component: ProjectsBoardAsync,
        key: 'project-board',
        accessKey: RouteAccessKey.ProjectBoard,
        name: 'Project board',
        path: '/portal/project/:studioId/:studioName/:projectId/:projectName/:fromPage?',
        exact: false,
        allowAllUsers: false,
    },
    {
        component: TimeEntryAsync,
        key: 'time-entry',
        accessKey: RouteAccessKey.TimeEntry,
        group: projectsGroup,
        name: 'Time entry',
        path: '/portal/time/entry',
        entry: '/portal/time/entry',
        exact: true,
        allowAllUsers: false,
    },
    {
        component: TimeApprovalAsync,
        key: 'time-approval',
        accessKey: RouteAccessKey.TimeApproval,
        group: projectsGroup,
        name: 'Time approval',
        path: '/portal/time/approval',
        entry: '/portal/time/approval',
        exact: true,
        allowAllUsers: true,
    },
    {
        component: ProducerSpotSentListAsync,
        key: 'producer-spot-sent-list',
        accessKey: RouteAccessKey.SpotSentByProducer,
        group: studioGroup,
        name: 'Spot sent',
        path: '/portal/studio/producer-spot-sent-list',
        entry: '/portal/studio/producer-spot-sent-list',
        exact: true,
        allowAllUsers: true,
    },
    {
        component: ProducerSpotSentFormAsync,
        key: 'producer-spot-sent-form',
        accessKey: RouteAccessKey.SpotSentByProducer,
        name: 'Spot sent',
        path: '/portal/studio/producer-spot-sent-details/:id',
        exact: false,
        allowAllUsers: true,
    },
    {
        component: BillingStudioRateCardsAsync,
        key: 'studio-rate-card',
        accessKey: RouteAccessKey.StudioRateCard,
        group: billingGroup,
        name: 'Studio rate card',
        path: '/portal/billing/studio-rate-card',
        entry: '/portal/billing/studio-rate-card',
        exact: true,
        allowAllUsers: true,
    },
    {
        component: ActivitiesDefinitionListAsync,
        key: 'activities-definition',
        accessKey: RouteAccessKey.ActivitiesDefinition,
        group: configurationGroup,
        name: 'Activities definition',
        path: '/portal/configuration/activities/:fromEntry?',
        entry: '/portal/configuration/activities',
        exact: false,
        allowAllUsers: false,
    },
    {
        component: ActivityDefinitionFormAsync,
        key: 'activities-definition',
        accessKey: RouteAccessKey.ActivitiesDefinition,
        name: 'Define activity',
        path: '/portal/configuration/activity/:id',
        exact: false,
        allowAllUsers: false,
    },
    {
        component: ProjectBoardPermissionEditAsync,
        key: 'project-board-permission',
        accessKey: RouteAccessKey.ProjectBoardPermission,
        name: 'Define project board permission',
        path: '/portal/configuration/user-management/project-board-permission/:id',
        exact: false,
        allowAllUsers: false,
    },
    {
        component: ProjectBoardPermissionListAsync,
        key: 'project-board-permission',
        accessKey: RouteAccessKey.ProjectBoardPermission,
        group: configurationGroup,
        name: 'User management',
        path: '/portal/configuration/user-management/project-board-permission',
        entry: '/portal/configuration/user-management/project-board-permission',
        exact: false,
        allowAllUsers: false,
    },
    {
        component: UserManagementUsersListAsync,
        key: 'user-management-users-list',
        accessKey: RouteAccessKey.ProjectBoardPermission,
        group: configurationGroup,
        name: 'User management users list',
        path: '/portal/configuration/user-management/users-list/:userTypeId',
        exact: false,
        allowAllUsers: false,
    },
    {
        component: UserAccountAsync,
        key: 'user-account',
        accessKey: RouteAccessKey.MyAccount,
        name: 'My account',
        path: '/portal/user/account',
        exact: true,
        allowAllUsers: true,
    },
    {
        component: NewClientRequestListAsync,
        key: 'new-customer-approval',
        accessKey: RouteAccessKey.NewCustomerApproval,
        group: StudioClientGroup,
        name: 'New client request',
        path: '/portal/studio-client/new-client-request',
        entry: '/portal/studio-client/new-client-request',
        exact: true,
        allowAllUsers: false,
    },
];

/*
{
    title: 'Dashboard',
    icon: require('./../assets/images/navigation/navigation-icon-dashboard.png'),
    links: [
        { path: '/', title: 'Dashboard' }
    ]
},
{
    title: 'Work',
    icon: require('./../assets/images/navigation/navigation-icon-projects.png'),
    links: [
        { path: '/projects', title: 'Projects board' },
        { path: '/time-tracking/create-entry', title: 'Create time entry' },
        { path: '/editors/project-updates', title: 'Update project progress' },
        { path: '/editors/updates', title: 'Editors updates' },
        { path: '/finish/request', title: 'Finish request' },
        { path: '/graphics', title: 'Graphics Request' }
    ]
},
{
    title: 'Billing',
    icon: require('./../assets/images/navigation/navigation-icon-time.png'),
    links: [
        { path: '/estimates', title: 'Estimate & Quote' },
        { path: '/spot/billing', title: 'Spot Billing' },
        { path: '/customer/billing', title: 'Customer' },
        { path: '/customer/pricing', title: 'Customer rate card' }
    ]
},
{
    title: 'Customer',
    icon: require('./../assets/images/navigation/navigation-icon-send.png'),
    links: [
        { path: '/spot-sent/report', title: 'Producer spot sent' },
        { path: '/spot-sent/finalize', title: 'Post team spot sent' },
        { path: '/spot/forward', title: 'Forward Spot' }
    ]
},
{
    title: 'Configuration',
    icon: require('./../assets/images/navigation/navigation-icon-activity.png'),
    links: [
        { path: '/activity', title: 'Activity definition' },
        { path: '/generic-staff', title: 'Generic staff' }
    ]
}
*/
