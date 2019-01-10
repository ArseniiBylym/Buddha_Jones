import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { SpotSentSpot } from 'types/spotSent';
import { Card, Section } from 'components/Section';
import { Checkmark, DropdownContainer, OptionsList, OptionsListValuePropType } from 'components/Form';
import { ButtonClose } from 'components/Button';
import { ProjectPicker, ProjectPickerGroupValues, ProjectPickerValues, PersonWithRole } from 'components/Buddha';
import { Paragraph } from 'components/Content';
import { AppOnlyStoreState } from 'store/AllStores';
import { ProjectCampaignUserFromApi } from 'types/projectDetails';
import { LoadingIndicator } from 'components/Loaders';
import { SpotSentStore } from '../../../../store/AllStores';
import { SpotSentOptionsChildrenFromApi } from '../../../../types/spotSent';
import { ProjectPermissions } from '../../../../store';
import { UserPermissionKey } from '../../../../types/projectPermissions';
import { SpotSentActions } from '../../../../actions';
import { ProjectPickerSections } from '../../../../components/Buddha';

// Styles
const s = require('./ProducerSpotSentForm.css');

// Props
interface ProducerSpotSentFormSpotCardProps {
    onSpotRemove: (spotIndex: number) => void;
    project: ProjectPickerGroupValues | null;
    clientId: number | null;
    spot: SpotSentSpot;
    spotIndex: number;
    forUserId: number;
}

// Types
type ProducerSpotSentFormSpotCardPropsTypes = ProducerSpotSentFormSpotCardProps & AppOnlyStoreState;

// Component
@inject('store')
@observer
export class ProducerSpotSentFormSpotCard extends React.Component<ProducerSpotSentFormSpotCardPropsTypes, {}> {

    private get campaignEditorialUsers(): { isLoading: boolean; users: ProjectCampaignUserFromApi[] } {
        if (!this.props.store) {
            return {
                isLoading: false,
                users: [],
            };
        }

        if (this.props.spot.projectCampaign === null) {
            return {
                isLoading: false,
                users: [],
            };
        }

        const projectCampaign = this.props.store.campaignPeople.projectCampaignPeople.find(
            pc => pc.projectCampaignId === this.props.spot.projectCampaign!.id
        );
        if (typeof projectCampaign === 'undefined') {
            return {
                isLoading: true,
                users: [],
            };
        }

        return {
            isLoading: projectCampaign.editorialTeam.isLoading,
            users: projectCampaign.editorialTeam.users,
        };
    }

    private get selectedEditors(): ProjectCampaignUserFromApi[] {
        return this.props.spot.selectedEditorsIds.reduce((editors: ProjectCampaignUserFromApi[], editorId) => {
            const editorDetails = this.campaignEditorialUsers.users.find(u => u.userId === editorId);
            if (editorDetails) {
                editors.push(editorDetails);
            }

            return editors;
        }, []);
    }

    private get projectPermissions(): ProjectPermissions | null {
        if (this.props.store) {
            return this.props.store.projectPermissions;
        }
        return null;
    }

    private editorDropdown: DropdownContainer | null = null;

    public render() {
        return (
            <Card
                title={'#' + (this.props.spotIndex + 1)}
                subTitle="Spot sent"
                isExpandable={false}
                headerElements={this.getCardHeaders()}
            >
                <ProjectPicker
                    onChange={this.handleSpotChange}
                    forUserId={this.props.forUserId}
                    noSeparator={true}
                    show="campaign-spot-version"
                    requiredSelection="campaign-spot-version"
                    value={{
                        project: this.props.project,
                        projectCampaign: this.props.spot.projectCampaign,
                        spot: this.props.spot.spot,
                        version: this.props.spot.version,
                        customerId: this.props.clientId,
                    }}
                />

                <Section title={'Sent via'}>
                    <div className={s.sentViaMethodsContainer}>
                        {this.getSentViaMethods()}
                    </div>
                </Section>

                <Section
                    title={`Spot #${this.props.spotIndex + 1} editors`}
                    headerElements={this.getSectionHeaders()}
                >
                    {this.props.spot.projectCampaign === null && (
                        <Paragraph type="dim">Campaign selection is needed to pick editors.</Paragraph>
                    )}

                    {this.props.spot.projectCampaign !== null &&
                        this.campaignEditorialUsers.isLoading && <LoadingIndicator label="Loading editors" />}

                    {this.props.spot.projectCampaign !== null &&
                        !this.campaignEditorialUsers.isLoading &&
                        this.campaignEditorialUsers.users.length <= 0 && (
                            <Paragraph type="dim">Campaign has no editors assigned.</Paragraph>
                        )}

                    {this.props.spot.projectCampaign !== null &&
                        !this.campaignEditorialUsers.isLoading &&
                        this.campaignEditorialUsers.users.length > 0 &&
                        this.selectedEditors.length <= 0 && <Paragraph type="dim">Add editors</Paragraph>}

                    {this.selectedEditors.map((selectedEditor: ProjectCampaignUserFromApi, ind: number) => (
                        <div className={s.editorBlock} key={`spot-sent-editor-${selectedEditor.userId}`}>
                            <PersonWithRole
                                className={s.spotEditor}
                                userId={selectedEditor.userId}
                                userFullName={selectedEditor.fullName}
                                userImage={selectedEditor.image}
                                roleId={null}
                                roleName={null}
                                hideRole={true}
                                selected={true}
                                editing={false}
                            />
                            <span
                                onClick={this.onRemoveEditorHandler.bind(this, ind)}
                                className={s.editorRemoveButton}
                            >
                                &#x2716;
                            </span>
                        </div>
                    ))}

                </Section>
                {
                    this.projectPermissions && this.projectPermissions.loggedInUserPermissions[UserPermissionKey.SpotSentFinishProdAccept] &&
                    this.projectPermissions && this.projectPermissions.loggedInUserPermissions[UserPermissionKey.SpotSentFinishProdAccept].canEdit &&
                    this.props.spot.line_status_id && this.props.spot.line_status_id === 2 &&
                    <Section>
                        <div className={s.acceptButtonsContainer}>
                            {
                                this.props.spot.isFinishingRequest &&
                                this.props.spot.version &&
                                this.props.spot.version.finishAccept !== undefined &&
                                <Checkmark
                                    key={'finish-accept'}
                                    onClick={this.handleFinishAccept}
                                    checked={this.props.spot.version.finishAccept}
                                    label={'Finish Accept'}
                                    type={'no-icon'}
                                    labelOnLeft={true}
                                />
                            }
                            {
                                this.props.spot.version &&
                                this.props.spot.version.prodAccept !== undefined &&
                                <Checkmark
                                    key={'prod-accept'}
                                    onClick={this.handleProdAccept}
                                    checked={this.props.spot.version.prodAccept}
                                    label={'Production Accept'}
                                    type={'no-icon'}
                                    labelOnLeft={true}
                                />
                            }
                        </div>
                    </Section>
                }
            </Card>
        );
    }

