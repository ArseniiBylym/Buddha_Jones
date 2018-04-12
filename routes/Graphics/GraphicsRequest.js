import React from 'react';
import { connect } from 'react-redux';
import zenscroll from 'zenscroll';
import * as API from './../../actions/api';
import * as actions from './../../actions/ActionTypes';
import { actionAlertNotify } from './../../actions/Notifications';
import history from './../../core/history';
import { Section, Row, Col } from './../../components/Section';
import { LoadingShade, LoadingSpinner, LoadingBar } from './../../components/Loaders';
import Layout from './../../components/Layout/Layout';
import Table from './../../components/Table/Table';
import TableRow from './../../components/Table/TableRow';
import TableCell from './../../components/Table/TableCell';
import Paragraph from './../../components/Content/Paragraph';
import Button from './../../components/Button/Button';
import Input from './../../components/Form/Input';
import TextArea from './../../components/Form/TextArea';
import Person from './../../components/Buddha/Person';
import Select from './../../components/Form/Select';
import ProjectPicker from './../../components/Buddha/ProjectPicker';
import DropdownPeoplePicker from './../../components/Buddha/DropdownPeoplePicker';
import ClientsFilter from './../../components/Buddha/ClientsFilter';
import CustomerContactPicker from './../../components/Buddha/CustomerContactPicker';
import Toggle from './../../components/Form/Toggle';
import Radio from './../../components/Form/Radio';
import DatePicker from './../../components/Calendar/DatePicker';
import moment from 'moment';

// Styles
import s from './GraphicsRequest.css';
import IconSendSubmit from './../../components/Icons/IconSendSubmit';
import IconArrowLeftYellow from './../../components/Icons/IconArrowLeftYellow';
import IconClose from './../../components/Icons/IconClose';

// Component
class PageGraphicsRequest extends React.Component {
    constructor(props, context) {
        super(props, context);

        const formatOptions = [
            { value: 'null', label: 'None' },
            { value: '16 Bit Tiffs', label: '16 Bit Tiffs' },
            { value: 'Lossless Quicktimes', label: 'Lossless Quicktimes' },
            { value: 'ProRess 4444', label: 'ProRess 4444' }
        ];

        function getFormatOptions() {
            return formatOptions.map((item, index)=>{
                return { value: item.value, label: item.label };
            });
        }

        const dueDateOptions = [
            { value: 'ASAP', label: 'ASAP' },
            { value: 'EOD', label: 'EOD' },
            { value: 'Morning tomorrow', label: 'Morning tomorrow' },
            { value: 'Lunch tomorrow', label: 'Lunch tomorrow' },
            { value: 'EOD tomorrow', label: 'EOD tomorrow' },
            { value: 'By date', label: 'By specific date' }
        ];

        function getDueDateOptions() {
            return dueDateOptions.map((item, index) => {
                return { value: item.value, label: item.label };
            });
        }

        this.state = {
            requestId: null,
            requestStatus: undefined,
            requestTypeOptions: [
                {
                    value: '1',
                    label: 'Design work'
                },
                {
                    value: '2',
                    label: 'Finishing'
                }
            ],
            requestTypeSelected: '1',
            selectedProject: {
                projectId: null,
                campaignId: null,
                spotId: null,
                versionId: null
            },
            defaultProject: undefined,
            loadingAssociatedPeople: false,
            associatedPeople: [],
            isFinal: true,
            isRequestUploading: false,
            isFetchRequestLoading: false,
            designWork: {
                framerateOptions: [
                    { value: '23.976', label: '23.976 FPS' },
                    { value: '24', label: '24 FPS' },
                    { value: '29.97', label: '29.97 FPS' },
                    { value: '30', label: '30 FPS' },
                    { value: '59.97', label: '59.97 FPS' }
                ],
                framerateSelected: '30',

                priorityOptions: getDueDateOptions(),
                prioritySelected: 'EOD tomorrow',
                priorityDate: null,

                burnInOptions: [
                    { value: 'Standard', label: 'Standard burn in' },
                    { value: 'Broadcast/Games', label: 'Broadcast/games burn in' }
                ],
                burnInSelected: 'Standard'
            },

            finishing: {
                finishingDesigners: [],

                formatCompedOptions: getFormatOptions(),
                formatCompedSelected: null,

                formatTextlessOptions: getFormatOptions(),
                formatTextlessSelected: null,

                formatKeyableOptions: getFormatOptions(),
                formatKeyableSelected: null,

                checkersDueOptions: getDueDateOptions(),
                checkersDueSelected: 'EOD',
                checkersDueDate: null,

                finalRendersDueOptions: getDueDateOptions(),
                finalRendersDueSelected: 'EOD tomorrow',
                finalRendersDueDate: null,

                finishingOutOfHouse: false,
                finishingStudioId: null,
                finishingStudioName: '',
                finishingContact: '',

                projectCollectStatus: false,
                projectCollectNote: '',

                stereoFinishStatus: false,
                stereoFinishNote: ''
            },

            common: {
                resolutionOptions: [],
                resolutionSelected: null,
                resolutionNotes: '',
                notes: ''
            }

        };

        this.handleSelectProject = this.handleSelectProject.bind(this);
    }

