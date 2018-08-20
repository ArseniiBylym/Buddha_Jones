import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import * as usersActions from './../../actions/Users';
import * as userTypesActions from './../../actions/UserTypes';
import { DropdownContainer, NestedOptionsList } from './../Form';
import { getAllUsersByType } from './PersonPickerByTypeSelectors';

// Styles
import { IconCheckmarkGreen } from './../Icons';

// Props
const propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    selectedUsersIds: PropTypes.arrayOf(PropTypes.number),
    showUsersOfTypesIds: PropTypes.arrayOf(PropTypes.number),
    label: PropTypes.string,
    maxWidth: PropTypes.number,
    align: PropTypes.oneOf(['left', 'center', 'right']),
};

// Defaults
const defaultProps = {
    className: null,
    onChange: null,
    selectedUsersIds: [],
    showUsersOfTypesIds: [],
    label: 'People',
    maxWidth: 360,
    align: 'right',
};

// Deriviations
const mapStateToProps = (state, ownProps) => {
    return {
        usersByType: getAllUsersByType(state, ownProps),
    };
};

// Actions
const mapDispatchToProps = (dispatch) => {
    return {
        actionsUsers: bindActionCreators(usersActions, dispatch),
        actionsUserTypes: bindActionCreators(userTypesActions, dispatch),
    };
};

// Component
class PersonPickerByType extends React.Component {
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
        this.fetchUsersByType(this.props.showUsersOfTypesIds);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.loading !== this.state.loading && this.state.loading === false) {
            if (this.dropdownContainer && typeof this.dropdownContainer.positionAndResizeDropdown === 'function') {
                if (this.dropdownContainer.getStateOpen && this.componentIsMounted) {
                    this.dropdownContainer.positionAndResizeDropdown();
                }
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        const typeIdsHaveChanged = nextProps.showUsersOfTypesIds.some((userId) => {
            if (this.props.showUsersOfTypesIds.indexOf(userId) === -1) {
                return true;
            }
        });

        if (typeIdsHaveChanged || this.props.showUsersOfTypesIds.length !== nextProps.showUsersOfTypesIds.length) {
            this.fetchUsersByType(nextProps.showUsersOfTypesIds);
        }
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    fetchUsersByType(typesIds) {
        if (typesIds && typesIds.length > 0) {
            this.setState({
                loading: true,
            });

            const fetches = typesIds.map((typeId) => this.props.actionsUsers.fetchUsersByType(typeId));

            Promise.all(fetches).then(() => {
                this.setState({
                    loading: false,
                });
            }).catch((error) => {
                setTimeout(() => {
                    if (this.componentIsMounted) {
                        this.fetchUsersByType(typesIds);
                    }
                }, 1024);
            });
        }
    }

    render() {
        return (
            <DropdownContainer
                className={classNames(this.props.className)}
                ref={this.referenceDropdownContainer}
                align={this.props.align}
                minWidth={320}
                maxWidth={this.props.maxWidth || undefined}
                label={this.props.label}
            >
                <NestedOptionsList
                    onChange={e => this.handleUserChange(e)}
                    search={true}
                    searchLabel="Search people"
                    searchAutoFocus={true}
                    value={this.props.selectedUsersIds.length > 0 ? this.props.selectedUsersIds : null}
                    noOptionsLabel="No people found"
                    loading={this.state.loading}
                    groups={this.props.usersByType}
                    selectedIcon={<IconCheckmarkGreen width={15} height={15} />}
                />
            </DropdownContainer>
        );
    }

    handleUserChange(e) {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }
}

PersonPickerByType.propTypes = propTypes;
PersonPickerByType.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(PersonPickerByType);
