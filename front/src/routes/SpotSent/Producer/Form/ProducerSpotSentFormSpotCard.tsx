import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { SpotSentSpot } from 'types/spotSent';
import { Card, Section } from 'components/Section';
import { Checkmark, DropdownContainer, OptionsList, OptionsListValuePropType } from 'components/Form';
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
import { TableRow, Table, TableCell } from 'components/Table';
import { Input } from 'components/Form';
import { ButtonAdd, ButtonClose } from 'components/Button';
import TextAreaFile from 'components/Form/TextAreaFile';

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
    withGraphicsSection?: boolean;
    updateFileList: any;
    finishAccept?: boolean;
}

interface ProducerSpotSentFormSpotCardState {
    textareaValue: string;
    textareaEmpty: boolean;
    files: any;
}

// Types
type ProducerSpotSentFormSpotCardPropsTypes = ProducerSpotSentFormSpotCardProps & AppOnlyStoreState;

// Component
@inject('store')
@observer
export class ProducerSpotSentFormSpotCard extends React.Component<ProducerSpotSentFormSpotCardPropsTypes, ProducerSpotSentFormSpotCardState> {

    state = {
        textareaValue: '',
        textareaEmpty: true,
        files: []
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (this.state.files !== prevState.files) {
            this.props.updateFileList(this.state.files);
        }
    }

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
                headerElements={this.props.withGraphicsSection ? this.getCardHeadersForGraphics() : this.getCardHeaders()}
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
                        {this.props.withGraphicsSection ? this.getGraphicsSentViaMethods() : this.getSentViaMethods()}
                    </div>
                </Section>

                {this.props.withGraphicsSection && 
                    <>
                        {this.getFilesWorkOnSection()}
                    </>
                }

                {!this.props.withGraphicsSection && <Section
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

                </Section>}
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

    private getCardHeadersForGraphics = () => [
        <Checkmark
            key="spot-resend-checkmark"
            onClick={this.handleSpotPDFToggle(this.props.spot.isPDF)}
            checked={this.props.spot.isPDF}
            label="PDF"
            labelOnLeft={true}
            readOnly={false}
            type={'no-icon'}
        />,
        <ButtonClose key="remove-spot" onClick={this.handleSpotRemove} label="Remove spot" />,
    ]

    private getCardHeaders = () => {
            return [
                <Checkmark
                    key="finishing-request-checkmark"
                    onClick={this.handleFinishingRequestToggle}
                    checked={this.props.spot.isFinishingRequest}
                    label="Finish Request"
                    labelOnLeft={true}
                    readOnly={this.props.spot.finishAccept && this.props.spot.isFinishingRequest && this.props.spot.line_status_id === 3}
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
                <ButtonClose key="remove-spot" onClick={this.handleSpotRemove} label="Remove spot" />
            ];
    }

    private onRemoveEditorHandler = (ind: number): void => this.handleSpotRemovingEditor(ind);

    private handleSpotRemove = () => this.props.onSpotRemove(this.props.spotIndex);

    private handleSpotResendToggle = (checked: boolean) =>
        SpotSentActions.handleSpotResendToggle(this.props.spotIndex, checked);

    private handleSpotPDFToggle = (checked: boolean) => e =>
        SpotSentActions.handleSpotPDFToggle(this.props.spotIndex, !checked);

    private handleSpotChange = (values: ProjectPickerValues | null, type?: ProjectPickerSections) =>
        SpotSentActions.handleSpotChange(this.props.spotIndex, values, type);

    private handleFinishingRequestToggle = (checked: boolean) =>
        SpotSentActions.handleFinishingRequestToggle(this.props.spotIndex, checked);

    private handleSentViaMethodsChange = (method: number) =>
        SpotSentActions.handleSentViaMethodsChange(this.props.spotIndex, method);

    private handleGraphicsSentViaMethodsChange = (method: number) =>
        SpotSentActions.handleGraphicsSentViaMethodsChange(this.props.spotIndex, method);

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

    private getGraphicsSentViaMethods(): JSX.Element[] {
        if (SpotSentStore.spotSentGraphicsSentViaMethodOptions && SpotSentStore.spotSentGraphicsSentViaMethodOptions.length > 0) {
            return SpotSentStore.spotSentGraphicsSentViaMethodOptions.map((method: SpotSentOptionsChildrenFromApi, index: number) => {
                return (
                    <Checkmark
                        key={'sent-via-method-' + index}
                        onClick={() => {
                            this.handleGraphicsSentViaMethodsChange(method.id);
                        }}
                        checked={this.props.spot.sentGraphicsViaMethod.includes(method.id)}
                        label={method.name}
                        type={'no-icon'}
                    />
                );
            });
        } else {
            return [];
        }
    }