    componentDidMount() {
        if (this.state.requestTypeSelected === '1') { // designWork
            this.setState({
                common: Object.assign({}, this.state.common, {
                    resolutionOptions: [
                        { value: 'Standard HD', label: 'Standard HD' },
                        { value: 'HDCC (Center Cut Safe)', label: 'HDCC (Center Cut Safe)' },
                        { value: 'Instagram', label: 'Instagram' },
                        { value: 'Snapchat', label: 'Snapchat' },
                        { value: 'Other', label: 'Other' }
                    ],
                    resolutionSelected: 'Standard HD',
                })
            });
        } else { // finishing
            this.setState({
                common: Object.assign({}, this.state.common, {
                    resolutionOptions: [
                        { value: '2K', label: '2K' },
                        { value: '4K', label: '4K' },
                        { value: 'HD', label: 'HD' },
                        { value: 'HDCC', label: 'HDCC' },
                        { value: 'Scope', label: 'Scope' },
                        { value: 'Flat', label: 'Flat' },
                        { value: 'Instagram', label: 'Instagram' },
                        { value: 'Snapchat', label: 'Snapchat' },
                        { value: 'Other', label: 'Other' }
                    ],
                    resolutionSelected: '2K',
                })
            });
        }

        let headerElements = [];

        headerElements.push(
            <Button
                onClick={e => this.handleGoingBack(e)}
                label={{
                    text: 'Back to all requests',
                    color: 'white',
                    size: 'large',
                    onLeft: false
                }}
                icon={{
                    background: 'none-alt',
                    size: 'small',
                    element:
                        <IconArrowLeftYellow
                            width={15}
                            height={11}
                            marginTop={-5}
                            marginLeft={-7}
                        />
                }}
            />
        );

        // Dispatch header
        this.props.dispatch({
            type: actions.HEADER_SET_ALL,
            payload: {
                title: 'Graphics request',
                elements: headerElements
            }
        });

        if (this.props.requestId) {
            this.fetchRequest(parseInt(this.props.requestId, 10));
        }
    }

    handleGoingBack(e) {
        e.preventDefault();
        let url = '/graphics/';
        url += typeof this.props.fromRequestsPage !== 'undefined' ? this.props.fromRequestsPage : '1';
        history.push(url);
    }

    fetchDesignParam(response) {
        return {
            designWork: Object.assign({}, this.state.designWork, {
                framerateSelected: response.frameRate,
                prioritySelected: response.priority ? response.priority : 'null',
                priorityDate: response.priorityDate ? response.priorityDate: 'null',
                burnInSelected: response.burnIn
            })
        };
    }

    fetchFinishingParam(response) {
        return {
            finishing: Object.assign({}, this.state.finishing, {
                finisherSelected: response.finisherId,
                formatCompedSelected: response.formatComped,
                formatTextlessSelected: response.formatTextless,
                formatKeyableSelected: response.formatKeyable,
                checkersDueDate: response.checkerDueDate ? response.checkerDueDate: 'null',
                checkersDueSelected: response.checkerDue ? response.checkerDue: 'null',
                finalRendersDueDate: response.finalRendersDueDate ? response.finalRendersDueDate: 'null',
                finalRendersDueSelected: response.finalRendersDue ? response.finalRendersDue: 'null',
                finishingAtSelected: response.finishingAt,
                finishingContact: response.finishingContact==='null' ? '' : response.finishingContact,
                projectCollectStatus: response.projectCollect,
                projectCollectNote: response.projectCollectNote==='null' ? '' : response.projectCollectNote,
                stereoFinishStatus: response.stereoFinish,
                stereoFinishNote: response.stereoFinishNote==='null' ? '' : response.stereoFinishNote
            })
        };
    }

