import * as React from 'react';
import { observer } from 'mobx-react';
import { Section, Row, Col } from 'components/Section';
import * as classNames from 'classnames';
import { action, observable } from 'mobx';
import { ButtonClose, ButtonEdit } from '../../../../../components/Button';
/*import { DropdownContainer } from '../../../../../components/Form';*/
/*import { OptionsListValuePropType } from '../../../../../components/Form/OptionsList';*/

// Styles
const s = require('./ProjectBoardCampaignChannel.css');

// Props
interface ProjectBoardCampaignChannelProps {
    userCanView: boolean;
    userCanEdit: boolean;
    campaignId: number;
    projectCampaignId: number;
    approvedByBilling: boolean;
    channelId: number | null;
    channelName: string | null;
}

/*
interface ProjectBoardCampaignChannelSelector {
    id: number | null;
    name: string | null;
}
*/

/*interface ProjectBoardCampaignChannelSelectorOption {
    id: OptionsListValuePropType;
    name: string;
}*/

/*interface ProjectBoardCampaignChannelSelected {
    value: number | null;
    label: string;
}*/

// Component
@observer
export class ProjectBoardCampaignChannel extends React.Component<ProjectBoardCampaignChannelProps, {}> {

    @observable private isInEditMode: boolean = false;
    @observable private approvedByBilling: boolean = false;
    @observable private channelId: number | null = null;
    @observable private channelName: string | null = null;
    @observable private saveStatus: 'default' | 'saving' | 'success' | 'error' = 'default';

    /*private channelDropdown: DropdownContainer | null = null;*/

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
                                                    onClick={this.handleCampaignChannelToggle}
                                                    label={'Cancel'}
                                                />
                                            }
                                            {!this.isInEditMode &&
                                                <ButtonEdit
                                                    float="right"
                                                    onClick={this.handleCampaignChannelToggle}
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
                            {/*{this.isInEditMode &&
                                <DropdownContainer
                                    ref={this.referenceChannelSelectorDropdown}
                                    label={'Select channel'}
                                    value={(this.channelName) ? this.channelName : ''}
                                    type="field"
                                >
                                    <OptionsList
                                        onChange={this.handleChannelSelectorChange}
                                        value={this.channelName}
                                        options={[
                                            ...[
                                                {
                                                    value: null,
                                                    label: 'not selected',
                                                },
                                            ],
                                            ...this.props.options.map(status => ({
                                                value: status.id,
                                                label: status.name,
                                            })),
                                        ]}
                                    />
                                </DropdownContainer>
                            }*/}
                        </Col>
                    </Row>
                </Section>
            </div>
        ) : null;
    }

   /* private referenceChannelSelectorDropdown = (ref: DropdownContainer) => (this.channelDropdown = ref);*/

    @action
    private setInitialLocalState = (props: ProjectBoardCampaignChannelProps) => {
        this.approvedByBilling = props.approvedByBilling;
        this.channelId = props.channelId;
        this.channelName = props.channelName;
    };

    @action
    private handleCampaignChannelToggle = () => {
        if (!this.isInEditMode === true) {
            this.approvedByBilling = this.props.approvedByBilling;
        }

        this.isInEditMode = !this.isInEditMode;
        this.saveStatus = 'default';
    };

/*    @action
    private handleChannelSelectorChange = (option: ProjectBoardCampaignChannelSelected) => {
        let selectedCustomerSelector: ProjectBoardCampaignChannelSelector = {
            id: option.value
            , name: option.label
        };
        this.valueSelected = selectedCustomerSelector;
        if (this.versionStatusDropdown) {
            this.versionStatusDropdown.closeDropdown();
        }
    };*/

/*    @action
    private handleNotesChange = (value: string) => {
        this.notes = value;
    };

    @action
    private handleNotesSubmit = async () => {
        try {
            this.saveStatus = 'saving';

            await ProjectsDetailsActions.changeProjectCampaignDescription(
                this.props.projectId,
                this.props.projectCampaignId,
                this.notes
            );

            this.saveStatus = 'success';
            this.isInEditMode = false;
        } catch (error) {
            this.saveStatus = 'error';
            throw error;
        }
    };*/
}
