import { history } from 'App';
import * as classNames from 'classnames';
import { IconArrowRight } from 'components/Icons';
import * as React from 'react';

const s = require('./LinkButton.css');

interface LinkButtonProps {
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    className?: string;
    hideArrow?: boolean;
    noPadding?: boolean;
    goToUrlOnClick?: string;
    label: string;
}

export class LinkButton extends React.Component<LinkButtonProps, {}> {
    static get defaultProps(): LinkButtonProps {
        return {
            onClick: undefined,
            hideArrow: false,
            noPadding: false,
            goToUrlOnClick: '/',
            label: 'Link',
        };
    }

    public render() {
        return (
            <a
                className={classNames(s.link, { [s.noPadding]: this.props.noPadding }, this.props.className)}
                onClick={this.handleClick}
                href={this.props.goToUrlOnClick}
            >
                {this.props.label}

                {!this.props.hideArrow && <IconArrowRight width={15} height={11} marginTop={-5} marginLeft={-7} />}
            </a>
        );
    }

    private handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        if (this.props.onClick) {
            this.props.onClick(e);
        } else if (this.props.goToUrlOnClick) {
            history.push(this.props.goToUrlOnClick);
        }
    };
}