    fetchRequest(requestId) {
        this.setState({
            isFetchRequestLoading: true
        });

        // Fetch
        API.get(API.GRAPHICS_REQUEST + '/' + requestId)
            .then(response => {
                let requestTypeSelected = '1';
                if (response.finisherId) {
                    requestTypeSelected = '2';
                }

                const selectedProject = {
                    selectedProject: {
                        projectId: response.projectId,
                        campaignId: response.campaignId,
                        spotId: response.spotId,
                        versionId: response.versionId
                    }
                };
                const common = {
                    common: Object.assign({}, this.state.common, {
                        resolutionSelected: response.resolution,
                        resolutionNotes: response.resolutionNote,
                        notes: response.note==='null' ? '' : response.note
                    })
                };

                const others = {
                    requestId: requestId,
                    requestStatus: response.status,
                    requestTypeSelected: requestTypeSelected,
                    defaultProject: {
                        project: {
                            value: response.projectName || '',
                            selectedId: response.projectId
                        },
                        campaign: {
                            value: response.campaignName || '',
                            selectedId: response.campaignId
                        },
                        spot: {
                            value: response.spotName || '',
                            selectedId: response.spotId
                        },
                        version: {
                            value: response.versionName || '',
                            selectedId: response.versionId
                        }
                    },
                    isFinal: (response.statusId === 1) ? false : true
                };

                const designWork = this.fetchDesignParam(response);
                const finishing = this.fetchFinishingParam(response);

                let updatedState = Object.assign({},
                    this.state,
                    selectedProject,
                    common,
                    others,
                    designWork,
                    finishing
                );

                this.setState(
                    updatedState
                , ()=>{
                    this.setState(
                        {
                            isFetchRequestLoading: false
                        }
                    );
                });
            })
            .catch(error => {
                this.props.dispatch(
                    actionAlertNotify(
                        'Something went wrong with fetching request data',
                        'Pelase try again later',
                        'error',
                        false,
                        true,
                        false,
                        5
                    )
                );
            });
    }

    componentWillUmount() {
        // Remove header
        this.props.dispatch({
            type: actions.HEADER_RESET
        });
    }

    handleCreateNewRequestClick(e) {
        history.push('/graphic/graphics-request');
    }

    handleRequestTypeChange(e) {
        if (typeof e !== 'undefined' && typeof e.target !== 'undefined' && typeof e.target.value !== 'undefined') {
            this.setState({
                requestTypeSelected: e.target.value
            });
        }
    }

    handleSelectProject(selected) {
        if (typeof selected !== 'undefined') {
            // Check if campaign has been just selected
            const campaignSelectedForTheFirstTime =
                this.state.selectedProject.campaignId === null &&
                selected.campaign.selectedId !== null
                    ? true
                    : false;

            // Change project picker selection
            this.setState({
                associatedPeople: campaignSelectedForTheFirstTime ? [] : undefined,
                selectedProject: Object.assign({}, this.state.selectedProject, {
                    projectId: selected.project.selectedId,
                    campaignId: selected.campaign.selectedId,
                    spotId: selected.spot.selectedId,
                    versionId: selected.version.selectedId
                })
            }, () => {
                if (campaignSelectedForTheFirstTime) {
                    this.fetchAssociatedPeople(selected.project.selectedId, selected.campaign.selectedId);
                }
            });
        }
    }

    fetchAssociatedPeople(projectId, campaignId) {
        // Indicate associated people are loading
        this.setState({
            loadingAssociatedPeople: true
        }, () => {
            // Simulate loading of associated people and populate with sample data
            setTimeout(() => {
                this.setState({
                    loadingAssociatedPeople: false,
                    associatedPeople: [
                        {
                            role: 'Producer',
                            name: 'John Doe',
                            id: 1
                        },
                        {
                            role: 'Art Director',
                            name: 'Jane Smith',
                            id: 2
                        },
                        {
                            role: 'Editor',
                            name: 'Ricardo Castro',
                            id: 3
                        }
                    ]
                });
            }, 2048);
        });
    }

