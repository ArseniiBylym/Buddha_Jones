import { action } from 'mobx';
import { HeaderStore } from '../store/AllStores';

interface HeaderAll {
    title?: string | null;
    subTitle?: string | null;
    preTitleSpan?: string | null;
    preSubTitleSpan?: string | null;
    elements?: JSX.Element[];
    elementsOnLeft?: JSX.Element[];
}

export class HeaderActionsClass {
    @action
    public setMainHeaderTitle = async (title: string | null, preTitleSpan: string | null = null): Promise<boolean> => {
        HeaderStore.title = title;
        HeaderStore.preTitleSpan = preTitleSpan;

        return true;
    };

    @action
    public setMainHeaderSubTitle = async (
        subTitle: string | null,
        preSubTitleSpan: string | null = null
    ): Promise<boolean> => {
        HeaderStore.subTitle = subTitle;
        HeaderStore.preSubTitleSpan = preSubTitleSpan;

        return true;
    };

    @action
    public setMainHeaderTitles = async (
        title: string | null,
        subTitle: string | null = null,
        preTitleSpan: string | null = null,
        preSubTitleSpan: string | null = null
    ): Promise<boolean> => {
        HeaderStore.title = title;
        HeaderStore.preTitleSpan = preTitleSpan;
        HeaderStore.subTitle = subTitle;
        HeaderStore.preSubTitleSpan = preSubTitleSpan;

        return true;
    };

    @action
    public setMainHeaderElements = async (elements: JSX.Element[] = []): Promise<boolean> => {
        HeaderStore.elements = elements;
        return true;
    };

    @action
    public setMainHeaderElementsOnLeft = async (elementsOnLeft: JSX.Element[] = []): Promise<boolean> => {
        HeaderStore.elementsOnLeft = elementsOnLeft;
        return true;
    };

    @action
    public setMainHeaderTitlesAndElements = async (
        title: string | null,
        subTitle: string | null = null,
        preTitleSpan: string | null = null,
        preSubTitleSpan: string | null = null,
        elements: JSX.Element[] = [],
        elementsOnLeft: JSX.Element[] = []
    ): Promise<boolean> => {
        this.setMainHeaderTitles(title, subTitle, preTitleSpan, preSubTitleSpan);
        this.setMainHeaderElements(elements);
        this.setMainHeaderElementsOnLeft(elementsOnLeft);

        return true;
    };

    @action
    public replaceMainHeaderContent = async (content: HeaderAll): Promise<boolean> => {
        HeaderStore.title = content.title || null;
        HeaderStore.preTitleSpan = content.preTitleSpan || null;
        HeaderStore.subTitle = content.subTitle || null;
        HeaderStore.preSubTitleSpan = content.preSubTitleSpan || null;
        HeaderStore.elements = content.elements || [];
        HeaderStore.elementsOnLeft = content.elementsOnLeft || [];

        return true;
    };

    @action
    public setMainHeaderToDefault = async (): Promise<boolean> => {
        HeaderStore.title = null;
        HeaderStore.preTitleSpan = null;
        HeaderStore.subTitle = null;
        HeaderStore.preSubTitleSpan = null;
        HeaderStore.elements = [];
        HeaderStore.elementsOnLeft = [];

        return true;
    };
}
