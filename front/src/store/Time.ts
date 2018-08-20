import { observable } from 'mobx';

export class Time {
    @observable public now: Date = new Date();

    constructor() {
        setInterval(() => {
            this.now = new Date();
        }, 1000 * 60);
    }
}