    getCommonParam() {
        const { selectedProject, common, isFinal, requestId } = this.state;

        let params = {
            graphics_request_id: requestId,
            project_id: selectedProject.projectId,
            campaign_id: selectedProject.campaignId,
            spot_id: selectedProject.spotId,
            version_id: selectedProject.versionId,
            resolution: common.resolutionSelected,
            resolution_note: common.resolutionNotes,
            note: common.notes,
            status_id: (isFinal === true) ? 2 : 1,
            files: JSON.stringify(common.referenceFileNames)
        };

        return params;
    }

    getDesignWorkParam() {
        const { designWork } = this.state;

        let params = {
            frame_rate: designWork.framerateSelected,
            burn_in: designWork.burnInSelected
        };

        if (designWork.prioritySelected !== 'null') {
            params.priority = designWork.prioritySelected;
        } else if (designWork.priorityDate !== 'null') {
            params.priority_date = designWork.priorityDate;
        }

        return params;
    }

    getFinishingParam() {
        const { finishing } = this.state;

        let params = {
            finisher_id: finishing.finisherSelected,
            format_comped: finishing.formatCompedSelected,
            format_textless: finishing.formatTextlessSelected,
            format_keyable: finishing.formatKeyableSelected,
            finihsing_at: finishing.finishingAtSelected,
            finishing_contact: finishing.finishingContact,
            project_collect: finishing.projectCollectStatus,
            project_collect_note: finishing.projectCollectNote,
            stereo_finish: finishing.stereoFinishStatus,
            stereo_finish_note: finishing.stereoFinishNote
        };

        if (finishing.checkersDueSelected !== 'null') {
            params.checker_due = finishing.checkersDueSelected;
        } else if (finishing.checkersDueDate !== 'null') {
            params.checker_due_date = finishing.checkersDueDate;
        }

        if (finishing.finalRendersDueSelected !== 'null') {
            params.final_renders_due = finishing.finalRendersDueSelected;
        } else if (finishing.finalRendersDueDate !== 'null') {
            params.final_renders_due_date = finishing.finalRendersDueDate;
        }

        return params;
    }


    handleRequestSubmission() {
        // If project and campaign are not selected
        if (!this.state.selectedProject.projectId) {
            // Scroll to Project Pikcer
            this.scrollToProjectPicker();

            // Notify to select project
            this.props.dispatch(
                actionAlertNotify(
                    'Select project',
                    'Project has to be selected to create graphics request.',
                    'error',
                    false,
                    true,
                    false,
                    5
                )
            );

            return;
        }

        // get designwork param
        let params = {};
        let designParams = this.getDesignWorkParam();
        let finishingParams = this.getFinishingParam();
        let commonParams = this.getCommonParam();

        if (this.state.requestTypeSelected === '1') {
            params = Object.assign({}, commonParams, designParams);
        } else {
            params = Object.assign({}, commonParams, finishingParams);
        }

        // Decide API mothod - PUT or POST
        const method = this.state.requestId === null ? 'post' : 'put';
        const url = this.state.requestId === null ? API.GRAPHICS_REQUEST : API.GRAPHICS_REQUEST + '/' + this.state.requestId;
        const send = this.state.requestId === null ? API.makePostData(params) : API.makePutData(params);


        this.setState({
            isRequestUploading: true
        });

        // Upload
        API[method](url, send)
            .then(response => {
                this.setState({
                    requestId: parseInt(response.data.id, 10) || null,
                    isRequestUploading: false
                });

                // Notification attributes
                let notificationTitle = '', notificationDescription = '';
                if (this.state.isFinal === true) {
                    notificationTitle = 'Sent for approval';
                    notificationDescription = 'Your graphics request has been sent for approval';
                } else {
                    notificationTitle = 'Graphics request\'s draft saved';
                    notificationDescription = 'You can come back and modify the graphics request whenever you like and send it for approval when ready.';
                }

                // Notify to success
                this.props.dispatch(
                    actionAlertNotify(
                        notificationTitle,
                        notificationDescription,
                        'success',
                        false,
                        true,
                        false,
                        5
                    )
                );

                // Redirect to requests list if it's final
                if (this.state.isFinal === true) {
                    history.push('/graphics');
                }
            })
            .catch(error => {
                //console.log(error);
                this.props.dispatch(
                    actionAlertNotify(
                        'Something went wrong with applying',
                        'Please try again',
                        'error',
                        false,
                        true,
                        false,
                        5
                    )
                );
                this.setState({
                    isRequestUploading: false
                });
            });
    }

