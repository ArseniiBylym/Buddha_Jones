import { ApiResponse, RawApiResponse } from './api';

export interface UserData {
    id: number;
    username: string;
    email: string | null;
    name: {
        first: string | null;
        last: string | null;
        full: string | null;
    };
    initials: string;
    image: string | null;
    rates: {
        minHour: number | null;
        hourlyRate: number | null;
        salaryAmount: number | null;
        salaryType: 'S' | 'H';
    };
    type: {
        id: number;
        name: string;
    };
    allowedRouteKeys: string[];
    isActive: boolean;
}

export interface RawUserApiResponse extends RawApiResponse {
    data: UserApiResponse;
}

export interface UserApiResponse extends ApiResponse {
    data: UserDataApiResponse;
}

export interface UserDataApiResponse {
    user_id: number;
    username: string;
    email: string | null;
    first_name: string | null;
    last_name: string | null;
    full_name: string | null;
    image: string | null;
    initials: string | null;
    page_access: {
        [routeKey: string]: boolean;
    };
    min_hour: number | null;
    hourly_rate: number | null;
    salary_amount: number | null;
    salary_type: 'S' | 'H';
    type_id: number;
    type_name: string;
    token: string;
    status: 1 | 0;
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
}
