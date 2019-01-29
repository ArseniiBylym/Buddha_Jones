import * as classNames from 'classnames';
import { ButtonExpand, ButtonExpandTitles } from 'components/Button';
import _truncate from 'lodash-es/truncate';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import AnimateHeight from 'react-animate-height';

const s = require('./Card.css');

interface CardProps extends ButtonExpandTitles {
    innerRef?: (container: HTMLDivElement) => void;
    innerRefForHeader?: (header: HTMLDivElement) => void;
    className?: string;
    classNameForHeader?: string;
    classNameForContentAboveTitleBar?: string;
    classNameForHeaderTitleBar?: string;
    classNameForHeaderTitle?: string;
    classNameForHeaderContent?: string;
    classNameForContent?: string;
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
                    <ButtonExpand
                        className={this.props.classNameForHeaderTitle}
                        onToggle={this.props.isExpandable ? this.handleTogglingExpansion : undefined}
                        isExpanded={this.isExpanded}
                        title={this.props.title}
                        titleWhenExpanded={this.props.titleWhenExpanded}
                        subTitle={this.props.subTitle}
                        subTitleWhenExpanded={this.props.subTitleWhenExpanded}
                        hideSubTitleWhenExpanded={this.props.hideSubTitleWhenExpanded}
                        truncuateSubTitleToCharacters={this.props.truncuateSubTitleToCharacters}
                    />
                </div>

                <div className={s.right}>{this.props.headerElements}</div>
            </div>
        );
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

    private handleTogglingExpansion = (isExpanded: boolean) => {
        this.isExpanded = isExpanded;
    };
}
