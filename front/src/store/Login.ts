import { observable, computed } from 'mobx';
import { LoginStatus } from 'types/statuses';

export class Login {
    @observable public username: string = '';
    @observable public password: string = '';
    @observable public status: LoginStatus = LoginStatus.None;

    @computed
    public get statusIsError(): boolean {
        return this.status === LoginStatus.Error || this.status === LoginStatus.ErrorBothFieldsRequired;
    }
}
