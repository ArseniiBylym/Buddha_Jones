import * as classNames from 'classnames';
import { IconArrowTopBlue, IconDropdownArrow } from 'components/Icons';
import _truncate from 'lodash-es/truncate';
import { action, computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';

const s = require('./ButtonExpand.css');

export interface ButtonExpandTitles {
    title?: string;
    titleWhenExpanded?: string;
    subTitle?: string;
    subTitleWhenExpanded?: string;
    truncuateSubTitleToCharacters?: number;
    hideSubTitleWhenExpanded?: boolean;
}

interface ButtonExpandProps extends ButtonExpandTitles {
    onToggle?: (isExpanded: boolean) => void;
    isExpanded?: boolean;
    className?: string;
}

@observer
export class ButtonExpand extends React.Component<ButtonExpandProps, {}> {
    static get defaultProps(): ButtonExpandProps {
        return {
            onToggle: undefined,
            isExpanded: undefined,
            className: undefined,
            title: '',
            titleWhenExpanded: '',
            subTitle: '',
            subTitleWhenExpanded: '',
            truncuateSubTitleToCharacters: undefined,
            hideSubTitleWhenExpanded: false,
        };
    }

    @computed
    private get isExpandable(): boolean {
        return typeof this.props.onToggle !== 'undefined';
    }

    @observable private isExpanded: boolean =
        typeof this.props.isExpanded === 'boolean' ? this.props.isExpanded : this.isExpandable ? false : true;

    public componentWillReceiveProps(nextProps: ButtonExpandProps) {
        if (
            typeof nextProps.isExpanded === 'boolean' &&
            this.props.isExpanded !== nextProps.isExpanded &&
            nextProps.isExpanded !== this.isExpanded
        ) {
            this.isExpanded = nextProps.isExpanded || false;
        }
    }

    public render() {
        return (
            (this.isExpandable && (
                <button
                    onClick={this.handleTogglingExpansion}
                    className={classNames(s.name, s.nameButton, this.props.className)}
                >
                    <span className={classNames({ [s.expanded]: this.isExpanded })}>
                        <IconArrowTopBlue className={s.arrowCollapse} width={10} height={16} />
                        <IconDropdownArrow className={s.arrowExpand} width={12} height={8} />
                    </span>

                    {this.renderTitle()}
                    {this.renderSubTitle()}
                </button>
            )) || (
                <p className={classNames(s.name, this.props.className)}>
                    {this.renderTitle()}
                    {this.renderSubTitle()}
                </p>
            )
        );
    }

    private renderTitle() {
        const text =
            this.isExpanded && this.isExpandable && this.props.titleWhenExpanded
                ? this.props.titleWhenExpanded
                : this.props.title;

        return text ? <strong>{text}</strong> : null;
    }

    private renderSubTitle() {
        const text =
            this.isExpanded && this.isExpandable && this.props.subTitleWhenExpanded
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

    @action
    private handleTogglingExpansion = (e: React.MouseEvent<HTMLButtonElement>) => {
        const next = !this.isExpanded;

        this.isExpanded = next;

        if (this.props.onToggle) {
            this.props.onToggle(next);
        }
    };
}