    private getFilesWorkOnSection(): JSX.Element | null {
        return (
            <Section title="Files worked on">
                <Table
                    type="compact"
                    header={[
                        { title: 'Filename', align: 'left' },
                        { title: 'Description', align: 'left' },
                        { title: '', align: 'center' },
                    ]}
                    columnsWidths={['316px', '350px', '110px']}
                >
                    {this.state.files.map((file: {file_name: string, file_description: string, }, fileIndex) => (
                        <TableRow key={fileIndex}>
                            <TableCell>
                                <Input
                                    maxWidth={266}
                                    label="Filename"
                                    value={file.file_name}
                                    onChange={this.handleFileChangeName(fileIndex)}
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    minWidth={320}
                                    label="Description (optional)"
                                    value={file.file_description}
                                    onChange={this.handleFileChangeDescription(fileIndex)}
                                />
                            </TableCell>
                            <TableCell >
                                <div className={s.fileCheckbox}>
                                    <ButtonClose
                                        onClick={this.handleFileRemove(fileIndex)}
                                        label=""
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}

                    {(this.state.files.length <= 0) && (
                        <TableRow key="no-files">
                            <TableCell colSpan={4}>
                                <Paragraph type="alert">Files are required</Paragraph>
                            </TableCell>
                        </TableRow>
                    )}

                    <TableRow key="add">
                        <TableCell colSpan={4} align="right">
                            <ButtonAdd
                                onClick={this.handleFileAdd}
                                label="Add file names"
                                labelOnLeft={true}
                                float="right"
                            />
                        </TableCell>
                    </TableRow>
                </Table>
                <TextAreaFile 
                    config={this.state} 
                    textareaOnFocusHandler={this.textareaOnFocusHandler} 
                    textareaOnBlurHandler={this.textareaOnBlurHandler}
                    textareaOnChangeHandler={this.textareaOnChangeHandler}
                />
            </Section>
        );
    }

    textareaOnFocusHandler = () => {
        if (this.state.textareaEmpty) {
            this.setState({
                textareaEmpty: false
            });
        }
    }

    textareaOnBlurHandler = () => {
        if (!this.state.textareaValue) {
            this.setState({
                textareaEmpty: true
            });
        }
    }

    textareaOnChangeHandler = e => {
        this.setState({
            textareaValue: e.target.value,
        });
    }

    addEmptyFileItem = () => {
        if (this.state.files.length > 0 && (this.state.files[this.state.files.length - 1] as any).file_name === '') {
            return;
        }
        const filesList: any = this.state.files.slice();
        filesList.push({file_name: '', file_description: ''});
        this.setState({
            files: filesList,
        });
    }

    addFileArray = (arr: any) => {
        let files: any = [];
        if (this.state.files.length > 0 && (this.state.files[this.state.files.length - 1 ] as any).file_name === '') {
            let splicedStateFiles = this.state.files.slice();
            splicedStateFiles.splice(-1, 1);
            let tempFilesList: any = [];
            arr.forEach((item, i) => {
                tempFilesList.push({file_name: item, file_description: ''});
            });
            files = splicedStateFiles.concat(tempFilesList);
        } else {
            let tempFilesList: any = [];
            arr.forEach((item, i) => {
                tempFilesList.push({file_name: item, file_description: ''});
            });
            files = this.state.files.concat(tempFilesList);
        }
        this.setState({
            files: files,
        });
            
    }

    private handleFileAdd = () => {
        if (this.state.textareaValue) {
            const arr: string[] | null = this.state.textareaValue.match(/[^\r\n]+/g);
            if (arr) {
                this.addFileArray(arr);
                this.setState({
                    textareaValue: '',
                    textareaEmpty: true,
                });
            }
        } else {
            
            this.addEmptyFileItem();
        }
    };

    handleFileChangeName = (index) => e => {
        const filesList = this.state.files.map((item: {file_name: string, file_description: string}, i) => {
            if (index === i) {
                return {
                    file_name: e.target.value,
                    file_description: item.file_description,
                };
            } else {
                return item;
            }
        });
        this.setState({
            files: filesList,
        });
    }

    handleFileChangeDescription = (index) => e => {
        const filesList = this.state.files.map((item: {file_name: string, file_description: string}, i) => {
            if (index === i) {
                return {
                    file_name: item.file_name,
                    file_description: e.target.value
                };
            } else {
                return item;
            }
        });
        this.setState({
            files: filesList,
        });
    }

    handleFileRemove = (index) => e => {
        const filesList = this.state.files.filter((item, i) => {
            return index !== i;
        });
        this.setState({
            files: filesList,
        });
    }

}
