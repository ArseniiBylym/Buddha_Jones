import { Route, RouteAccessKey } from 'types/routes';
import { BillingStudioRateCardAsync, BillingStudioRateCardsAsync } from './Billing/StudioRateCard';
import { ActivitiesDefinitionListAsync, ActivityDefinitionFormAsync } from './Configuration/ActivitiesDefinition/index';
import { ProjectBoardPermissionEditAsync } from './Configuration/UserManagement/ProjectBoardPermission/Form';
import { ProjectBoardPermissionListAsync } from './Configuration/UserManagement/ProjectBoardPermission/List';
import { UserManagementUsersListAsync } from './Configuration/UserManagement/UsersList/List';
import { DashboardAsync } from './Dashboard';
import { ProjectCreateAsync, ProjectsBoardAsync } from './Project';
import { ProjectsListAsync } from './Projects';
import { BillSpotFormAsync } from './SpotBilling/BillSpotForm/BillSpotFormAsync';
import { SpotsToBillAsync } from './SpotBilling/SpotsToBill/SpotsToBillAsync';
import { SpotsToEDLAsync } from './SpotEDL/SpotsToEDL/SpotsToEDLAsync';
import { SpotsToGraphicsAsync } from './SpotGraphics/SpotsToGraphics/SpotsToGraphicsAsync';
import { SpotsToGraphicsSentAsync } from './SpotGraphicsSent/SpotsToGraphicsSent/SpotsToGraphicsSentAsync';
import { SpotsPostAsync } from './SpotPost/SpotsPostAsync';
import { ProducerSpotSentFormAsync, ProducerSpotSentListAsync } from './SpotSent';
import { NewClientRequestListAsync } from './StudioClient/NewClientRequest/List';
import { TimeApprovalPermissionsAsync } from './TimeCardPermissions/TimeApprovalPermissions';
import { TimeEntryPermissionsAsync } from './TimeCardPermissions/TimeEntryPermissions';
import { TimeEntryAsync } from './TimeTracking';
import { TimeApprovalAsync } from './TimeTracking/Approval';
import { UserAccountAsync } from './User';

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
        name: 'Spot sent request',
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
        component: SpotsPostAsync,
        key: 'spot-post-finish-request',
        accessKey: RouteAccessKey.SpotBilling,
        group: studioGroup,
        name: 'Spot post/finish request',
        path: '/portal/spot-post-finish-request',
        entry: '/portal/spot-post-finish-request',
        exact: false,
        allowAllUsers: true,
    },
    {
        component: SpotsToBillAsync,
        key: 'spots-to-bill',
        accessKey: RouteAccessKey.SpotBilling,
        group: studioGroup,
        name: 'Spots to bill',
        path: '/portal/spots-to-bill',
        entry: '/portal/spots-to-bill',
        exact: true,
        allowAllUsers: true,
    },
    {
        component: BillSpotFormAsync,
        key: 'bill-spot-form',
        accessKey: RouteAccessKey.SpotBilling,
        name: 'Bill spot form',
        path: '/portal/bill-spot-form/:id',
        exact: false,
        allowAllUsers: true,
    },
    {
        component: SpotsToGraphicsAsync,
        key: 'spots-to-graphics',
        accessKey: RouteAccessKey.SpotBilling,
        group: studioGroup,
        name: 'Spots to graphics',
        path: '/portal/spots-to-graphics',
        entry: '/portal/spots-to-graphics',
        exact: true,
        allowAllUsers: true,
    },
    {
        component: SpotsToEDLAsync,
        key: 'spots-to-edl',
        accessKey: RouteAccessKey.SpotBilling,
        group: studioGroup,
        name: 'Spots to EDL',
        path: '/portal/spots-to-edl',
        entry: '/portal/spots-to-edl',
        exact: true,
        allowAllUsers: true,
    },
    {
        component: SpotsToGraphicsSentAsync,
        key: 'graphics-spot-sent',
        accessKey: RouteAccessKey.SpotBilling,
        // key: 'new-customer-approval',
        // accessKey: RouteAccessKey.NewCustomerApproval,
        group: studioGroup,
        name: 'Graphics Spot Sent',
        path: '/portal/graphics-spot-sent',
        entry: '/portal/graphics-spot-sent',
        exact: true,
        // allowAllUsers: true,
        allowAllUsers: false,
        subModuleAccess: 7,
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
        component: BillingStudioRateCardAsync,
        key: 'studio-rate-card',
        accessKey: RouteAccessKey.StudioRateCard,
        group: billingGroup,
        name: 'Studio rate card',
        path: '/portal/billing/studio-rate-card/:studio_id/:rate_card_id?',
        exact: false,
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
        component: TimeEntryPermissionsAsync,
        key: 'time-entry-permissions',
        accessKey: RouteAccessKey.ProjectBoardPermission,
        group: configurationGroup,
        name: 'Time Entry Permissions',
        path: '/portal/configuration/user-management/time-entry-permissions',
        entry: '/portal/configuration/user-management/time-entry-permissions',
        exact: false,
        allowAllUsers: false,
    },
    {
        component: TimeApprovalPermissionsAsync,
        key: 'time-approval-permissions',
        accessKey: RouteAccessKey.ProjectBoardPermission,
        // group: configurationGroup,
        name: 'Time Approval Permissions',
        path: '/portal/configuration/user-management/time-approval-permissions/:id',
        entry: '/portal/configuration/user-management/time-approval-permissions/:id',
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