    handleRequestStatusToggle(e) {
        // Toggle state
        this.setState({
            isFinal: !this.state.isFinal
        });
    }

    handleElementChange(e, where, what) {
        let returnObj = {};
        returnObj[what] = e.target.value;

        if (where === 'designWork') {
            this.setState({
                designWork: Object.assign({}, this.state.designWork, returnObj)
            });
        } else if (where === 'finishing') {
            this.setState({
                finishing: Object.assign({}, this.state.finishing, returnObj)
            });
        } else {
            this.setState({
                common: Object.assign({}, this.state.common, returnObj)
            });
        }
    }

    handleFinishingInOrOutOfHouseToggle(isOutOfHouse) {
        if (typeof isOutOfHouse !== 'undefined') {
            this.setState({
                finishing: Object.assign({}, this.state.finishing, {
                    finishingOutOfHouse: isOutOfHouse
                })
            });
        }
    }

    handleRefFileNames(e, index) {
        let commonState = Object.assign({}, this.state.common);

        this.setState({
            common: commonState
        });
    }

    handlePriorityDateChange(date) {
        this.setState({
            designWork: Object.assign({}, this.state.designWork, {
                priorityDate: date
            })
        });
    }

    handleFinishingDesignerChange(picked) {
        if (typeof picked !== 'undefined' && typeof picked.peopleIds !== 'undefined') {
            this.setState({
                finishing: Object.assign({}, this.state.finishing, {
                    finishingDesigners: picked.peopleIds
                })
            });
        }
    }

    handleFinishingOutOfHouseStudioChange(studio) {
        if (typeof studio !== 'undefined' && typeof studio.value !== 'undefined') {
            this.setState({
                finishing: Object.assign({}, this.state.finishing, {
                    finishingStudioId: studio.value,
                    finishingStudioName: typeof studio.label !== 'undefined' ? studio.label : '',
                })
            });
        }
    }

    handleFinishingCheckersDueDateChange(date) {
        this.setState({
            finishing: Object.assign({}, this.state.finishing, {
                checkersDueDate: date['_i'],
                checkersDueSelected: 'null'
            })
        });
    }

    handleFinishingFinalRendersDueDateChange(date) {
        this.setState({
            finishing: Object.assign({}, this.state.finishing, {
                finalRendersDueDate: date['_i'],
                finalRendersDueSelected: 'null'
            })
        });
    }

    handleFinishingProjectCollectStatusToggle() {
        this.setState({
            finishing: Object.assign({}, this.state.finishing, {
                projectCollectStatus: !this.state.finishing.projectCollectStatus
            })
        });
    }

    handleFinishingStereoFinishStatusToggle() {
        this.setState({
            finishing: Object.assign({}, this.state.finishing, {
                stereoFinishStatus: !this.state.finishing.stereoFinishStatus
            })
        });
    }

    scrollToProjectPicker() {
        if (typeof this.refs.projectPicker !== 'undefined') {
            if (typeof this.refs.projectPicker.refs.sectionContainer !== 'undefined') {
                if (typeof this.refs.projectPicker.refs.sectionContainer.refs.container !== 'undefined') {
                    zenscroll.intoView(this.refs.projectPicker.refs.sectionContainer.refs.container);
                }
            }
        }
    }

