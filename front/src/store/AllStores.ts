import * as H from 'history';
import { match } from 'react-router';

// Import individual stores
import {
    Fetch,
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
    Studios,
    Users,
    ProjectPermissions,
    Activities,
    TimeEntry,
    TimeApproval,
    Time,
    SpotSent,
    SpotToBillForm,
    Channels,
    StudioRateCard,
} from './index';

// Construct individual stores
export const FetchStore = new Fetch();
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
export const StudiosStore = new Studios();
export const UsersStore = new Users();
export const ProjectPermissionsStore = new ProjectPermissions();
export const ActivitiesStore = new Activities();
export const TimeEntryStore = new TimeEntry();
export const TimeApprovalStore = new TimeApproval();
export const TimeStore = new Time();
export const SpotSentStore = new SpotSent();
export const SpotToBillFormStore = new SpotToBillForm();
export const ChannelsStore = new Channels();
export const StudioRateCardStore = new StudioRateCard();

// Define combined store's interface
export interface AppStoreState {
    fetch: Fetch;
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
    studios: Studios;
    users: Users;
    projectPermissions: ProjectPermissions;
    activities: Activities;
    timeEntry: TimeEntry;
    timeApproval: TimeApproval;
    time: Time;
    spotSent: SpotSent;
    spotToBillForm: SpotToBillForm;
    channels: Channels;
    studioRateCard: StudioRateCard;
}

// Initialize combined stores
export const store: AppStoreState = {
    fetch: FetchStore,
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
    studios: StudiosStore,
    users: UsersStore,
    projectPermissions: ProjectPermissionsStore,
    activities: ActivitiesStore,
    timeEntry: TimeEntryStore,
    timeApproval: TimeApprovalStore,
    time: TimeStore,
    spotSent: SpotSentStore,
    spotToBillForm: SpotToBillFormStore,
    channels: ChannelsStore,
    studioRateCard: StudioRateCardStore,
};

// App interface
export interface AppState {
    store?: AppStoreState;
    readonly history?: H.History;
    readonly location?: H.Location;
    readonly match?: match<string>;
}

export interface AppOnlyStoreState {
    store?: AppStoreState;
}

export default store;
