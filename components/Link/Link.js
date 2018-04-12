import React from 'react';
import PropTypes from 'prop-types';
import history from '../../core/history';

class Link extends React.Component {
    constructor(props, state) {
        super(props, state);

        this.handleClick = this.handleClick.bind(this);
    }

    static get propTypes() {
        return {
            to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
            onClick: PropTypes.func,
        };
    };

    handleClick(e) {
        if (this.props.onClick) {
            this.props.onClick(e);
        }

        if (e.button !== 0 /* left click */) {
            return;
        }

        if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) {
            return;
        }

        if (e.defaultPrevented === true) {
            return;
        }

        e.preventDefault();

        if (this.props.to) {
            history.push(this.props.to);
        } else {
            history.push({
                pathname: e.currentTarget.pathname,
                search: e.currentTarget.search,
            });
        }
    };

    render() {
        const { to, ...props } = this.props; // eslint-disable-line no-use-before-define
        return <a href={history.createHref(to)} {...props} onClick={this.handleClick} />;
    }
}

export default Link;
