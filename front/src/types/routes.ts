export interface Route {
    component: React.ComponentClass | React.StatelessComponent;
    key: string;
    accessKey: string;
    group?: {
        key: string;
        name: string;
        icon: string;
    };
    name: string;
    path: string;
    entry?: string;
    exact: boolean;
    allowAllUsers: boolean;
}

export enum RouteAccessKey {
    Dashboard = 'dashboard',
    ProjectBoard = 'project-board',
    ProjectCreate = 'project-create',
    TimeEntry = 'time-entry',
    TimeApproval = 'time-approval',
    SpotSentByProducer = 'producer-spot-sent',
<<<<<<< HEAD
    SpotBilling = 'spot-billing',
=======
    StudioRateCard = 'studio-rate-card',
>>>>>>> dev
    ActivitiesDefinition = 'activities-definition',
    ProjectBoardPermission = 'project-board-permission',
    MyAccount = 'my-account',
    NewCustomerApproval = 'new-customer-approval',
}
