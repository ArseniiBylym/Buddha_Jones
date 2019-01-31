import { ApiResponse, RawApiResponse } from './api';
import { UserPermissionFromApi } from './projectPermissions';

export interface RawUserApiResponse extends RawApiResponse {
    data: UserApiResponse;
}

export interface UserApiResponse extends ApiResponse {
    data: UserData;
}

export interface ModuleAccess {
    id: number;
    moduleName: string;
    subModule: [
        {
            canAccess: boolean;
            id: number;
            subModuleName: string;
        }
    ];
}

export interface UserData {
    createdDate: any;
    lastLoginDate: any;
    nickName: any;
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    image: string;
    initials: string;
    pageAccess: {
        [routeKey: string]: boolean;
    };
    minHour: number;
    projectPermissions: UserPermissionFromApi;
    hourlyRate: number;
    salaryAmount: number;
    salaryType: 'S' | 'H';
    typeId: number;
    typeName: string;
    token: string;
    status: 1 | 0;
    allowedRouteKeys: string[];
    moduleAccess: ModuleAccess[];
}

export enum UserLoginStatus {
    SignedOut,
    LoggingIn,
    LoginError,
    LoggedIn,
}

export enum UserTypesId {
    Admin = 1,
    AdminManager = 2,
    FinishingManager = 3,
    AssitantEditor = 4,
    BillingCoordinator = 5,
    CreativeManager = 6,
    Editor = 7,
    EditorialManager = 8,
    Finishing = 9,
    GamesCaptureAritist = 10,
    GamesManager = 11,
    GraphicDesigner = 12,
    GraphicsCoordinator = 13,
    GraphicsDeptHeads = 14,
    HR = 15,
    IT = 16,
    ITManager = 17,
    Musicican = 18,
    MusicManager = 19,
    Owners = 20,
    Producer = 21,
    ProductionAssistant = 22,
    ProductionCoordinator = 23,
    SeniorBilling = 24,
    SeniorManagement = 25,
    Writer = 26,
    CreativeDirector = 27,
    CoOwner = 28,
    Adminstrator = 99,
    SuperAdministrator = 100,
}

export enum UserTypeClassId {
    BillingTeam = 'B',
    CreativeTeam = 'C',
    EditorialTeam = 'E',
    GraphicsTeam = 'G',
    AdditionalTeam = 'A',
}
