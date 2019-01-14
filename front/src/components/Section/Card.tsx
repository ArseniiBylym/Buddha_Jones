import * as classNames from 'classnames';
import _truncate from 'lodash-es/truncate';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import AnimateHeight from 'react-animate-height';
import { IconArrowTopBlue, IconDropdownArrow } from '../Icons';

const s = require('./Card.css');

interface CardProps {
    innerRef?: (container: HTMLDivElement) => void;
    innerRefForHeader?: (header: HTMLDivElement) => void;
    className?: string;
    classNameForHeader?: string;
    classNameForContentAboveTitleBar?: string;
    classNameForHeaderTitleBar?: string;
    classNameForHeaderTitle?: string;
    classNameForHeaderContent?: string;
    classNameForContent?: string;
    title?: string;
    titleWhenExpanded?: string;
    subTitle?: string;
    subTitleWhenExpanded?: string;
    truncuateSubTitleToCharacters?: number;
    hideSubTitleWhenExpanded?: boolean;
    headerElements?: JSX.Element;
    contentAboveTitleBar?: JSX.Element;
    headerContent?: JSX.Element;
    isExpandable?: boolean;
    isHeaderFixed?: boolean;
    noPadding?: boolean;
    noTitleBarPadding?: boolean;
}

@observer
export class Card extends React.Component<CardProps, {}> {
    static get defaultProps(): CardProps {
        return {
            innerRef: undefined,
            innerRefForHeader: undefined,
            className: undefined,
            classNameForHeader: undefined,
            classNameForContentAboveTitleBar: undefined,
            classNameForHeaderTitleBar: undefined,
            classNameForHeaderTitle: undefined,
            classNameForHeaderContent: undefined,
            classNameForContent: undefined,
            title: '',
            titleWhenExpanded: '',
            subTitle: '',
            subTitleWhenExpanded: '',
            truncuateSubTitleToCharacters: undefined,
            hideSubTitleWhenExpanded: false,
            headerElements: undefined,
            contentAboveTitleBar: undefined,
            headerContent: undefined,
            isExpandable: true,
            isHeaderFixed: false,
            noPadding: false,
            noTitleBarPadding: false,
        };
    }

    @observable private isExpanded: boolean = this.props.isExpandable ? false : true;

    public render() {
        return (
            <div
                ref={this.referenceContainer}
                className={classNames(
                    s.container,
                    {
                        [s.expanded]: this.isExpanded,
                    },
                    this.props.className
                )}
            >
                {(this.props.isExpandable ||
                    this.props.title ||
                    this.props.subTitle ||
                    this.props.headerElements ||
                    this.props.headerContent ||
                    this.props.contentAboveTitleBar) && (
                    <div
                        ref={this.referenceHeader}
                        className={classNames(
                            s.header,
                            {
                                [s.fixed]: this.props.isHeaderFixed,
                            },
                            this.props.classNameForHeader
                        )}
                    >
                        {this.props.contentAboveTitleBar && (
                            <div
                                className={classNames(
                                    s.contentAboveTitleBar,
                                    this.props.classNameForContentAboveTitleBar
                                )}
                            >
                                {this.props.contentAboveTitleBar}
                            </div>
                        )}

                        {(this.props.isExpandable ||
                            this.props.title ||
                            this.props.subTitle ||
                            this.props.headerElements) &&
                            this.renderTitleBar()}

                        {this.props.headerContent && (
                            <div className={classNames(s.headerContent, this.props.classNameForHeaderContent)}>
                                {this.props.headerContent}
                            </div>
                        )}
                    </div>
                )}

                {this.renderContent()}
            </div>
        );
    }

    private renderTitleBar() {
        return (
            <div
                className={classNames(
                    s.titleBar,
                    { [s.noPadding]: this.props.noTitleBarPadding },
                    this.props.classNameForHeaderTitleBar
                )}
            >
                <div className={s.left}>
                    {(this.props.isExpandable && (
                        <button
                            onClick={this.handleTogglingExpansion}
                            className={classNames(s.name, s.nameButton, this.props.classNameForHeaderTitle)}
                        >
                            <span className={classNames({ [s.expanded]: this.isExpanded })}>
                                <IconArrowTopBlue className={s.arrowCollapse} width={10} height={16} />
                                <IconDropdownArrow className={s.arrowExpand} width={12} height={8} />
                            </span>

                            {this.renderTitle()}
                            {this.renderSubTitle()}
                        </button>
                    )) || (
                        <p className={classNames(s.name, this.props.classNameForHeaderTitle)}>
                            {this.renderTitle()}
                            {this.renderSubTitle()}
                        </p>
                    )}
                </div>

                <div className={s.right}>{this.props.headerElements}</div>
            </div>
        );
    }

    private renderTitle() {
        const text =
            this.isExpanded && this.props.isExpandable && this.props.titleWhenExpanded
                ? this.props.titleWhenExpanded
                : this.props.title;

        return text ? <strong>{text}</strong> : null;
    }

    private renderSubTitle() {
        const text =
            this.isExpanded && this.props.isExpandable && this.props.subTitleWhenExpanded
                ? this.props.subTitleWhenExpanded
                : this.props.subTitle;

        return text ? (
            <em
                className={classNames({
                    [s.invisible]: this.props.hideSubTitleWhenExpanded && this.isExpanded,
                })}
            >
                {_truncate(text, {
                    length: this.props.truncuateSubTitleToCharacters || 9999,
                })}
            </em>
        ) : null;
    }

    private renderContent() {
        if (
            typeof this.props.children === 'undefined' ||
            this.props.children === null ||
            this.props.children === false
        ) {
            return null;
        }

        const contentClassName = classNames(
            s.content,
            { [s.noPadding]: this.props.noPadding },
            this.props.classNameForContent
        );

        return this.props.isExpandable ? (
            <AnimateHeight height={this.isExpanded ? 'auto' : 0} duration={500}>
                <div className={contentClassName}>{this.props.children}</div>
            </AnimateHeight>
        ) : (
            <div className={contentClassName}>{this.props.children}</div>
        );
    }

    private referenceContainer = (ref: HTMLDivElement) => {
        if (this.props.innerRef) {
            this.props.innerRef(ref);
        }
    };

    private referenceHeader = (ref: HTMLDivElement) => {
        if (this.props.innerRefForHeader) {
            this.props.innerRefForHeader(ref);
        }
    };

    private handleTogglingExpansion = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        this.toggleExpansion();
    };

    public toggleExpansion = () => {
        this.isExpanded = !this.isExpanded;
    };

    public expandCard = () => {
        this.isExpanded = true;
    };

    public collapseCard = () => {
        this.isExpanded = false;
    };
}
