import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userRolesActions from './../../actions/UserRoles';
import { getAllRolesAsOptionsList, getUserRoleDetails } from './PersonRoleDropdownSelectors';
import { DropdownContainer, OptionsList } from './../Form';

// Styles
import s from './PersonRoleDropdown.css';

// Props
const propTypes = {
    onChange: PropTypes.func,
    selectedRoleId: PropTypes.number,
    removeVisible: PropTypes.bool,
    removeLabel: PropTypes.string,
};

// Defaults
const defaultProps = {
    onChange: null,
    selectedRoleId: null,
    removeVisible: true,
    removeLabel: 'Remove',
};

// Deriviations
const mapStateToProps = (state, ownProps) => {
    return {
        roles: getAllRolesAsOptionsList(state, ownProps),
        role: getUserRoleDetails(state, ownProps),
    };
};

// Actions
const mapDispatchToProps = (dispatch) => {
    return {
        actionsUserRoles: bindActionCreators(userRolesActions, dispatch),
    };
};

// Component
class PersonRoleDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        };

        this.dropdownContainer = null;
        this.referenceDropdownContainer = (ref) => this.dropdownContainer = ref;

        this.componentIsMounted = true;
    }

    componentDidMount() {
        this.fetchRoles();
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    fetchRoles() {
        this.setState({
            loading: true,
        });

        this.props.actionsUserRoles.fetchUserRoles().then(() => {
            this.setState({
                loading: false,
            });
        }).catch((error) => {
            setTimeout(() => {
                if (this.componentIsMounted) {
                    this.fetchRoles();
                }
            }, 2048);
        });
    }

    render() {
        return (
            <DropdownContainer
                ref={this.referenceDropdownContainer}
                className={s.dropdownContainer}
                label="Role:"
                value={this.props.role ? this.props.role.name : undefined}
            >
                <OptionsList
                    onChange={e => this.handleRoleChange(e)}
                    label="Select role"
                    value={this.props.selectedRoleId}
                    options={[
                        ...(this.props.selectedRoleId === null ? [
                            { key: 'no-role', value: null, label: 'No role assigned' }
                        ] : []),
                        ...this.props.roles,
                        ...(this.props.removeVisible ? [
                            { key: 'separator', value: 'separator', label: '------' },
                            { key: 'remove', value: 'remove', label: this.props.removeLabel },
                        ] : [])
                    ]}
                    loadingOptions={this.state.loading}
                />
            </DropdownContainer>
        );
    }

    handleRoleChange(e) {
        if (this.props.onChange) {
            this.props.onChange(e);
        }

        if (this.dropdownContainer && typeof this.dropdownContainer.closeDropdown === 'function') {
            this.dropdownContainer.closeDropdown();
        }
    }
}

PersonRoleDropdown.propTypes = propTypes;
PersonRoleDropdown.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(PersonRoleDropdown);