    finishingPortion() {
        return (
            <div>

                {this.commonResolution('Finishing resolution')}

                <Section>
                    <Row>
                        <Col size={4}>
                            <Section noSeparator={true} title="Format comped">
                                <Select
                                    onChange={e =>this.handleElementChange(e, 'finishing', 'formatCompedSelected')}
                                    options={ this.state.finishing.formatCompedOptions }
                                    value={this.state.finishing.formatCompedSelected}
                                />
                            </Section>
                        </Col>
                        <Col size={4}>
                            <Section noSeparator={true} title="Format textless">
                                <Select
                                    onChange={e =>this.handleElementChange(e, 'finishing', 'formatTextlessSelected')}
                                    options={ this.state.finishing.formatTextlessOptions }
                                    value={this.state.finishing.formatTextlessSelected}
                                />
                            </Section>
                        </Col>
                        <Col size={4}>
                            <Section noSeparator={true} title="Format keyable">
                                <Select
                                    onChange={e =>this.handleElementChange(e, 'finishing', 'formatKeyableSelected')}
                                    options={ this.state.finishing.formatKeyableOptions }
                                    value={this.state.finishing.formatKeyableSelected}
                                />
                            </Section>
                        </Col>
                    </Row>
                </Section>

                <Section>
                    <Row>
                        <Col size={4}>
                            <Section noSeparator={true} title="Finishing">
                                <Toggle
                                    onChange={e => this.handleFinishingInOrOutOfHouseToggle(e)}
                                    defaultRight={this.state.finishing.finishingOutOfHouse}
                                    left={{ label: 'In-house', value: false }}
                                    right={{ label: 'Out-of-house', value: true }}
                                    align="left"
                                />
                            </Section>
                        </Col>
                        {(this.state.finishing.finishingOutOfHouse === false) && (
                            <Col size={8}>
                                <Section noSeparator={true} title="Finisher">
                                    <DropdownPeoplePicker
                                        onChange={e => this.handleFinishingDesignerChange(e)}
                                        pickedPeopleIds={this.state.finishing.finishingDesigners}
                                        label="Add"
                                        valueLabel="designer"
                                        type="designer"
                                    />
                                </Section>
                            </Col>
                        )}
                        {(this.state.finishing.finishingOutOfHouse === true) && (
                            <Col size={4}>
                                <Section noSeparator={true} title="Studio">
                                    <ClientsFilter
                                        onChange={e => this.handleFinishingOutOfHouseStudioChange(e)}
                                        label={this.state.finishing.finishingStudioId ? null : 'Pick finishing studio'}
                                        valueLabel={this.state.finishing.finishingStudioName}
                                        align="left"
                                    />
                                </Section>
                            </Col>
                        )}
                        {(this.state.finishing.finishingOutOfHouse === true) && (
                            <Col size={4}>
                                {(this.state.finishing.finishingStudioId) && (
                                    <Section noSeparator={true} title="Contacts">
                                        <CustomerContactPicker
                                            customerId={this.state.finishing.finishingStudioId}
                                            customerName={this.state.finishing.finishingStudioName}
                                            label=""
                                        />
                                    </Section>
                                )}
                            </Col>
                        )}
                    </Row>
                </Section>

                <Section>
                    <Row>
                        <Col size={6}>
                            <Radio
                                onClick={e => this.handleFinishingProjectCollectStatusToggle()}
                                checked={this.state.finishing.projectCollectStatus}
                                label="Project collect"
                                value={true}
                            />
                            {(this.state.finishing.projectCollectStatus) && (
                                <TextArea
                                    className={s.collectAndStereoNotes}
                                    onChange={e =>this.handleElementChange(e, 'finishing', 'projectCollectNote')}
                                    value={this.state.finishing.projectCollectNote}
                                    label="Notes..."
                                />
                            )}
                        </Col>
                        <Col size={6}>
                            <Radio
                                onClick={e => this.handleFinishingStereoFinishStatusToggle()}
                                checked={this.state.finishing.stereoFinishStatus}
                                label="Stereo finish"
                                value={true}
                            />
                            {(this.state.finishing.stereoFinishStatus) && (
                                <TextArea
                                    className={s.collectAndStereoNotes}
                                    onChange={e =>this.handleElementChange(e, 'finishing', 'stereoFinishNote')}
                                    value={this.state.finishing.stereoFinishNote}
                                    label="Notes..."
                                />
                            )}
                        </Col>
                    </Row>
                </Section>

                {this.commonRefFiles()}

                {this.commonNote()}

            </div>
        );
    }

