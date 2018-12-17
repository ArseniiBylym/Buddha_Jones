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
    title?: string;
    subTitle?: string;
    truncuateSubTitleToCharacters?: number;
    hideSubTitleWhenExpanded?: boolean;
    headerElements?: JSX.Element[];
    isExpandable?: boolean;
    isHeaderFixed?: boolean;
}

@observer
export class Card extends React.Component<CardProps, {}> {
    static get defaultProps(): CardProps {
        return {
            innerRef: undefined,
            innerRefForHeader: undefined,
            className: undefined,
            classNameForHeader: undefined,
            title: '',
            subTitle: '',
            truncuateSubTitleToCharacters: undefined,
            hideSubTitleWhenExpanded: false,
            headerElements: [],
            isExpandable: true,
            isHeaderFixed: false,
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
                {(this.props.isExpandable || this.props.title || this.props.subTitle) && (
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
                        <div className={s.left}>
                            {(this.props.isExpandable && (
                                <button className={s.name}>
                                    <span>
                                        {this.isExpanded ? (
                                            <IconArrowTopBlue width={10} height={16} />
                                        ) : (
                                            <IconDropdownArrow width={12} height={8} />
                                        )}
                                    </span>

                                    {this.renderTitle()}
                                    {this.renderSubTitle()}
                                </button>
                            )) || (
                                <p className={s.name}>
                                    {this.renderTitle()}
                                    {this.renderSubTitle()}
                                </p>
                            )}
                        </div>

                        <div className={s.right}>{this.props.headerElements}</div>
                    </div>
                )}

                {this.renderContent()}
            </div>
        );
    }

    private renderTitle() {
        return this.props.title ? <strong>{this.props.title}</strong> : null;
    }

    private renderSubTitle() {
        return this.props.subTitle ? (
            <em
                className={classNames({
                    [s.invisible]: this.props.hideSubTitleWhenExpanded && this.isExpanded,
                })}
            >
                {this.props.truncuateSubTitleToCharacters
                    ? _truncate(this.props.subTitle, {
                          length: this.props.truncuateSubTitleToCharacters,
                      })
                    : this.props.subTitle}
            </em>
        ) : null;
    }

    private renderContent() {
        return this.props.isExpandable ? (
            <AnimateHeight className={s.content} height={this.isExpanded ? 'auto' : 0} duration={500}>
                {this.props.children}
            </AnimateHeight>
        ) : (
            <div className={s.content}>{this.props.children}</div>
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
}
