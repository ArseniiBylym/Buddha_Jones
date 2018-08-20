export interface NavigationGroup {
    name: string;
    icon: string;
    links: NavigationLink[];
}

export interface NavigationLink {
    name: string;
    path: string;
    exact: boolean;
    entry: string;
}

export interface NavigationGroupDetails extends NavigationGroup {
    key: string;
    index: number;
    isActive: boolean;
    links: NavigationLinkDetails[];
}

export interface NavigationLinkDetails extends NavigationLink {
    key: string;
    index: number;
    isActive: boolean;
}
