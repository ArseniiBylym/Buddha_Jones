import { observable } from 'mobx';

export class Header {
    @observable public title: string | null = null;
    @observable public preTitleSpan: string | null = null;
    @observable public afterTitleSpan: string | null = null;
    @observable public subTitle: string | null = null;
    @observable public preSubTitleSpan: string | null = null;
    @observable public elementsOnLeft: JSX.Element[] = [];
    @observable public elements: JSX.Element[] = [];

    @observable public pageHasWideLayout: boolean = false;
}
