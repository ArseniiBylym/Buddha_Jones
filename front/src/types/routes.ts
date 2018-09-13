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
    ActivitiesDefinition = 'activities-definition',
    ProjectBoardPermission = 'project-board-permission',
    MyAccount = 'my-account',
}
