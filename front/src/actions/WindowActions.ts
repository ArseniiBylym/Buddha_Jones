import { action } from 'mobx';

export class WindowActionsClass {
    @action
    static setBoardWidth = async (width: number): Promise<boolean> => {
        // TODO

        return true;
    };

    constructor() {
        //
    }
}
