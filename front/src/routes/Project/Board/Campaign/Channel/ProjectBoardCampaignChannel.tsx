import * as React from 'react';
import { observer } from 'mobx-react';
import { Section, Row, Col } from 'components/Section';
import * as classNames from 'classnames';
import { action, observable } from 'mobx';
import { ButtonClose, ButtonEdit, ButtonSave } from '../../../../../components/Button';
import { DropdownContainer, OptionsList } from '../../../../../components/Form';
import { AppOnlyStoreState } from '../../../../../store/AllStores';
import { ChannelsActions } from '../../../../../actions';
import { ChannelsList } from '../../../../../types/channels';

// Styles
const s = require('./ProjectBoardCampaignChannel.css');

// Props
interface ProjectBoardCampaignChannelProps {
    userCanView: boolean;
    userCanEdit: boolean;
    campaignId: number;
    customerId: number;
    projectCampaignId: number;
    approvedByBilling: boolean;
    channelId: number | null;
    channelName: string | null;
}

// Types
type ProjectBoardCampaignChannelPropsTypes = ProjectBoardCampaignChannelProps & AppOnlyStoreState;

/*interface ProjectBoardCampaignChannelSelector {
    id: number | null;
    name: string | null;
}*/

/*interface ProjectBoardCampaignChannelSelectorOption {
    id: OptionsListValuePropType;
    name: string;
}*/

interface ProjectBoardCampaignChannelSelected {
    value: number | null;
    label: string;
}

// Component
@observer
export class ProjectBoardCampaignChannel extends React.Component<ProjectBoardCampaignChannelPropsTypes, {}> {

    @observable private isInEditMode: boolean = false;
    @observable private approvedByBilling: boolean = false;
    @observable private channelId: number | null = null;
    @observable private channelName: string | null = null;
    @observable private saveStatus: 'default' | 'saving' | 'success' | 'error' = 'default';
    @observable private channelOptions: ChannelsList | null = null;

    private channelDropdown: DropdownContainer | null = null;

    public componentDidMount(): void {
        this.setInitialLocalState(this.props);
    }

/*    public componentWillReceiveProps(nextProps: ProjectBoardCampaignChannelProps): void {
    }*/

    public render() {
        return this.props.userCanView ? (
            <div
                className={classNames(s.channelContainer, {
                    [s.editing]: this.isInEditMode,
                })}
            >
                <Section
                    title="Channel"
                    noSeparator={true}
                    headerElements={
                        this.props.userCanEdit
                            ? [
                                {
                                    key: 'edit-channel-button',
                                    element: (
                                        <>
                                            {this.isInEditMode &&
                                                <ButtonClose
                                                    float="right"
                                                    onClick={this.handleCampaignChannelCancel}
                                                    label={'Cancel'}
                                                />
                                            }
                                            {!this.isInEditMode &&
                                                <ButtonEdit
                                                    float="right"
                                                    onClick={this.handleCampaignChannelEdit}
                                                    label={'Edit channel'}
                                                />
                                            }
                                        </>
                                    ),
                                },
                            ]
                            : []
                    }
                >
                    <Row>
                        <Col size={12}>
                            {!this.isInEditMode &&
                                <>
                                    <h5>Approved channel: {this.channelName}</h5>
                                    <h5>Is approved: {this.approvedByBilling ? 'yes' : 'no'}</h5>
                                    <h5>{this.channelId}</h5>
                                    <h5>{this.saveStatus}</h5>
                                </>
                            }
                            {this.isInEditMode &&
                                <DropdownContainer
                                    ref={this.referenceChannelSelectorDropdown}
                                    label={'Select channel'}
                                    value={(this.channelName) ? this.channelName : ''}
                                >
                                    <OptionsList
                                        onChange={this.handleChannelSelectorChange}
                                        value={this.channelName}
                                        loadingOptions={(this.channelOptions) ? this.channelOptions.loading : false}
                                        height={100}
                                        options={[
                                            ...[
                                                {
                                                    value: null,
                                                    label: 'not selected',
                                                },
                                            ],
                                            ...(this.channelOptions && this.channelOptions.channels) ? this.channelOptions.channels
                                                .map(status => ({
                                                    value: status.id,
                                                    label: status.name,
                                                })
                                            ) : [],
                                        ]}
                                    />
                                </DropdownContainer>
                            }
                            {this.isInEditMode &&
                                <ButtonSave
                                    onClick={this.handleSaveChanges}
                                    float="left"
                                    label={
                                        this.status === 'error' ? 'Could not save, please try again' : 'Save details'
                                    }
                                    labelColor={this.status === 'error' ? 'orange' : 'blue'}
                                    savingLabel="Saving"
                                    isSaving={this.status === 'saving'}
                                />
                            }
                        </Col>
                    </Row>
                </Section>
            </div>
        ) : null;
    }

    private referenceChannelSelectorDropdown = (ref: DropdownContainer) => (this.channelDropdown = ref);

    @action
    private setInitialLocalState = (props: ProjectBoardCampaignChannelPropsTypes) => {
        this.approvedByBilling = props.approvedByBilling;
        this.channelId = props.channelId;
        this.channelName = props.channelName;
    };

    @action
    private handleCampaignChannelEdit = async () => {
        this.isInEditMode = true;
        try {
            this.channelOptions = (await ChannelsActions.fetchChannelsByCampaignId(this.props.campaignId) as ChannelsList);
        } catch (error) {
            throw error;
        }
    };

    @action
    private handleCampaignChannelCancel = () => {
        this.setInitialLocalState(this.props);
        this.isInEditMode = false;
        this.saveStatus = 'default';
    };

    @action
    private handleChannelSelectorChange = (option: ProjectBoardCampaignChannelSelected) => {
        this.channelId = option.value;
        this.channelName = option.label;
        if (this.channelDropdown) {
            this.channelDropdown.closeDropdown();
        }
    };

    @action
    private handleSaveChanges = async () => {
        try {
            if (this.props.projectCampaignId && this.valueSelected && this.valueSelected.id) {
                this.saveStatus = 'saving';
                await ChannelsActions.changeProjectCampaignChannel(
                    this.props.projectCampaignId,
                    this.props.customerId,
                    this.channelId,
                    this.approvedByBilling
                );
                this.saveStatus = 'success';
                this.isInEditMode = false;
            }
        } catch (error) {
            this.setInitialLocalState(this.props);
            this.saveStatus = 'error';
            throw error;
        }
    };

}
