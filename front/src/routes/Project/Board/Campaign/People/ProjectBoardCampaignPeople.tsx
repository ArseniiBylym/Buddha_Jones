import * as React from 'react';
import * as classNames from 'classnames';
import truncuate from 'lodash-es/truncate';
import { observer, inject } from 'mobx-react';
import { Section, Row, Col } from 'components/Section';
import { UserTypeClassId } from 'types/user';
import { AppOnlyStoreState } from 'store/AllStores';
import { LoadingIndicator, LoadingBar } from 'components/Loaders';
import { observable, computed } from 'mobx';
import { ButtonEdit } from 'components/Button';
import { Paragraph } from 'components/Content';
import { PersonWithRole, PersonPickerByType } from 'components/Buddha';
import { OptionsListValuePropType, DropdownContainer, OptionsList } from 'components/Form';
import { ProjectsDetailsActions } from 'actions';

// Styles
const s = require('./ProjectBoardCampaignPeople.css');

// Types
export type ProjectBoardCampaignPeopleType = 'creative' | 'billing' | 'editorial' | 'design';
interface ProjectBoardCampaignCopyablePeople {
    projectCampaignId: number;
    campaignName: string;
    campaignDescription: string;
    users: ProjectBoardCampaignCopyableUser[];
}
interface ProjectBoardCampaignCopyableUser {
    id: number;
    name: string;
}

// Props
interface ProjectBoardCampaignPeopleProps {
    userCanView: boolean;
    userCanEdit: boolean;
    type: ProjectBoardCampaignPeopleType;
    projectId: number;
    projectCampaignId: number;
    campaignId: number;
    selectedUsers?: Array<{
        userId: number;
        fullName: string | null;
        image: string | null;
        creativeRole?: {
            role: string | null;
            roleId: number | null;
        };
        billingRole?: string | null;
    }>;
}

// Component
@inject('store')
@observer
export class ProjectBoardCampaignPeople extends React.Component<
    ProjectBoardCampaignPeopleProps & AppOnlyStoreState,
    {}