    private getSectionHeaders = () => {
        if (this.campaignEditorialUsers.users.length > 0) {
            if (this.campaignEditorialUsers.users.length > this.selectedEditors.length) {
                return ([
                    {
                        key: 'editors-picker',
                        element: (
                            <DropdownContainer
                                ref={this.referenceEditorDropdown}
                                label="Select editors"
                            >
                                <OptionsList
                                    onChange={this.handleAddingUser}
                                    options={this.campaignEditorialUsers.users
                                        .filter(
                                            user =>
                                                this.props.spot.selectedEditorsIds.indexOf(
                                                    user.userId
                                                ) === -1
                                        )
                                        .map(user => ({
                                            value: user.userId,
                                            label: user.fullName || user.username,
                                        }))}
                                />
                            </DropdownContainer>
                        ),
                    },
                ]);
            } else {
                return ([
                    {
                        key: 'editors-nope',
                        element: (
                            <Paragraph type="dim">All editors from campaign are selected</Paragraph>
                        ),
                    },
                ]);
            }
        } else {
            return [];
        }
    }

    private getCardHeaders = () => [
        <Checkmark
            key="finishing-request-checkmark"
            onClick={this.handleFinishingRequestToggle}
            checked={this.props.spot.isFinishingRequest}
            label="Finish Request"
            labelOnLeft={true}
            readOnly={(!this.props.spot.spot)}
            type={'no-icon'}
        />,
        <Checkmark
            key="spot-resend-checkmark"
            onClick={this.handleSpotResendToggle}
            checked={this.props.spot.isResend}
            label="Spot resend"
            labelOnLeft={true}
            readOnly={(!this.props.spot.spot)}
            type={'no-icon'}
        />,
        <ButtonClose key="remove-spot" onClick={this.handleSpotRemove} label="Remove spot" />,
    ]

    private onRemoveEditorHandler = (ind: number): void => this.handleSpotRemovingEditor(ind);

    private handleSpotRemove = () => this.props.onSpotRemove(this.props.spotIndex);

    private handleSpotResendToggle = (checked: boolean) =>
        SpotSentActions.handleSpotResendToggle(this.props.spotIndex, checked);

    private handleSpotChange = (values: ProjectPickerValues | null, type?: ProjectPickerSections) =>
        SpotSentActions.handleSpotChange(this.props.spotIndex, values, type);

    private handleFinishingRequestToggle = (checked: boolean) =>
        SpotSentActions.handleFinishingRequestToggle(this.props.spotIndex, checked);

    private handleSentViaMethodsChange = (method: number) =>
        SpotSentActions.handleSentViaMethodsChange(this.props.spotIndex, method);

    private handleSpotAddingEditor = (userId: number) =>
        SpotSentActions.handleSpotAddingEditor(this.props.spotIndex, userId);

    private handleSpotRemovingEditor = (editorIndex: number) =>
        SpotSentActions.handleSpotRemovingEditor(this.props.spotIndex, editorIndex);

    private handleFinishAccept = (checked: boolean) =>
        SpotSentActions.handleFinishAccept(this.props.spotIndex, checked);

    private handleProdAccept = (checked: boolean) =>
        SpotSentActions.handleProdAccept(this.props.spotIndex, checked);

    private referenceEditorDropdown = (ref: DropdownContainer) => (this.editorDropdown = ref);

    private handleAddingUser = (option: { value: OptionsListValuePropType; label: string }) => {
        this.handleSpotAddingEditor(option.value as number);

        if (this.editorDropdown) {
            this.editorDropdown.closeDropdown();
        }
    };

    private getSentViaMethods(): JSX.Element[] {
        if (SpotSentStore.spotSentSentViaMethodOptions && SpotSentStore.spotSentSentViaMethodOptions.length > 0) {
            return SpotSentStore.spotSentSentViaMethodOptions.map((method: SpotSentOptionsChildrenFromApi, index: number) => {
                return (
                    <Checkmark
                        key={'sent-via-method-' + index}
                        onClick={() => {
                            this.handleSentViaMethodsChange(method.id);
                        }}
                        checked={this.props.spot.sentViaMethod.includes(method.id)}
                        label={method.name}
                        type={'no-icon'}
                    />
                );
            });
        } else {
            return [];
        }
    }
}
