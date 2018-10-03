import * as H from 'history';
import { match } from 'react-router';

// Import individual stores
import {
    User,
    Login,
    Header,
    Navigation,
    Notifications,
    ProjectsCampaignsSpots,
    Projects,
    ProjectsDetails,
    ProjectVersions,
    Campaigns,
    CampaignPeople,
    Clients,
    Users,
    ProjectPermissions,
    Activities,
    TimeEntry,
    TimeApproval,
    Time,
    SpotSent,
} from './index';

// Construct individual stores
export const UserStore = new User();
export const LoginStore = new Login();
export const HeaderStore = new Header();
export const NavigationStore = new Navigation();
export const NotificationsStore = new Notifications();
export const ProjectsCampaignsSpotsStore = new ProjectsCampaignsSpots();
export const ProjectsStore = new Projects();
export const ProjectsDetailsStore = new ProjectsDetails();
export const ProjectsVersionsStore = new ProjectVersions();
export const CampaignsStore = new Campaigns();
export const CampaignPeopleStore = new CampaignPeople();
export const ClientsStore = new Clients();
export const UsersStore = new Users();
export const ProjectPermissionsStore = new ProjectPermissions();
export const ActivitiesStore = new Activities();
export const TimeEntryStore = new TimeEntry();
export const TimeApprovalStore = new TimeApproval();
export const TimeStore = new Time();
export const SpotSentStore = new SpotSent();

// Define combined store's interface
export interface AppStoreState {
    user: User;
    login: Login;
    header: Header;
    navigation: Navigation;
    notifications: Notifications;
    projectsCampaignsSpots: ProjectsCampaignsSpots;
    projects: Projects;
    projectsDetails: ProjectsDetails;
    projectsVersions: ProjectVersions;
    campaigns: Campaigns;
    campaignPeople: CampaignPeople;
    clients: Clients;
    users: Users;
    projectPermissions: ProjectPermissions;
    activities: Activities;
    timeEntry: TimeEntry;
    timeApproval: TimeApproval;
    time: Time;
    spotSent: SpotSent;
}

// Initialize combined stores
export const store: AppStoreState = {
    user: UserStore,
    login: LoginStore,
    header: HeaderStore,
    navigation: NavigationStore,
    notifications: NotificationsStore,
    projectsCampaignsSpots: ProjectsCampaignsSpotsStore,
    projects: ProjectsStore,
    projectsDetails: ProjectsDetailsStore,
    projectsVersions: ProjectsVersionsStore,
    campaigns: CampaignsStore,
    campaignPeople: CampaignPeopleStore,
    clients: ClientsStore,
    users: UsersStore,
    projectPermissions: ProjectPermissionsStore,
    activities: ActivitiesStore,
    timeEntry: TimeEntryStore,
    timeApproval: TimeApprovalStore,
    time: TimeStore,
    spotSent: SpotSentStore,
};

// App interface
export interface AppState {
    store?: AppStoreState;
    readonly history?: H.History;
    readonly location?: H.Location;
    readonly match?: match<string>;
    readonly params?: { [param: string]: string };
}

export interface AppOnlyStoreState {
    store?: AppStoreState;
}

export default store;
