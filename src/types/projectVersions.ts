export interface ProjectVersionFromApi {
    id: number;
    versionName: string;
    custom: 1 | 0 | null;
}

export interface ProjectVersion {
    value: number | null;
    label: string;
    isCustom: boolean;
}

export interface ProjectVersionCreateFromApi {
    version: {
        id: number;
        versionName: string;
        custom: 1 | 0 | null;
    };
}

export interface ProjectVersionStatus {
    id: number | null;
    name: string;
}