    designWorkPortion() {
        return (
            <div>

                {this.commonResolution('Resolution')}

                <Section title="Technical details">
                    <Row>
                        <Col size={6}>
                            <Select
                                value={this.state.designWork.framerateSelected}
                                onChange={e =>this.handleElementChange(e, 'designWork', 'framerateSelected')}
                                options={
                                    this.state.designWork.framerateOptions
                                }
                            />
                        </Col>
                        <Col size={6}>
                            <Select
                                value={this.state.designWork.burnInSelected}
                                onChange={e => this.handleElementChange(e, 'designWork', 'burnInSelected')}
                                options={this.state.designWork.burnInOptions}
                            />
                        </Col>
                    </Row>
                </Section>

                {this.commonRefFiles()}

                {this.commonNote()}

            </div>
        );
    }

    finishingPriority() {
        return (
            <Row>

                <Col size={6}>
                    <Section noSeparator={true} title="Checkers due">
                        <Select
                            value={this.state.finishing.checkersDueSelected}
                            onChange={e =>this.handleElementChange(e, 'finishing', 'checkersDueSelected')}
                            options={
                                this.state.finishing.checkersDueOptions
                            }
                        />
                        {(this.state.finishing.checkersDueSelected === 'By date') && (
                            <DatePicker
                                className={s.finishingWorkPriorityDatePicker}
                                onChange={e => this.handleFinishingCheckersDueDateChange(e)}
                                label='Delivery date'
                                value={
                                    this.state.finishing.checkersDueDate && typeof this.state.finishing.checkersDueDate.isValid !== 'undefined'
                                        ? this.state.finishing.checkersDueDate.isValid()
                                            ? this.state.finishing.checkersDueDate
                                            : moment()
                                        : moment(this.state.finishing.checkersDueDate).isValid()
                                            ? moment(this.state.finishing.checkersDueDate)
                                            : moment()
                                }
                            />
                        )}
                    </Section>
                </Col>

                <Col size={6}>
                    <Section noSeparator={true} title="Final renders due">
                        <Select
                            onChange={e => this.handleElementChange(e, 'finishing', 'finalRendersDueSelected')}
                            options={ this.state.finishing.finalRendersDueOptions }
                            value={this.state.finishing.finalRendersDueSelected}
                        />
                        {(this.state.finishing.finalRendersDueSelected === 'By date') && (
                            <DatePicker
                                className={s.finishingWorkPriorityDatePicker}
                                onChange={e => this.handleFinishingFinalRendersDueDateChange(e)}
                                label="Delivery date"
                                value={
                                    this.state.finishing.finalRendersDueDate && typeof this.state.finishing.finalRendersDueDate.isValid !== 'undefined'
                                        ? this.state.finishing.finalRendersDueDate.isValid()
                                            ? this.state.finishing.finalRendersDueDate
                                            : moment()
                                        : moment(this.state.finishing.finalRendersDueDate).isValid()
                                            ? moment(this.state.finishing.finalRendersDueDate)
                                            : moment()
                                }
                            />
                        )}
                    </Section>
                </Col>

            </Row>
        );
    }

    designWorkPriority() {
        return (
            <Section noSeparator={true} title="Priority">
                <Row>
                    <Col size={6}>
                        <Select
                            value={this.state.designWork.prioritySelected}
                            onChange={e => this.handleElementChange(e, 'designWork', 'prioritySelected')}
                            options={this.state.designWork.priorityOptions}
                        />
                    </Col>
                    <Col size={6}>
                        {(this.state.designWork.prioritySelected === 'By date') && (
                            <DatePicker
                                className={s.designWorkPriorityDatePicker}
                                onChange={e => this.handlePriorityDateChange(e)}
                                label="Delivery date"
                                value={
                                    this.state.designWork.priorityDate && typeof this.state.designWork.priorityDate.isValid !== 'undefined'
                                        ? this.state.designWork.priorityDate.isValid()
                                            ? this.state.designWork.priorityDate
                                            : moment()
                                        : moment(this.state.designWork.priorityDate).isValid()
                                            ? moment(this.state.designWork.priorityDate)
                                            : moment()
                                }
                            />
                        )}
                    </Col>
                </Row>
            </Section>
        );
    }

    commonRefFiles() {
        return (
            <Section title="Reference files">
                <input type="file" multiple="multiple" placeholder="Files to upload" />
            </Section>
        );
    }

