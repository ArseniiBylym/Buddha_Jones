import { observable } from 'mobx';

export class TimeEntryPermissions {
    @observable data: number[] = [];
    @observable loading: boolean = false;
    @observable touched: boolean = false;
    @observable saving: boolean = false;
}
