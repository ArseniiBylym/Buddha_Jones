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
import { action, computed } from 'mobx';
import { LoadingIndicator } from 'components/Loaders';
import { SpotSentStore } from '../../../../store/AllStores';
import { SpotSentOptionsChildrenFromApi } from '../../../../types/spotSent';

// Styles
const s = require('./ProducerSpotSentForm.css');

// Props
interface ProducerSpotSentFormSpotCardProps {
    onSpotResendToggle: (checked: boolean) => void;
    onSpotRemove: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onSpotChange: (values: ProjectPickerValues | null) => void;
    onFinishingRequestToggle: (checked: boolean) => void;
    onSentViaMethodChange: (method: number) => void;
    onEditorAdd: (id: number) => void;
    onEditorRemove: (editorIndex: number) => void;
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

    @computed
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

    @computed
    private get selectedEditors(): ProjectCampaignUserFromApi[] {
        return this.props.spot.selectedEditorsIds.reduce((editors: ProjectCampaignUserFromApi[], editorId) => {
            const editorDetails = this.campaignEditorialUsers.users.find(u => u.userId === editorId);
            if (editorDetails) {
                editors.push(editorDetails);
            }

            return editors;
        }, []);
    }

    private editorDropdown: DropdownContainer | null = null;

    public render() {
        return (
            <Card
                title={'#' + (this.props.spotIndex + 1)}
                subTitle="Spot sent"
                isExpandable={false}
                headerElements={[
                    <Checkmark
                        key="finishing-request-checkmark"
                        onClick={this.props.onFinishingRequestToggle}
                        checked={this.props.spot.isFinishingRequest}
                        label="Finish Request"
                        labelOnLeft={true}
                        readOnly={(!this.props.spot.spot) ? true : false}
                        type={'no-icon'}
                    />,
                    <Checkmark
                        key="spot-resend-checkmark"
                        onClick={this.props.onSpotResendToggle}
                        checked={this.props.spot.isResend}
                        label="Spot resend"
                        labelOnLeft={true}
                        readOnly={(!this.props.spot.spot) ? true : false}
                        type={'no-icon'}
                    />,
                    <ButtonClose key="remove-spot" onClick={this.props.onSpotRemove} label="Remove spot" />,
                ]}
            >
                <ProjectPicker
                    onChange={this.props.onSpotChange}
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

                {/*<section>
                    <pre>
                        {JSON.stringify(this.campaignEditorialUsers, null, 2)}
                    </pre>
                </section>*/}

                <Section
                    title={`Spot #${this.props.spotIndex + 1} editors`}
                    headerElements={
                        this.campaignEditorialUsers.users.length > 0
                            ? this.campaignEditorialUsers.users.length > this.selectedEditors.length
                                ? [
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
                                  ]
                                : [
                                      {
                                          key: 'editors-nope',
                                          element: (
                                              <Paragraph type="dim">All editors from campaign are selected</Paragraph>
                                          ),
                                      },
                                  ]
                            : []
                    }
                >
                    {this.props.spot.projectCampaign === null && (
                        <Paragraph type="dim">Campaign selection is needed to pick editors.</Paragraph>
                    )}

                    {this.props.spot.projectCampaign !== null &&
                        this.campaignEditorialUsers.isLoading && <LoadingIndicator label="Loading editors" />}

                    {this.props.spot.projectCampaign !== null &&
                        this.campaignEditorialUsers.isLoading === false &&
                        this.campaignEditorialUsers.users.length <= 0 && (
                            <Paragraph type="dim">Campaign has no editors assigned.</Paragraph>
                        )}

                    {this.props.spot.projectCampaign !== null &&
                        this.campaignEditorialUsers.isLoading === false &&
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
            </Card>
        );
    }

    @action
    private onRemoveEditorHandler = (ind: number): void => {
        this.props.onEditorRemove(ind);
    };

    private referenceEditorDropdown = (ref: DropdownContainer) => (this.editorDropdown = ref);

    private handleAddingUser = (option: { value: OptionsListValuePropType; label: string }) => {
        this.props.onEditorAdd(option.value as number);

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
                            this.props.onSentViaMethodChange(method.id);
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
