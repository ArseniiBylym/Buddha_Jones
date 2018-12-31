import { observable } from 'mobx';

export class TimeApprovalPermissions {
    @observable data: {
        [key: number]: number[];
    } = {};
    @observable loading: boolean = false;
    @observable touched: boolean = false;
    @observable saving: boolean = false;
}
