import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as projectBoardActions from './../../../actions/ProjectBoard';
import * as userRolesActions from './../../../actions/UserRoles';
import * as userTypesActions from './../../../actions/UserTypes';
import { UserTypesIds } from './../../../helpers/users';
import { Section, Row, Col } from './../../../components/Section';
import { Paragraph } from './../../../components/Content';
import { ButtonEdit } from '../../../components/Button';
import { LoadingBar, LoadingIndicator } from './../../../components/Loaders';
import { PersonWithRole, PersonPickerByType } from '../../../components/Buddha';
import { getUserRolesCount, getUserTypesCount, getUsersIds } from './ProjectPeopleSelectors';

// Styles
const s = require('./ProjectPeople.css');

// Props
const propTypes = {
    projectId: PropTypes.number.isRequired,
    campaignId: PropTypes.number.isRequired,
    users: PropTypes.arrayOf(
        PropTypes.shape({
            userId: PropTypes.number.isRequired,
            roleId: PropTypes.number,
        })
    ),
};

// Defaults
const defaultProps = {
    users: []
};

// Deriviations
const mapStateToProps = (state, ownProps) => {
    return {
        usersIds: getUsersIds(state, ownProps),
        userRolesCount: getUserRolesCount(state),
        userTypesCount: getUserTypesCount(state),
    };
};

// Actions
const mapDispatchToProps = (dispatch) => {
    return {
        actionsProjectBoard: bindActionCreators(projectBoardActions, dispatch),
        actionsUserRoles: bindActionCreators(userRolesActions, dispatch),
        actionsUserTypes: bindActionCreators(userTypesActions, dispatch),
    };
};

// Component
class ProjectPeople extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loadingRoles: false,
            updatingRoles: false,
            loadingTypes: false,
            updatingTypes: false,
            editing: false,
            updatingUsers: [],
        };

        this.componentIsMounted = true;
    }

    componentDidMount() {
        this.fetchUserRoles();
        this.fetchUserTypes();
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    fetchUserRoles() {
        this.setState({
            loadingRoles: this.props.userRolesCount === 0,
            updatingRoles: this.props.userRolesCount > 0,
        });

        this.props.actionsUserRoles.fetchUserRoles().then(() => {
            this.setState({
                loadingRoles: false,
                updatingRoles: false,
            });
        }).catch((error) => {
            setTimeout(() => {
                if (this.componentIsMounted) {
                    this.fetchUserRoles();
                }
            }, 2048);
        });
    }

    fetchUserTypes() {
        this.setState({
            loadingTypes: this.props.userTypesCount === 0,
            updatingTypes: this.props.userTypesCount > 0,
        });

        this.props.actionsUserTypes.fetchUserTypes().then(() => {
            this.setState({
                loadingTypes: false,
                updatingTypes: false,
            });
        }).catch((error) => {
            setTimeout(() => {
                if (this.componentIsMounted) {
                    this.fetchUserTypes();
                }
            }, 2048);
        });
    }

    render() {
        return (
            <Section
                title="Creative team"
                removeTitleGutter={false}
                removeTitleMargins={true}
                noSeparator={true}
                headerElements={[
                    ...(this.state.updatingRoles || this.state.updatingTypes ? [{
                        element: <LoadingIndicator label="Refreshing" />
                    }] : []),
                    ...(this.state.editing ? [{
                        element:
                            <PersonPickerByType
                                onChange={e => this.handleUserChange(e)}
                                label="Add people to the team"
                                selectedUsersIds={this.props.users.map((user) => user.userId)}
                                showUsersOfTypesIds={[
                                    UserTypesIds.Producer,
                                    UserTypesIds.ProductionCoordinator,
                                    UserTypesIds.ProductionAssistant,
                                    UserTypesIds.Manager,
                                    UserTypesIds.Owners,
                                    UserTypesIds.SeniorManagement,
                                    UserTypesIds.EditorialManager,
                                    UserTypesIds.AssitantEditor,
                                    UserTypesIds.CreativeManager,
                                    UserTypesIds.GraphicsDeptHeads,
                                    UserTypesIds.GraphicsCoordinator,
                                    UserTypesIds.MusicManager,
                                ]}
                            />
                    }] : []),
                    ...[{
                        element:
                            <ButtonEdit
                                onClick={e => this.handleEditingToggle()}
                                label={this.state.editing ? 'Cancel' : 'Edit team'}
                            />
                    }]
                ]}
            >
                <Row removeMargins={true} className={s.peopleList} doWrap={true}>
                    <Col>
                        {(this.props.users.length > 0) && this.props.users.map((user) => (
                            <PersonWithRole
                                key={'user-' + user.userId}
                                onChange={e => this.handleUserRoleChange(e, user.userId)}
                                className={s.person}
                                userId={user.userId}
                                roleId={typeof user.roleId !== 'undefined' && user.roleId ? user.roleId : null}
                                selected={true}
                                editing={this.state.editing}
                                updating={this.state.updatingUsers.indexOf(user.userId) !== -1}
                            />
                        )) || (this.state.loadingRoles || this.state.loadingTypes) && (
                            <LoadingBar />
                        ) || (
                            <Paragraph className={s.empty} type="dim">Team has no people assigned yet.</Paragraph>
                        )}
                    </Col>
                </Row>
            </Section>
        );
    }

    handleEditingToggle() {
        this.setState({
            editing: !this.state.editing
        });
    }

    handleUserChange(userOption) {
        console.log('userOption: ', userOption);
        if (typeof userOption !== 'undefined' && typeof userOption.value !== 'undefined') {
            const existingUserFound = this.props.usersIds.indexOf(userOption.value);
            console.log('existingUserFound: ', existingUserFound);

            this.setState({
                updatingUsers: [
                    ...this.state.updatingUsers,
                    ...[userOption.value]
                ]
            });

            this.props.actionsProjectBoard[existingUserFound !== -1
                ? 'removeUserFromProjectCampaign'
                : 'addOrChangeRoleOfUserInProjectCampaign'
            ](
                this.props.projectId,
                this.props.campaignId,
                userOption.value
            ).then(() => {
                this.stopUpdatingUsers(userOption.value);
            }).catch((error) => {
                this.stopUpdatingUsers(userOption.value);
            });
        }
    }

    handleUserRoleChange(roleOption, userId) {
        if (roleOption.value === 'remove' || !isNaN(roleOption.value)) {
            this.setState({
                updatingUsers: [
                    ...this.state.updatingUsers,
                    ...[userId]
                ]
            });

            this.props.actionsProjectBoard[roleOption.value === 'remove'
                ? 'removeUserFromProjectCampaign'
                : 'addOrChangeRoleOfUserInProjectCampaign'
            ](
                this.props.projectId,
                this.props.campaignId,
                userId,
                roleOption.value
            ).then(() => {
                this.stopUpdatingUsers(userId);
            }).catch((error) => {
                this.stopUpdatingUsers(userId);
            });
        }
    }

    stopUpdatingUsers(userId) {
        const userIndex = this.state.updatingUsers.findIndex((id) => id === userId);

        if (userIndex !== -1) {
            this.setState({
                updatingUsers: [
                    ...this.state.updatingUsers.slice(0, userIndex),
                    ...this.state.updatingUsers.slice(userIndex + 1)
                ]
            });
        }
    }
}

ProjectPeople.propTypes = propTypes;
ProjectPeople.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPeople);