> {
    static get defaultProps(): ProjectBoardCampaignPeopleProps {
        return {
            userCanEdit: false,
            userCanView: false,
            type: 'creative',
            projectId: 0,
            projectCampaignId: 0,
            campaignId: 0,
            selectedUsers: [],
        };
    }

    @observable private isEditing: boolean = false;
    @observable private copyingStatus: 'none' | 'saving' | 'success' | 'error' = 'none';

    @computed
    private get copyableUsersFromOtherCampaigns(): ProjectBoardCampaignCopyablePeople[] {
        if (!this.props.store) {
            return [];
        }

        const { projectsDetails } = this.props.store;

        const projectFoundIndex = projectsDetails.fetchedProjectsIdsFlat.findIndex(id => id === this.props.projectId);
        if (typeof projectFoundIndex === 'undefined') {
            return [];
        }

        const project = projectsDetails.fetchedProjects[projectFoundIndex];
        const otherCampaigns = project.campaigns.filter(c => c.projectCampaignId !== this.props.projectCampaignId);
        if (otherCampaigns.length <= 0) {
            return [];
        }

        return otherCampaigns.reduce((copyable: ProjectBoardCampaignCopyablePeople[], campaign) => {
            const campaignUsersOfCurrentType =
                this.props.type === 'creative'
                    ? campaign.creativeTeam
                    : this.props.type === 'billing'
                        ? campaign.billingTeam
                        : this.props.type === 'design'
                            ? campaign.designTeam
                            : this.props.type === 'editorial'
                                ? campaign.editorialTeam
                                : [];

            if (campaignUsersOfCurrentType.length > 0) {
                copyable.push({
                    projectCampaignId: campaign.projectCampaignId,
                    campaignName: campaign.name || '',
                    campaignDescription: campaign.notes || '',
                    users: campaignUsersOfCurrentType.map(u => ({
                        id: u.userId,
                        name: u.fullName || u.username,
                    })),
                });
            }

            return copyable;
        }, []);
    }

    public render() {
        if (!this.props.store || !this.props.selectedUsers) {
            return null;
        }

        const { users } = this.props.store;

        return this.props.userCanView ? (
            <Section
                className={classNames(s.section, {
                    [s.editing]: this.isEditing,
                })}
                title={
                    this.props.type === 'creative'
                        ? 'Creative team'
                        : this.props.type === 'billing'
                            ? 'Billing approval'
                            : this.props.type === 'editorial'
                                ? 'Editorial team'
                                : this.props.type === 'design'
                                    ? 'Graphics team'
                                    : ''
                }
                removeTitleGutter={false}
                removeTitleMargins={true}
                noSeparator={true}
                headerElements={[
                    ...(users.updatingUsersProjectRoles || users.updatingUserTypes
                        ? [
                              {
                                  element: <LoadingIndicator label="Refreshing" />,
                              },
                          ]
                        : []),
                    ...(this.isEditing
                        ? [
                              ...(this.copyingStatus !== 'none' && this.copyingStatus !== 'success'
                                  ? [
                                        {
                                            element:
                                                this.copyingStatus === 'saving' ? (
                                                    <LoadingIndicator label="Copying" />
                                                ) : (
                                                    <Paragraph type="alert">Could not copy, try again</Paragraph>
                                                ),
                                        },
                                    ]
                                  : []),
                              ...(this.props.userCanEdit &&
                              this.copyableUsersFromOtherCampaigns.length > 0 &&
                              this.props.selectedUsers.length <= 0 &&
                              this.copyingStatus === 'none'
                                  ? [
                                        {
                                            element: (
                                                <DropdownContainer label="Copy people from other campaign">
                                                    <OptionsList
                                                        onChange={this.handleUsersCopy}
                                                        options={this.copyableUsersFromOtherCampaigns.map(copyable => ({
                                                            value: copyable.users,
                                                            label:
                                                                copyable.campaignName +
                                                                (copyable.campaignDescription
                                                                    ? ' - ' +
                                                                      truncuate(copyable.campaignDescription, {
                                                                          length: 64,
                                                                      })
                                                                    : ''),
                                                        }))}
                                                    />
                                                </DropdownContainer>
                                            ),
                                        },
                                    ]
                                  : []),
                              {
                                  element: (
                                      <PersonPickerByType
                                          onChange={this.handlePersonAdd}
                                          label="Add people to the team"
                                          selectedUsersIds={
                                              this.props.selectedUsers
                                                  ? this.props.selectedUsers.map(user => user.userId)
                                                  : []
                                          }
                                          showUsersByTypeOrClassId="class"
                                          showUsersOfClassIds={
                                              this.props.type === 'creative'
                                                  ? [UserTypeClassId.CreativeTeam]
                                                  : this.props.type === 'billing'
                                                      ? [UserTypeClassId.BillingTeam]
                                                      : this.props.type === 'editorial'
                                                          ? [UserTypeClassId.EditorialTeam]
                                                          : this.props.type === 'design'
                                                              ? [UserTypeClassId.GraphicsTeam]
                                                              : []
                                          }
                                      />
                                  ),
                              },
                          ]
                        : []),
                    ...(this.props.userCanEdit
                        ? [
                              {
                                  element: (
                                      <ButtonEdit
                                          onClick={this.handleEditingToggle}
                                          label={this.isEditing ? 'Stop editing' : 'Edit team'}
                                      />
                                  ),
                              },
                          ]
                        : []),
                ]}
            >
                <Row removeMargins={true} className={s.peopleList} doWrap={true}>
                    <Col className={s.peopleContainer} size={0}>
                        {(this.props.selectedUsers.length > 0 &&
                            this.props.selectedUsers.map(user => (
                                <PersonWithRole
                                    key={'user-' + user.userId}
                                    onChange={this.handleUserRoleChange(user.userId)}
                                    className={s.person}
                                    userId={user.userId}
                                    userFullName={user.fullName}
                                    userImage={user.image}
                                    roleId={
                                        typeof user.creativeRole !== 'undefined' && user.creativeRole
                                            ? user.creativeRole.roleId
                                            : null
                                    }
                                    roleName={
                                        this.props.type === 'design'
                                            ? 'Designer'
                                            : typeof user.creativeRole !== 'undefined' && user.creativeRole
                                                ? user.creativeRole.role
                                                : null
                                    }
                                    hideRole={this.props.type !== 'creative'}
                                    selected={true}
                                    editing={this.isEditing}
                                    updating={users.updatingUserTypes}
                                />
                            ))) ||
                            ((users.loadingUsersProjectRoles || users.loadingUserTypes) && (
                                <div className={s.loadingBarContainer}>
                                    <LoadingBar />
                                </div>
                            )) || (
                                <Paragraph className={s.empty} type="dim">
                                    Team has no people assigned.
                                </Paragraph>
                            )}
                    </Col>
                </Row>
            </Section>
        ) : null;
    }

    private handleEditingToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.isEditing = !this.isEditing;
    };

    private handleUsersCopy = async (option: { value: OptionsListValuePropType; label: string }) => {
        const addedUsersById: number[] = [];
        try {
            this.copyingStatus = 'saving';

            // Iterate users
            const users = option.value as ProjectBoardCampaignCopyableUser[];
            for (const user of users) {
                await ProjectsDetailsActions.addUserToProjectCampaign(
                    this.props.projectId,
                    this.props.projectCampaignId,
                    user.id,
                    user.name,
                    this.props.type
                );
                addedUsersById.push(user.id);
            }

            this.copyingStatus = 'success';
        } catch (error) {
            this.copyingStatus = 'error';

            // Revert any changes
            for (const userId of addedUsersById) {
                await ProjectsDetailsActions.removeUserFromProjectCampaign(
                    this.props.projectId,
                    this.props.projectCampaignId,
                    userId,
                    this.props.type
                );
            }

            throw error;
        }
    };

    private handlePersonAdd = async (option: { value: OptionsListValuePropType; label: string }) => {
        try {
            if (typeof option.value === 'number' && option.value > 0) {
                await ProjectsDetailsActions.addUserToProjectCampaign(
                    this.props.projectId,
                    this.props.projectCampaignId,
                    option.value,
                    option.label,
                    this.props.type
                );
            }
        } catch (error) {
            throw error;
        }
    };

    private handleUserRoleChange = (userId: number) => async (role: {
        value: number | string | 'remove';
        label: string;
    }) => {
        try {
            if (role.value === 'remove') {
                await ProjectsDetailsActions.removeUserFromProjectCampaign(
                    this.props.projectId,
                    this.props.projectCampaignId,
                    userId,
                    this.props.type
                );
            } else if (typeof role.value === 'number') {
                await ProjectsDetailsActions.changeRoleOfCreativeTeamUserInProjectCampaign(
                    this.props.projectId,
                    this.props.projectCampaignId,
                    userId,
                    {
                        id: role.value,
                        name: role.label,
                    }
                );
            }
        } catch (error) {
            throw error;
        }
    };
}
