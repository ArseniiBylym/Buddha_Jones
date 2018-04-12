import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as usersActions from './../../actions/Users';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Checkmark } from './../Form';
import { Row, Col } from './../Section';
import { PersonPickerByType, PersonRoleDropdown } from '.';
import { LoadingIndicator } from './../Loaders';
import { DropdownContainer, OptionsList } from './../Form';
import { getUserDetails, getRoleDetails } from './PersonWithRoleSelectors';

// Styles
import s from './PersonWithRole.css';

// Props
const propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    userId: PropTypes.number.isRequired,
    roleId: PropTypes.number,
    selected: PropTypes.bool.isRequired,
    showCheckmark: PropTypes.bool,
    editing: PropTypes.bool,
    updating: PropTypes.bool,
};

// Defaults
const defaultProps = {
    className: null,
    onChange: null,
    roleId: null,
    showCheckmark: false,
    editing: false,
    updating: false,
};

// Derivations
const mapStateToProps = (state, ownProps) => {
    return {
        user: getUserDetails(state, ownProps),
        role: getRoleDetails(state, ownProps),
    };
};

// Actions
const mapDispatchToProps = (dispatch) => {
    return {
        actionsUsers: bindActionCreators(usersActions, dispatch),
    };
};

// Component
class PersonWithRole extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        };

        this.componentIsMounted = true;
    }

    componentDidMount() {
        this.fetchUser();
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    fetchUser() {
        this.setState({
            loading: true,
        });

        this.props.actionsUsers.fetchUserById(this.props.userId).then(() => {
            this.setState({
                loading: false,
            });
        }).catch((error) => {
            setTimeout(() => {
                if (this.componentIsMounted) {
                    this.fetchUser();
                }
            }, 2048);
        });
    }

    render() {
        const { user, role } = this.props;

        return (
            <div className={classNames(s.personWithRole, this.props.className)}>

                {(this.props.showCheckmark) && (
                    <div className={s.checkmarkContainer}>
                        <Checkmark checked={this.props.selected} type="green" readOnly={true} />
                    </div>
                )}

                <div className={s.userImage}>
                    <span
                        style={{
                            backgroundImage: user !== null && typeof user.image !== 'undefined' && user.image
                                ? `url(${user.image})`
                                : undefined
                        }}
                    />
                </div>

                <div className={s.userDetails}>
                    {(user !== null && typeof user.fullName !== 'undefined') && (
                        <React.Fragment>
                            <p className={s.name}>{user.fullName}</p>

                            {(!this.props.editing && !this.props.updating) && (
                                <p className={s.role}>
                                    {(role && typeof role.name !== 'undefined' && role.name) && (
                                        <strong>{role.name}</strong>
                                    ) || (
                                        <span>No role assigned</span>
                                    )}
                                </p>
                            ) || (this.props.updating) && (
                                <div className={s.role}>
                                    <LoadingIndicator label="Updating" spinnerSize={12} spinnerColor="#A59E97" />
                                </div>
                            ) || (this.props.editing) && (
                                <PersonRoleDropdown
                                    onChange={e => this.handlePersonsRoleChange(e)}
                                    removeVisible={true}
                                    removeLabel="Remove from the campaign"
                                    selectedRoleId={role && typeof role.id !== 'undefined' ? role.id : null}
                                />
                            )}

                            {(this.state.loading) && (
                                <LoadingIndicator className={s.updating} spinnerSize={12} spinnerColor="#A59E97" />
                            )}
                        </React.Fragment>
                    ) || (
                        <LoadingIndicator label="Loading" labelOnRight={true} />
                    )}
                </div>

            </div>
        );
    }

    handlePersonsRoleChange(e) {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }
}

PersonWithRole.propTypes = propTypes;
PersonWithRole.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(PersonWithRole);
