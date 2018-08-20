import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import * as usersActions from "./../../actions/Users";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Checkmark } from "./../Form";
import { Row, Col } from "./../Section";
import { PersonPickerByType, PersonRoleDropdown } from ".";
import { LoadingIndicator } from "./../Loaders";
import { DropdownContainer, OptionsList } from "./../Form";
import { getUserDetails, getRoleDetails } from "./PersonWithRoleSelectors";

// Styles
import s from "./PersonWithRole.css";

// Props
const propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    userId: PropTypes.number.isRequired,
    roleId: PropTypes.number,
    hideRole: PropTypes.bool,
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
    hideRole: false,
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
const mapDispatchToProps = dispatch => {
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

        this.personActionsDropdown = null;
        this.referencePersonActionsDropdown = (ref) => this.personActionsDropdown = ref;

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

        this.props.actionsUsers
            .fetchUserById(this.props.userId)
            .then(() => {
                this.setState({
                    loading: false,
                });
            })
            .catch(error => {
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
                {this.props.showCheckmark && (
                    <div className={s.checkmarkContainer}>
                        <Checkmark checked={this.props.selected} type="green" readOnly={true} />
                    </div>
                )}

                <div className={s.userImage}>
                    <span
                        style={{
                            backgroundImage:
                                user !== null && typeof user.image !== "undefined" && user.image
                                    ? `url(${user.image})`
                                    : undefined,
                        }}
                    />
                </div>

                <div className={s.userDetails}>
                    {(user !== null &&
                        typeof user.fullName !== "undefined" && (
                            <React.Fragment>
                                <p className={s.name}>{user.fullName}</p>

                                {(!this.props.editing &&
                                    !this.props.updating &&
                                    this.props.hideRole === false && (
                                        <p className={s.role}>
                                            {(role &&
                                                typeof role.name !== "undefined" &&
                                                role.name && <strong>{role.name}</strong>) || <span>No role assigned</span>}
                                        </p>
                                    )) ||
                                    (this.props.updating && (
                                        <div className={s.role}>
                                            <LoadingIndicator label="Updating" spinnerSize={12} spinnerColor="#A59E97" />
                                        </div>
                                    )) ||
                                    (this.props.editing &&
                                        this.props.hideRole === false && (
                                            <PersonRoleDropdown
                                                onChange={e => this.handlePersonsRoleChange(e, false)}
                                                removeVisible={true}
                                                removeLabel="Remove from the campaign"
                                                selectedRoleId={role && typeof role.id !== "undefined" ? role.id : null}
                                            />
                                ) || (this.props.editing && this.props.hideRole === true && (
                                    <DropdownContainer
                                        ref={this.referencePersonActionsDropdown}
                                        className={s.dropdownContainer}
                                        label="Remove"
                                        value=""
                                    >
                                        <OptionsList
                                            label="Action"
                                            onChange={e => this.handlePersonsRoleChange(e, true)}
                                            options={[
                                                { key: 'cancel', value: null, label: 'Cancel' },
                                                { key: 'remove', value: 'remove', label: 'Remove from the campaign' },
                                            ]}
                                        />
                                    </DropdownContainer>
                                )
                                        ))}

                                {this.state.loading && (
                                    <LoadingIndicator className={s.updating} spinnerSize={12} spinnerColor="#A59E97" />
                                )}
                            </React.Fragment>
                        )) || <LoadingIndicator label="Loading" labelOnRight={true} />}
                </div>
            </div>
        );
    }

    handlePersonsRoleChange(e) {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }

    handleBillingPersonChange(e) {
        if (this.props.onChange) {
            this.props.onChange(e);
        }

        if (this.personActionsDropdown && typeof this.personActionsDropdown.closeDropdown !== 'undefined') {
            this.personActionsDropdown.closeDropdown();
        }
    }
}

PersonWithRole.propTypes = propTypes;
PersonWithRole.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(PersonWithRole);