    commonResolution(title) {
        return (
            <Section title={title}>
                <Row>
                    <Col size={12}>
                        <Select
                            onChange={e => this.handleElementChange(e, 'common', 'resolutionSelected')}
                            value={this.state.common.resolutionSelected}
                            options={
                                this.state.common.resolutionOptions.length <= 0
                                    ? [{ value: 1, label: 'Loading...' }]
                                    : this.state.common.resolutionOptions
                            }
                        />
                    </Col>
                </Row>
                <Row>
                    <Col size={12}>
                        <TextArea
                            className={s.resolutionNotesFieldGroup}
                            onChange={e => this.handleElementChange(e, 'common', 'resolutionNotes')}
                            label="Resolution notes..."
                            width={1152}
                            height={96}
                        />
                    </Col>
                </Row>
            </Section>
        );
    }

    commonNote() {
        return (
            <Section title="Notes">
                <TextArea
                    onChange={e =>this.handleElementChange(e, 'common', 'notes')}
                    value={this.state.common.notes}
                    label="Notes..."
                    width={1152}
                    height={128}
                />
            </Section>
        );
    }

    render() {
        const isNotDraftRequest =
            this.props.requestId &&
            typeof this.state.requestStatus !== 'undefined' && this.state.requestStatus !== 'Draft'
                ? true
                : false;

        return (
            <Layout>
                {(() => {
                    if (this.state.isFetchRequestLoading === true) {
                        return (
                            <LoadingShade background="rgba(247, 247, 247, 0.9)">
                                <LoadingSpinner size={64} color="#5A4D3F" />
                            </LoadingShade>
                        );
                    }
                })()}
                <Section title="Create new graphics request" noSeparator={true}>
                    <Row alignContent="center" alignItems="center">
                        <Col size={12}>
                            <Select
                                value={this.state.requestTypeSelected}
                                onChange={this.handleRequestTypeChange.bind(this)}
                                options={this.state.requestTypeOptions}
                            />
                        </Col>
                    </Row>
                    <br />
                    <br />
                </Section>

                {(() => {
                    // Mount ProjectPicker if new, if not, then if defaultProject is given from api
                    if (!this.props.requestId || (this.props.requestId && this.state.defaultProject)) {
                        return (
                            <ProjectPicker
                                ref="projectPicker"
                                noSeparator={true}
                                showVersion={true}
                                levelRequired={3}
                                showVersion={false}
                                title="Select project"
                                defaultToOpenProjects={true}
                                defaultValue={this.state.defaultProject}
                                onChange={this.handleSelectProject}
                                readOnly={isNotDraftRequest}
                            />
                        );
                    }
                })()}

                {(this.state.selectedProject.projectId !== null && this.state.selectedProject.campaignId !== null) && (
                    <Section title="Associated People">
                        {(this.state.loadingAssociatedPeople) && (
                            <LoadingBar label="Loading people..." />
                        ) || (
                            <Row justifyContent="flex-start">
                                {this.state.associatedPeople.map((person, personIndex) => {
                                    return (
                                        <Col flex="0 1 auto" key={`person-${person.id}`}>
                                            <Person
                                                label={person.role}
                                                name={person.name}
                                            />
                                        </Col>
                                    );
                                })}
                            </Row>
                        )}
                    </Section>
                )}

                {
                    this.state.requestTypeSelected === '1'
                        ? this.designWorkPortion()
                        : this.finishingPortion()
                }

                <Section noSeparator={true}>
                    <Row removeGutter={true} alignItems="flex-end">
                        <Col size={8}>
                            {
                                this.state.requestTypeSelected === '1'
                                    ? this.designWorkPriority()
                                    : this.finishingPriority()
                            }
                        </Col>
                        <Col size={4}>
                            <Button
                                className={s.submitGraphicsRequestButton}
                                onClick={e => this.handleRequestSubmission(e)}
                                icon={{
                                    size: 'large',
                                    background: 'orange',
                                    element:
                                        <IconSendSubmit
                                            width={25}
                                            height={26}
                                            marginLeft={-13}
                                            marginTop={-13}
                                        />
                                }}
                                label={{
                                    text: this.state.isRequestUploading
                                        ? 'Saving...'
                                        : 'Save and submit to graphics team',
                                    size: 'small',
                                    color: 'orange',
                                    onLeft: true
                                }}
                                float="right"
                                disabled={this.state.isRequestUploading}
                            />
                        </Col>
                    </Row>
                </Section>
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    return {
        header: state.header
    };
}

export default connect(mapStateToProps)(PageGraphicsRequest);
