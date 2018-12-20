import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { toNumber as _toNumber, merge as _merge, isNil as _isNil, has as _has } from 'lodash';
import { printDateAsFullYear, printDateAsYeardMonthDateTime, printDateAsTimeAgo } from './../../../helpers/date';
import history from './../../../core/history';
import * as actionsHeader from './../../../actions/Header';
import * as actionsProjectBoard from './../../../actions/ProjectBoard';
import { getSelectedProject, getSelectedProjectCampaignsIds } from './../../../actions/ProjectBoardSelectors';
import * as actionsProjectsVersions from './../../../actions/ProjectsVersions';
import * as actionsCustomers from './../../../actions/Customers';
import { Section, Row, Col, Accordion } from './../../../components/Section';
import { LoadingSpinner, LoadingIndicator } from './../../../components/Loaders';
import { Layout, HeaderSection } from './../../../components/Layout';
import { Paragraph } from './../../../components/Content';
import { Button, ButtonBack, ButtonEdit } from './../../../components/Button';
import {
    Input,
    Radio,
    TextArea,
    Dropdown,
    DropdownContainer,
    Counter,
    OptionsList,
    Select,
} from './../../../components/Form';
import { Table, TableRow } from './../../../components/Table';
import {
    CommentForm,
    ClientsFilter,
    PeoplePicker,
    CampaignPicker,
    SpotPicker,
    Person,
} from './../../../components/Buddha';
import { DatePicker } from '../../../components/Calendar';
import { ChangesLog, Campaign } from '.';
import { statuses } from './../../../helpers/status';

// Styles
import s from './ProjectBoard.css';
import {
    IconLightbulb,
    IconEmail,
    IconPhone,
    IconBriefcase,
    IconPlusBlue,
    IconCheckmarkGreen,
    IconTickBlue,
    IconArrowLeftYellow,
    IconArrowRightYellow,
} from './../../../components/Icons';

// Deriviations
const mapStateToProps = state => {
    return {
        header: state.header,
        notifications: state.notifications,
        selectedProject: getSelectedProject(state),
        selectedProjectCampaignIds: getSelectedProjectCampaignsIds(state),
        projectsVersions: state.projectsVersions,
    };
};

// Actions
const mapDispatchToProps = dispatch => {
    return {
        actionsProjectBoard: bindActionCreators(actionsProjectBoard, dispatch),
        actionsHeader: bindActionCreators(actionsHeader, dispatch),
        actionsProjectsVersions: bindActionCreators(actionsProjectsVersions, dispatch),
        actionsCustomers: bindActionCreators(actionsCustomers, dispatch),
    };
};

// Component
class PageProjectBoard extends React.Component {
    constructor(props, context) {
        super(props, context);

        const now = new Date();
        let tomorrow = new Date(now);
        tomorrow.setDate(now.getDate() + 1);

        this.state = {
            notes: {
                savedValue: '',
                editable: false,
                status: statuses.default,
            },
            newCampaignCreateStatus: statuses.default,

            projectCoreEditable: false,
            projectId: typeof props.projectId !== 'undefined' && props.projectId ? _toNumber(props.projectId) : null,
            projectName: typeof props.projectName !== 'undefined' && props.projectName ? props.projectName : '',
            customerId: typeof props.clientId !== 'undefined' && props.clientId ? _toNumber(props.clientId) : null,
            customerName: typeof props.clientName !== 'undefined' && props.clientName ? props.clientName : '',
            customerCreativeExecutives: [],
            creativeExecutives: [
                {
                    id: 0,
                    name: 'Create new creative executive',
                },
                {
                    id: 1,
                    name: 'Michael Jones',
                    address: '1156 High Street Santa Cruz, CA 95064',
                    email: 'micheal.jones@warnerbros.com',
                    phone: '(323) 469-1743',
                },
            ],
            savingCampaign: false,
            editing: {
                creativeExecutive: {
                    error: false,
                    adding: false,
                    saving: false,
                    campaignId: undefined,
                    id: undefined,
                    name: '',
                    phone: '',
                    email: '',
                    address: '',
                },
            },
            campaigns: [],
            history: [],
            teams: {
                creative: {
                    options: [
                        { value: 1, label: 'John Doe' },
                        { value: 2, label: 'John Smith' },
                        { value: 3, label: 'Adam Smith' },
                        { value: 4, label: 'Joe Smith' },
                        { value: 5, label: 'Jonas Smith' },
                    ],
                    leadProducer: {
                        id: 1,
                        name: 'John Doe',
                    },
                    producer: {
                        id: 2,
                        name: 'John Smith',
                    },
                    associateProducer: {
                        id: 3,
                        name: 'Adam Smith',
                    },
                    creativeManager: {
                        id: 4,
                        name: 'Joe Smith',
                    },
                    creativeCoordinator: {
                        id: 5,
                        name: 'Jonas Smith',
                    },
                },
                editorial: {
                    startDate: new Date('2016-08-02T12:00:00Z'),
                    version1Deadline: new Date('2016-08-14T12:00:00Z'),
                    deliveryDate: new Date('2016-08-22T12:00:00Z'),
                    requestedEditor: {
                        id: 20,
                        name: 'Fred "FG" Gago',
                    },
                    assignedEditor: {
                        id: undefined,
                        name: undefined,
                    },
                    notes: '',
                },
                finance: {
                    notes: '',
                    requestedBudget: undefined,
                    assignedbudget: undefined,
                    specWork: '',
                },
                graphics: {
                    requestedArtDirector: {
                        id: 0,
                        name: 'Art director',
                    },
                    assignedArtDirector: {
                        id: undefined,
                        name: undefined,
                    },
                    requestedDesigner: {
                        id: 0,
                        name: 'Graphics designer',
                    },
                    assignedDesigner: {
                        id: undefined,
                        name: undefined,
                    },
                    notes: '',
                },
                writing: {
                    assignedWriters: [],
                    notes: '',
                },
                music: {
                    assignedMusicians: [],
                    contact: '',
                    notes: '',
                },
            },
            meetings: {
                create: {
                    error: false,
                    adding: false,
                    saving: false,
                    date: tomorrow,
                    creativeCoordinator: {
                        id: null,
                        name: 'Assign coordinator',
                    },
                    notes: '',
                },
                list: [
                    {
                        id: 1,
                        date: new Date('2016-11-03T12:00:00Z'),
                        creativeCoordinator: {
                            id: 1,
                            name: 'John Doe',
                        },
                        notes: 'Creative kick-off meeting',
                    },
                ],
            },
        };

        this.componentIsMounted = true;
    }

    componentDidMount() {
        // Load project details
        this.fetchProjectDetails();

        // Load all versions
        this.fetchAllVersions();

        // Load customer's creative executives
        this.fetchCustomerDetails();

        // Scroll to top
        window.scrollTo(0, 0);

        // Prepare page title
        this.setPageTitle();
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    setPageTitle() {
        // Prepare page title
        let pageTitle = null;
        let pageSubTitle = null;
        if (this.props.projectId) {
            if (this.props.selectedProject && this.props.selectedProject.projectCoreEditable) {
                pageTitle = 'Edit project';
            } else if (this.props.projectName) {
                pageTitle = this.props.projectName;

                if (this.props.clientName && this.props.clientName !== 'null') {
                    pageSubTitle = this.props.clientName;
                }
            } else {
                pageTitle = 'Project #' + this.props.projectId;
            }
        } else {
            pageTitle = 'Define new project';
        }

        // Set new header
        this.props.actionsHeader.setNewHeader(
            {
                title: pageTitle,
                subTitle: pageSubTitle,
            },
            [<ButtonBack onClick={e => this.handleBackToBoardNavigation(e)} label="Back to projects board" />]
        );
    }

    fetchProjectDetails() {
        if (!_isNil(this.props.projectId) && this.props.projectId) {
            const projectId = _toNumber(this.props.projectId);

            if (!isNaN(projectId) && projectId !== null) {
                this.props.actionsProjectBoard
                    .initializeProject(
                        projectId,
                        !_isNil(this.props.projectName) && this.props.projectName ? this.props.projectName : null,
                        !_isNil(this.props.clientId) && this.props.clientId ? _toNumber(this.props.clientId) : null,
                        !_isNil(this.props.clientName) && this.props.clientName ? this.props.clientName : null
                    )
                    .catch(() => {
                        // TODO fix this kind of error handling all over the project
                        setTimeout(() => {
                            this.fetchProjectDetails();
                        }, 2048);
                    });
            }
        }
    }

    fetchAllVersions() {
        this.props.actionsProjectsVersions.fetchAllVersions().catch(error => {
            setTimeout(() => {
                if (this.componentIsMounted) {
                    this.fetchAllVersions();
                }
            }, 2048);
        });
    }

    fetchCustomerDetails() {
        if (this.props.clientId) {
            this.props.actionsCustomers.fetchCustomerDetails(_toNumber(this.props.clientId)).catch(error => {
                setTimeout(() => {
                    if (this.componentIsMounted) {
                        this.fetchCustomerDetails();
                    }
                }, 2048);
            });
        }
    }

    fetchProjectHistory() {
        if (this.props.projectId) {
            this.props.actionsProjectBoard.fetchProjectHistory(_toNumber(this.props.projectId)).catch(error => {
                setTimeout(() => {
                    if (this.componentIsMounted) {
                        this.fetchProjectHistory();
                    }
                }, 1024);
            });
        }
    }

    handleBackToBoardNavigation(e) {
        const page =
            typeof this.props.fromProjectsPage !== 'undefined' && this.props.fromProjectsPage
                ? _toNumber(this.props.fromProjectsPage)
                : null;

        history.push('/projects/' + (page && !isNaN(page) ? page : '1'));
    }

    handleCreativeExecutiveInfoToggle(campaignId) {
        if (typeof campaignId !== 'undefined') {
            // Iterate campaigns to find the one
            let campaignIndex;
            for (let i = 0; i < this.state.campaigns.length; i++) {
                const campaign = this.state.campaigns[i];
                if (campaign.id === campaignId) {
                    campaignIndex = i;
                    break;
                }
            }

            // Update state
            if (typeof campaignIndex !== 'undefined') {
                this.setState(
                    Object.assign({}, this.state, {
                        campaigns: this.state.campaigns
                            .slice(0, campaignIndex)
                            .concat([
                                Object.assign({}, this.state.campaigns[campaignIndex], {
                                    showCreativeExecutiveInfo: !this.state.campaigns[campaignIndex]
                                        .showCreativeExecutiveInfo,
                                }),
                            ])
                            .concat(this.state.campaigns.slice(campaignIndex + 1)),
                    })
                );
            }
        }
    }

    handleCreativeExecutiveInfoEdit(e, campaignId, exec) {
        // Check if exec is defined
        let execEdit = Object.assign({}, this.state.editing.creativeExecutive, {
            error: false,
            saving: false,
            adding: true,
        });

        // When exec is defined
        if (typeof exec !== 'undefined') {
            execEdit = Object.assign({}, execEdit, {
                id: exec.id,
                name: exec.name,
                phone: typeof exec.phone !== 'undefined' ? exec.phone : '',
                email: typeof exec.email !== 'undefined' ? exec.email : '',
                address: typeof exec.address !== 'undefined' ? exec.address : '',
            });
        }

        // When campaign id is defined
        if (typeof campaignId !== 'undefined') {
            execEdit = Object.assign({}, execEdit, {
                campaignId: campaignId,
            });
        }

        // Update state
        this.setState(
            Object.assign({}, this.state, {
                editing: Object.assign({}, this.state.editing, {
                    creativeExecutive: execEdit,
                }),
            })
        );
    }

    handleCreativeExecutiveChange(selected, campaignIndex) {
        if (
            typeof selected !== 'undefined' &&
            typeof selected.value !== 'undefined' &&
            typeof selected.label !== 'undefined'
        ) {
            // Values
            let name = '';
            let phone = '';
            let email = '';
            let address = '';

            // Find exec
            if (selected.value !== 0) {
                this.state.creativeExecutives.some(exec => {
                    if (exec.id === selected.value) {
                        name = exec.name;
                        phone = exec.phone;
                        email = exec.email;
                        address = exec.address;
                        return true;
                    }
                });
            }

            // Determine values
            let execEdit = Object.assign({}, this.state.editing.creativeExecutive, {
                id: selected.value,
                name: name,
                phone: phone,
                email: email,
                address: address,
            });

            // Update state
            this.setState(
                Object.assign({}, this.state, {
                    editing: Object.assign({}, this.state.editing, {
                        creativeExecutive: Object.assign({}, this.state.editing.creativeExecutive, execEdit),
                    }),
                })
            );
        }
    }

    handleCreativeExecutiveInfoEditChange(e, field) {
        if (
            typeof e !== 'undefined' &&
            typeof e.target !== 'undefined' &&
            typeof e.target.value !== 'undefined' &&
            typeof field !== 'undefined'
        ) {
            this.setState(
                Object.assign({}, this.state, {
                    editing: Object.assign({}, this.state.editing, {
                        creativeExecutive: Object.assign({}, this.state.editing.creativeExecutive, {
                            [field]: e.target.value,
                        }),
                    }),
                })
            );
        }
    }

    handleCreativeExecutiveInfoChangesSave(e, campaignIndex) {
        // Creative exec
        let creativeExec = {
            id:
                typeof this.state.editing.creativeExecutive.id !== 'undefined'
                    ? this.state.editing.creativeExecutive.id
                    : 0,
            name: this.state.editing.creativeExecutive.name.trim(),
            phone: this.state.editing.creativeExecutive.phone.trim(),
            email: this.state.editing.creativeExecutive.email.trim(),
            address: this.state.editing.creativeExecutive.address.trim(),
        };

        // Indicate saving
        this.setState(
            Object.assign({}, this.state, {
                editing: Object.assign({}, this.state.editing, {
                    creativeExecutive: Object.assign({}, this.state.editing.creativeExecutive, {
                        error: false,
                        adding: true,
                        saving: true,
                    }),
                }),
            })
        );

        // Check if name is defined
        if (creativeExec.name !== '') {
            // Simulate API delay
            setTimeout(() => {
                // When new executive needs to be created
                if (creativeExec.id === 0) {
                    // Get id of new creative executive
                    creativeExec = Object.assign({}, creativeExec, {
                        id: this.state.creativeExecutives.length + 1,
                    });

                    // Create new executive and assign it to campaign
                    this.setState(
                        Object.assign({}, this.state, {
                            creativeExecutives: this.state.creativeExecutives.concat([creativeExec]),
                            campaigns:
                                typeof campaignIndex !== 'undefined'
                                    ? this.state.campaigns
                                          .slice(0, campaignIndex)
                                          .concat([
                                              Object.assign({}, this.state.campaigns[campaignIndex], {
                                                  creativeExecutive: creativeExec.id,
                                              }),
                                          ])
                                          .concat(this.state.campaigns.slice(campaignIndex + 1))
                                    : this.state.campaigns,
                            editing: Object.assign({}, this.state.editing, {
                                creativeExecutive: Object.assign({}, this.state.editing.creativeExecutive, {
                                    error: false,
                                    adding: false,
                                    saving: false,
                                    campaignId: undefined,
                                    id: undefined,
                                    name: '',
                                    phone: '',
                                    email: '',
                                    address: '',
                                }),
                            }),
                        })
                    );

                    // TODO: Save new creative executive to the database
                    // TODO: Save change of creative executive in the campaign
                } else {
                    // Get existing executive's index
                    const creativeExecIndex = this.state.creativeExecutives.some((exec, execIndex) => {
                        if (exec.id === creativeExec.id) {
                            return execIndex;
                        }
                    });

                    // Update executive's info
                    this.setState(
                        Object.assign({}, this.state, {
                            creativeExecutives: this.state.creativeExecutives
                                .slice(0, creativeExecIndex)
                                .concat([
                                    Object.assign({}, this.state.creativeExecutives[creativeExecIndex], creativeExec),
                                ])
                                .concat(this.state.creativeExecutives.slice(creativeExecIndex + 1)),
                            campaigns:
                                typeof campaignIndex !== 'undefined'
                                    ? this.state.campaigns
                                          .slice(0, campaignIndex)
                                          .concat([
                                              Object.assign({}, this.state.campaigns[campaignIndex], {
                                                  creativeExecutive: creativeExec.id,
                                              }),
                                          ])
                                          .concat(this.state.campaigns.slice(campaignIndex + 1))
                                    : this.state.campaigns,
                            editing: Object.assign({}, this.state.editing, {
                                creativeExecutive: Object.assign({}, this.state.editing.creativeExecutive, {
                                    error: false,
                                    adding: false,
                                    saving: false,
                                    campaignId: undefined,
                                    id: undefined,
                                    name: '',
                                    phone: '',
                                    email: '',
                                    address: '',
                                }),
                            }),
                        })
                    );

                    // TODO: Update executive's info in the database via API request
                }
            }, 1024);
        } else {
            // Display error
            this.setState(
                Object.assign({}, this.state, {
                    editing: Object.assign({}, this.state.editing, {
                        creativeExecutive: Object.assign({}, this.state.editing.creativeExecutive, {
                            error: true,
                            adding: true,
                            saving: false,
                        }),
                    }),
                })
            );
        }
    }

    addEmptyCampaignToState(campaignId, campaignName) {
        this.setState({
            savingCampaign: false,
            campaigns: this.state.campaigns.concat([
                {
                    id: campaignId,
                    name: campaignName,
                    editable: false,
                    creativeExecutive: null,
                    showCreativeExecutiveInfo: false,
                    manager: [],
                    producer: [],
                    spots: [],
                },
            ]),
        });
    }

    getCampaignIndexById(campaignId) {
        if (typeof campaignId !== 'undefined') {
            if (this.state.campaigns.length > 0) {
                let campaignOfIdIndex = null;
                this.state.campaigns.some((campaign, campaignIndex) => {
                    if (campaign.id === campaignId) {
                        campaignOfIdIndex = campaignIndex;
                        return true;
                    } else {
                        return false;
                    }
                });
                return campaignOfIdIndex;
            }
        }

        return null;
    }

    setCampaignRemovedFromState(campaignId) {
        if (typeof campaignId !== 'undefined') {
            const campaignIndex = this.getCampaignIndexById(campaignId);
            if (campaignIndex !== null) {
                this.setState({
                    campaigns: this.state.campaigns
                        .slice(0, campaignIndex)
                        .concat(this.state.campaigns.slice(campaignIndex + 1)),
                });
            }
        }
    }

    handleSpotSaved(e) {
        if (typeof e !== 'undefined' && typeof e.campaign_id !== 'undefined' && typeof e.spot_id !== 'undefined') {
            // Find campaign
            let campaignIndex = null;
            this.state.campaigns.some((c, cIndex) => {
                if (c.id === e.campaign_id) {
                    campaignIndex = cIndex;
                    return true;
                } else {
                    return false;
                }
            });

            // If campaign was found
            if (campaignIndex !== null) {
                // Create spot object
                let spotObject = {
                    editing: false,
                    id: e.spot_id,
                    name: e.name,
                    notes: e.notes,
                    numberOfRevisions: e.revisions,
                    firstRevisionCost: e.first_revision_cost,
                    graphicsIncluded: e.graphics_revisions === 1 ? true : false,
                    versions: [],
                };

                // For new spot
                if (e.new === true) {
                    // Mark spot as just added
                    spotObject = Object.assign({}, spotObject, {
                        justAdded: true,
                    });

                    // Update state with new spot
                    this.setState({
                        campaigns: this.state.campaigns
                            .slice(0, campaignIndex)
                            .concat([
                                Object.assign({}, this.state.campaigns[campaignIndex], {
                                    spots: this.state.campaigns[campaignIndex].spots.concat(spotObject),
                                }),
                            ])
                            .concat(this.state.campaigns.slice(campaignIndex + 1)),
                    });
                } else {
                    // Find updated spot
                    let spotIndex = null;
                    this.state.campaigns[campaignIndex].spots.some((s, sIndex) => {
                        if (s.id === e.spot_id) {
                            spotIndex = sIndex;
                            return true;
                        } else {
                            return false;
                        }
                    });

                    // If spot was found
                    if (spotIndex !== null) {
                        // Update versions
                        spotObject = Object.assign({}, spotObject, {
                            versions: this.state.campaigns[campaignIndex].spots[spotIndex].versions,
                        });

                        // Update spot already in state
                        this.setState(
                            {
                                campaigns: this.state.campaigns
                                    .slice(0, campaignIndex)
                                    .concat([
                                        Object.assign({}, this.state.campaigns[campaignIndex], {
                                            spots: this.state.campaigns[campaignIndex].spots
                                                .slice(0, spotIndex)
                                                .concat([
                                                    _merge(
                                                        this.state.campaigns[campaignIndex].spots[spotIndex],
                                                        spotObject
                                                    ),
                                                ])
                                                .concat(this.state.campaigns[campaignIndex].spots.slice(spotIndex + 1)),
                                        }),
                                    ])
                                    .concat(this.state.campaigns.slice(campaignIndex + 1)),
                            },
                            () => {
                                this.fetchProjectHistory();
                            }
                        );
                    }
                }
            }
        }
    }

    handleSpotVersionAdded(e) {
        if (typeof e !== 'undefined' && typeof e.version !== 'undefined') {
            // Find campaign
            let campaignIndex = null;
            this.state.campaigns.some((c, cIndex) => {
                if (c.id === e.campaignId) {
                    campaignIndex = cIndex;
                    return true;
                } else {
                    return false;
                }
            });

            // If campaign was found
            if (campaignIndex !== null) {
                // Find updated spot
                let spotIndex = null;
                this.state.campaigns[campaignIndex].spots.some((s, sIndex) => {
                    if (s.id === e.spotId) {
                        spotIndex = sIndex;
                        return true;
                    } else {
                        return false;
                    }
                });

                // If spot was found
                if (spotIndex !== null) {
                    // Update state with new version
                    this.setState(
                        {
                            campaigns: this.state.campaigns
                                .slice(0, campaignIndex)
                                .concat([
                                    Object.assign({}, this.state.campaigns[campaignIndex], {
                                        spots: this.state.campaigns[campaignIndex].spots
                                            .slice(0, spotIndex)
                                            .concat([
                                                Object.assign(
                                                    {},
                                                    this.state.campaigns[campaignIndex].spots[spotIndex],
                                                    {
                                                        versions: this.state.campaigns[campaignIndex].spots[
                                                            spotIndex
                                                        ].versions.concat([e.version]),
                                                    }
                                                ),
                                            ])
                                            .concat(this.state.campaigns[campaignIndex].spots.slice(spotIndex + 1)),
                                    }),
                                ])
                                .concat(this.state.campaigns.slice(campaignIndex + 1)),
                        },
                        () => {
                            this.fetchProjectHistory();
                        }
                    );
                }
            }
        }
    }

    handleManagementUserAdded(e) {
        if (
            typeof e !== 'undefined' &&
            typeof e.campaignId !== 'undefined' &&
            typeof e.type !== 'undefined' &&
            typeof e.value.id !== 'undefined'
        ) {
            // Find campaign
            let campaignIndex = null;
            this.state.campaigns.some((c, cIndex) => {
                if (c.id === e.campaignId) {
                    campaignIndex = cIndex;
                    return true;
                } else {
                    return false;
                }
            });

            // If campaign was found
            if (campaignIndex !== null) {
                // Update state
                this.setState({
                    campaigns: this.state.campaigns
                        .slice(0, campaignIndex)
                        .concat([
                            Object.assign({}, this.state.campaigns[campaignIndex], {
                                [e.type]: [
                                    {
                                        id: e.value.id,
                                        image: e.value.image,
                                        fullName: e.value.fullname,
                                    },
                                ].concat(this.state.campaigns[campaignIndex][e.type]),
                            }),
                        ])
                        .concat(this.state.campaigns.slice(campaignIndex + 1)),
                });
            }
        }
    }

    handleManagementUserRemoved(e) {
        if (
            typeof e !== 'undefined' &&
            typeof e.campaignId !== 'undefined' &&
            typeof e.type !== 'undefined' &&
            typeof e.userId !== 'undefined'
        ) {
            // Find campaign
            let campaignIndex = null;
            this.state.campaigns.some((c, cIndex) => {
                if (c.id === e.campaignId) {
                    campaignIndex = cIndex;
                    return true;
                } else {
                    return false;
                }
            });

            // If campaign was found
            if (campaignIndex !== null) {
                // Check if there is one or more users
                if (this.state.campaigns[campaignIndex][e.type].length > 1) {
                    // Find user
                    let userIndex = null;
                    this.state.campaigns[campaignIndex][e.type].some((u, uIndex) => {
                        if (u.id === e.userId) {
                            userIndex = uIndex;
                            return true;
                        } else {
                            return false;
                        }
                    });

                    // If user was found
                    if (userIndex !== null) {
                        this.setState({
                            campaigns: this.state.campaigns
                                .slice(0, campaignIndex)
                                .concat([
                                    Object.assign({}, this.state.campaigns[campaignIndex], {
                                        [e.type]: this.state.campaigns[campaignIndex][e.type]
                                            .slice(0, userIndex)
                                            .concat(this.state.campaigns[campaignIndex][e.type].slice(userIndex + 1)),
                                    }),
                                ])
                                .concat(this.state.campaigns.slice(campaignIndex + 1)),
                        });
                    }
                } else {
                    this.setState({
                        campaigns: this.state.campaigns
                            .slice(0, campaignIndex)
                            .concat([
                                Object.assign({}, this.state.campaigns[campaignIndex], {
                                    [e.type]: [],
                                }),
                            ])
                            .concat(this.state.campaigns.slice(campaignIndex + 1)),
                    });
                }
            }
        }
    }

    handleCreativeTeamChange(e, member) {
        if (typeof e !== 'undefined' && typeof e.value !== 'undefined' && typeof member !== 'undefined') {
            this.setState(
                Object.assign({}, this.state, {
                    teams: Object.assign({}, this.state.teams, {
                        creative: Object.assign({}, this.state.teams.creative, {
                            [member]: Object.assign({}, this.state.teams.creative[member], {
                                id: e.value,
                                name: e.label,
                            }),
                        }),
                    }),
                })
            );
        }
    }

    handleEditorialRequesteEditorChange(selected) {
        if (
            typeof selected !== 'undefined' &&
            typeof selected.value !== 'undefined' &&
            typeof selected.label !== 'undefined'
        ) {
            this.setState(
                Object.assign({}, this.state, {
                    teams: Object.assign({}, this.state.teams, {
                        editorial: Object.assign({}, this.state.teams.editorial, {
                            requestedEditor: Object.assign({}, this.state.teams.editorial.requestedEditor, {
                                id: selected.value,
                                name: selected.label,
                            }),
                        }),
                    }),
                })
            );
        }
    }

    handleMeetingCreate(e) {
        this.setState(
            Object.assign({}, this.state, {
                meetings: Object.assign({}, this.state.meetings, {
                    create: Object.assign({}, this.state.meetings.create, {
                        error: false,
                        adding: !this.state.meetings.create.adding,
                        saving: false,
                    }),
                }),
            })
        );
    }

    handleMeetingCoordinatorChange(selected) {
        if (
            typeof selected !== 'undefined' &&
            typeof selected.value !== 'undefined' &&
            typeof selected.label !== 'undefined'
        ) {
            this.setState(
                Object.assign({}, this.state, {
                    meetings: Object.assign({}, this.state.meetings, {
                        create: Object.assign({}, this.state.meetings.create, {
                            creativeCoordinator: Object.assign({}, this.state.meetings.create.creativeCoordinator, {
                                id: selected.value,
                                name: selected.label,
                            }),
                        }),
                    }),
                })
            );
        }
    }

    handleMeetingDateChange(e) {
        if (typeof e !== 'undefined' && typeof e.target !== 'undefined' && typeof e.target.value !== 'undefined') {
            // TODO: Date picker value change
        }
    }

    handleMeetingNotesChange(e) {
        if (typeof e !== 'undefined' && typeof e.target !== 'undefined' && typeof e.target.value !== 'undefined') {
            this.setState(
                Object.assign({}, this.state, {
                    meetings: Object.assign({}, this.state.meetings, {
                        create: Object.assign({}, this.state.meetings.create, {
                            notes: e.target.value,
                        }),
                    }),
                })
            );
        }
    }

    handleMeetingSave(e) {
        // Indicate saving to user
        this.setState(
            Object.assign({}, this.state, {
                meetings: Object.assign({}, this.state.meetings, {
                    create: Object.assign({}, this.state.meetings.create, {
                        adding: true,
                        error: false,
                        saving: true,
                    }),
                }),
            })
        );

        // Data
        const coordinator = this.state.meetings.create.creativeCoordinator;
        const date = this.state.meetings.create.date;
        const notes = this.state.meetings.create.notes;

        // TODO: Remove - only temporary date selector
        const now = new Date();
        let tomorrow = new Date(now);
        tomorrow.setDate(now.getDate() + 1);

        // Check if all data required is provided
        if (typeof coordinator.id !== 'undefined' && coordinator.id !== null && coordinator.id !== '' && date !== '') {
            // Simulate API delay
            setTimeout(() => {
                // New meeting id
                const meetingId = this.state.meetings.list.length + 1;

                // Create new meeting
                this.setState(
                    Object.assign({}, this.state, {
                        meetings: Object.assign({}, this.state.meetings, {
                            create: Object.assign({}, this.state.meetings.create, {
                                error: false,
                                adding: false,
                                saving: false,
                                date: tomorrow,
                                creativeCoordinator: Object.assign({}, this.state.meetings.create.creativeCoordinator, {
                                    id: null,
                                    name: 'Assign coordinator',
                                }),
                                notes: '',
                            }),
                            list: [
                                {
                                    id: meetingId,
                                    creativeCoordinator: {
                                        id: coordinator.id,
                                        name: coordinator.name,
                                    },
                                    date: tomorrow,
                                    notes: notes,
                                },
                            ].concat(this.state.meetings.list),
                        }),
                    })
                );
            }, 1024);
        } else {
            // Display error
            this.setState(
                Object.assign({}, this.state, {
                    meetings: Object.assign({}, this.state.meetings, {
                        create: Object.assign({}, this.state.meetings.create, {
                            adding: true,
                            error: true,
                            saving: false,
                        }),
                    }),
                })
            );
        }
    }

    render() {
        const { selectedProject } = this.props;
        if (selectedProject && selectedProject.loading === true) {
            return this.renderLoader();
        } else if (selectedProject && selectedProject.projectId !== null) {
            return this.renderProject();
        } else {
            return null;
        }
    }

    renderLoader() {
        return (
            <Layout>
                <Row justifyContent="center">
                    <Col width={64}>
                        <br />
                        <br />
                        <LoadingSpinner size={64} />
                    </Col>
                </Row>
            </Layout>
        );
    }

    renderProject() {
        // Destructure
        const { selectedProject, selectedProjectCampaignIds } = this.props;

        // Render
        return (
            <Layout>
                <ChangesLog loading={selectedProject.loading} history={selectedProject.history} />

                <Section
                    title="Description"
                    noSeparator={true}
                    headerElements={[
                        {
                            key: 'edit-note-button',
                            element: (
                                <ButtonEdit
                                    onClick={e => this.handleNotesEditableToggle(e)}
                                    label={this.state.notes.editable ? 'Cancel edit' : 'Edit project description'}
                                    float="right"
                                />
                            ),
                        },
                    ]}
                >
                    <Row>
                        <Col size={9}>
                            <CommentForm
                                onChange={e => this.handleNotesChange(e)}
                                onSubmit={e => this.handleNotesSubmit(e)}
                                value={
                                    this.state.notes.editable
                                        ? this.state.notes.savedValue
                                        : selectedProject.notes || ''
                                }
                                placeholder="Details regarding requested work..."
                                viewOnlyEmptyValueText="Project has no details."
                                viewOnly={this.state.notes.editable === false}
                                status={this.state.notes.status}
                                label="Save note"
                                labelSaving="Saving note"
                                labelSuccess="Saved note"
                                labelError="Could not save note, try again"
                            />
                        </Col>
                        <Col size={3}>
                            <DatePicker
                                type="field"
                                isAmerican={true}
                                label="Release date"
                                value={moment('2018-06-02')}
                            />
                        </Col>
                    </Row>
                </Section>

                <Section
                    title="Campaigns"
                    headerElements={
                        selectedProject.updating ? [{ element: <LoadingIndicator label="Refreshing" /> }] : []
                    }
                >
                    <Row className={s.campaigns}>
                        <Col size={12}>
                            {this.props.selectedProject.campaigns.map((campaign, campaignIndex) => (
                                <Campaign key={'campaign' + campaign.id} campaign={campaign} />
                            ))}

                            <div className={s.newCampaignField} key="new-campaign-fields">
                                <Row removeMargins={true}>
                                    <Col>
                                        <div className={s.newCampaignBox}>
                                            {this.state.newCampaignCreateStatus !== statuses.default && (
                                                <Paragraph
                                                    type={
                                                        this.state.newCampaignCreateStatus === statuses.saving
                                                            ? 'blue'
                                                            : this.state.newCampaignCreateStatus === statuses.error
                                                                ? 'alert'
                                                                : 'default'
                                                    }
                                                >
                                                    {this.state.newCampaignCreateStatus === statuses.saving
                                                        ? 'Saving new campaign...'
                                                        : this.state.newCampaignCreateStatus === statuses.error
                                                            ? 'Could not create new campaign, try again'
                                                            : 'Campaign added to project'}
                                                </Paragraph>
                                            )}
                                            {this.state.newCampaignCreateStatus !== statuses.saving && (
                                                <CampaignPicker
                                                    ref="campaignsPicker"
                                                    align="left"
                                                    label="Add new campaign"
                                                    projectId={selectedProject.projectId}
                                                    onNewCreated={e => this.handleCampaignPicked(e)}
                                                    onChange={e => this.handleCampaignPicked(e)}
                                                    excludeIds={selectedProjectCampaignIds}
                                                />
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Section>

                {/*
                <Section>
                    <Row removeGutter={true}>
                        <Col size={8}>
                            <Section title="Teams" noSeparator={true}>
                                <Accordion
                                    sections={[
                                        {
                                            title: 'Creative team',
                                            content:
                                                <Row doWrap={true}>

                                                    <Col size={6}>
                                                        <Dropdown
                                                            onChange={e => this.handleCreativeTeamChange(e, 'leadProducer')}
                                                            label="Lead producer"
                                                            type="twolines"
                                                            selected={{
                                                                value: this.state.teams.creative.leadProducer.id,
                                                                label: this.state.teams.creative.leadProducer.name
                                                            }}
                                                            options={this.state.teams.creative.options}
                                                        />
                                                        <br />
                                                    </Col>
                                                    <Col size={6}>
                                                        <Dropdown
                                                            onChange={e => this.handleCreativeTeamChange(e, 'producer')}
                                                            label="Producer"
                                                            type="twolines"
                                                            selected={{
                                                                value: this.state.teams.creative.producer.id,
                                                                label: this.state.teams.creative.producer.name
                                                            }}
                                                            options={this.state.teams.creative.options}
                                                        />
                                                        <br />
                                                    </Col>

                                                    <Col size={6}>
                                                        <Dropdown
                                                            onChange={e => this.handleCreativeTeamChange(e, 'associateProducer')}
                                                            label="Associate producer"
                                                            type="twolines"
                                                            selected={{
                                                                value: this.state.teams.creative.associateProducer.id,
                                                                label: this.state.teams.creative.associateProducer.name
                                                            }}
                                                            options={this.state.teams.creative.options}
                                                        />
                                                        <br />
                                                    </Col>
                                                    <Col size={6}>
                                                        <Dropdown
                                                            onChange={e => this.handleCreativeTeamChange(e, 'creativeManager')}
                                                            label="Creative manager"
                                                            type="twolines"
                                                            selected={{
                                                                value: this.state.teams.creative.creativeManager.id,
                                                                label: this.state.teams.creative.creativeManager.name
                                                            }}
                                                            options={this.state.teams.creative.options}
                                                        />
                                                        <br />
                                                    </Col>

                                                    <Col size={6}>
                                                        <Dropdown
                                                            onChange={e => this.handleCreativeTeamChange(e, 'creativeCoordinator')}
                                                            label="Creative coordinator"
                                                            type="twolines"
                                                            selected={{
                                                                value: this.state.teams.creative.creativeCoordinator.id,
                                                                label: this.state.teams.creative.creativeCoordinator.name
                                                            }}
                                                            options={this.state.teams.creative.options}
                                                        />
                                                    </Col>
                                                    <Col size={6}>
                                                    </Col>

                                                </Row>
                                        },
                                        {
                                            title: 'Editorial manager',
                                            content:
                                                <Row doWrap={true}>

                                                    <Col size={6}>
                                                        <Input
                                                            width={768}
                                                            label="Start date"
                                                            value={printDateAsFullYear(this.state.teams.editorial.startDate)}
                                                        />
                                                        <br />
                                                    </Col>
                                                    <Col size={6}>
                                                        <Input
                                                            width={768}
                                                            label="First version deadline"
                                                            value={printDateAsFullYear(this.state.teams.editorial.version1Deadline)}
                                                        />
                                                        <br />
                                                    </Col>

                                                    <Col size={6}>
                                                        <Input
                                                            width={768}
                                                            label="Delivery date"
                                                            value={printDateAsFullYear(this.state.teams.editorial.deliveryDate)}
                                                        />
                                                        <br />
                                                    </Col>
                                                    <Col size={6}>
                                                        <Dropdown
                                                            onChange={e => this.handleEditorialRequesteEditorChange(e)}
                                                            label="Requested editor"
                                                            type="twolines"
                                                            search={{
                                                                label: 'Search editor name or initials...',
                                                                searchViaApi: false
                                                            }}
                                                            options={this.state.editors}
                                                            selected={{
                                                                value: this.state.teams.editorial.requestedEditor.id,
                                                                label: this.state.teams.editorial.requestedEditor.name,
                                                                truncuateLabelTo: 64
                                                            }}
                                                        />
                                                        <br />
                                                    </Col>

                                                    <Col size={12}>
                                                        <TextArea
                                                            width={768}
                                                            height={96}
                                                            label="Additional notes"
                                                            value={this.state.teams.editorial.notes}
                                                        />
                                                    </Col>

                                                </Row>
                                        },
                                        {
                                            title: 'Finance team',
                                            content:
                                                <Row doWrap={true}>

                                                    <Col size={12}>
                                                        <TextArea
                                                            width={768}
                                                            height={96}
                                                            label="Billing / client notes"
                                                            value={this.state.teams.finance.notes}
                                                        />
                                                        <br />
                                                    </Col>

                                                    <Col size={6}>
                                                        <Input
                                                            width={768}
                                                            value={this.state.teams.finance.requestedBudget}
                                                            label="Requested budget"
                                                        />
                                                        <br />
                                                    </Col>
                                                    <Col size={6}>
                                                        <Input
                                                            width={768}
                                                            value={this.state.teams.finance.assignedbudget}
                                                            label="Assigned budget"
                                                            readOnly={true}
                                                        />
                                                        <br />
                                                    </Col>

                                                    <Col size={12}>
                                                        <TextArea
                                                            width={768}
                                                            height={96}
                                                            label="Spec work"
                                                            value={this.state.teams.finance.specWork}
                                                        />
                                                    </Col>

                                                </Row>
                                        },
                                        {
                                            title: 'Graphics team',
                                            content:
                                                <Row doWrap={true}>
                                                    <Col size={12}>
                                                        <PeoplePicker
                                                            type="Editor"
                                                            label="Select Editors"
                                                        />
                                                    </Col>
                                                    <Col size={12}>
                                                        <PeoplePicker
                                                            label="Requested art director"
                                                            selectMultiple={false}
                                                            type="editors"
                                                        />
                                                        <br />
                                                    </Col>

                                                    <Col size={12}>
                                                        <PeoplePicker
                                                            label="Assigned art director"
                                                            selectMultiple={false}
                                                            type="editors"
                                                        />
                                                        <br />
                                                    </Col>

                                                    <Col size={12}>
                                                        <PeoplePicker
                                                            label="Requested graphic designers"
                                                            selectMultiple={true}
                                                            type="editors"
                                                        />
                                                        <br />
                                                    </Col>

                                                    <Col size={12}>
                                                        <PeoplePicker
                                                            label="Assigned graphic designers"
                                                            selectMultiple={true}
                                                            type="editors"
                                                        />
                                                        <br />
                                                    </Col>

                                                </Row>
                                        },
                                        {
                                            title: 'Writing team',
                                            content:
                                                <Row doWrap={true}>

                                                    <Col size={12}>
                                                        <TextArea
                                                            width={768}
                                                            height={96}
                                                            label="Notes"
                                                            value={this.state.teams.writing.notes}
                                                        />
                                                        <br />
                                                    </Col>

                                                    <Col size={12}>
                                                        <PeoplePicker
                                                            label="Assigned writers"
                                                            selectMultiple={true}
                                                            type="editors"
                                                        />
                                                    </Col>

                                                </Row>
                                        },
                                        {
                                            title: 'Music team',
                                            content:
                                                <Row doWrap={true}>

                                                    <Col size={12}>
                                                        <Input
                                                            width={768}
                                                            label="Music contact"
                                                            value={this.state.teams.music.contact}
                                                        />
                                                        <br />
                                                    </Col>

                                                    <Col size={12}>
                                                        <TextArea
                                                            label="Notes"
                                                            value={this.state.teams.music.notes}
                                                        />
                                                        <br />
                                                    </Col>

                                                    <Col size={12}>
                                                        <PeoplePicker
                                                            label="Assigned musicians"
                                                            selectMultiple={true}
                                                            type="editors"
                                                        />
                                                    </Col>

                                                </Row>
                                        }
                                    ]}
                                    expandedByDefault={true}
                                    onlySingleExpanded={true}
                                />
                            </Section>
                        </Col>
                        <Col size={4}>
                            <Section title="Schedule meeting" noSeparator={true}>
                                {(() => {
                                    if (this.state.meetings.create.adding === true) {
                                        // Save meeting button
                                        let saveMeetingButton = {
                                            label: 'Schedule a meeting',
                                            color: 'blue'
                                        };
                                        if (this.state.meetings.create.saving === true) {
                                            saveMeetingButton = {
                                                label: 'Saving the meeting',
                                                color: 'black'
                                            };
                                        }
                                        if (this.state.meetings.create.error === true) {
                                            saveMeetingButton = {
                                                label: 'Date, time and coordinator are required',
                                                color: 'orange'
                                            };
                                        }

                                        // Render
                                        return (
                                            <div>
                                                <Dropdown
                                                    onChange={e => this.handleMeetingCoordinatorChange(e)}
                                                    label="Coordinator"
                                                    options={this.state.teams.creative.options}
                                                    selected={{
                                                        value: this.state.meetings.create.creativeCoordinator.id,
                                                        label: this.state.meetings.create.creativeCoordinator.name
                                                    }}
                                                />
                                                <br />
                                                <Input
                                                    width={512}
                                                    onChange={e => this.handleMeetingDateChange(e)}
                                                    value={printDateAsYeardMonthDateTime(this.state.meetings.create.date, true)}
                                                    label="Meeting date and time"
                                                />
                                                <br />
                                                <TextArea
                                                    width={512}
                                                    height={96}
                                                    onChange={e => this.handleMeetingNotesChange(e)}
                                                    value={this.state.meetings.create.notes}
                                                    label="Meeting details and notes..."
                                                />
                                                <br />
                                                <Button
                                                    onClick={e => this.handleMeetingSave(e)}
                                                    float="right"
                                                    label={{
                                                        text: saveMeetingButton.label,
                                                        color: saveMeetingButton.color,
                                                        size: 'small',
                                                        onLeft: true
                                                    }}
                                                    icon={{
                                                        element:
                                                            <IconCheckmarkGreen
                                                                width={24}
                                                                marginLeft={-12}
                                                                height={24}
                                                                marginTop={-12}
                                                            />,
                                                        size: 'small',
                                                        background: 'none'
                                                    }}
                                                />
                                                <br style={{ clear: 'both' }} />
                                            </div>
                                        );
                                    }
                                })()}
                                <Button
                                    className={s.meetingCreateButton}
                                    onClick={e => this.handleMeetingCreate(e)}
                                    tooltip={{
                                        text: this.state.meetings.create.adding === true
                                            ? 'Cancel defining new meeting'
                                            : 'Define new meeting',
                                        on: 'top'
                                    }}
                                    icon={{
                                        element:
                                            <IconPlusBlue
                                                width={12}
                                                marginLeft={-6}
                                                height={12}
                                                marginTop={-6}
                                            />,
                                        size: 'small',
                                        background: 'white'
                                    }}
                                />
                            </Section>
                            */}

                {/*
                            <Section title="Meetings">
                                {(() => {
                                    if (this.state.meetings.list.length > 0) {
                                        return (
                                            <div className={s.meetingsList}>
                                                {this.state.meetings.list.map((meeting, meetingIndex) => {
                                                    return (
                                                        <div key={meeting.id}>
                                                            <Row className={s.meetingInfo} removeGutter={true} doWrap={true}>
                                                                <Col size={5}>
                                                                    <p>
                                                                        <span>Coordinator:</span>
                                                                        <br />
                                                                        <strong>{meeting.creativeCoordinator.name}</strong>
                                                                    </p>
                                                                </Col>
                                                                <Col size={7}>
                                                                    <p>
                                                                        <span>Date:</span>
                                                                        <br />
                                                                        <strong>{printDateAsYeardMonthDateTime(meeting.date)}</strong>
                                                                    </p>
                                                                </Col>
                                                            </Row>
                                                            {(() => {
                                                                if (meeting.notes !== null && meeting.notes !== '') {
                                                                    return (
                                                                        <p className={s.meetingNotes}>
                                                                            <span>Notes:</span>
                                                                            <br />
                                                                            <strong>{meeting.notes}</strong>
                                                                        </p>
                                                                    );
                                                                }
                                                            })()}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <p className={s.noMeetings}>No meetings have been scheduled for the project.</p>
                                        );
                                    }
                                })()}
                            </Section>

                        </Col>
                    </Row>
                </Section>
                */}
            </Layout>
        );
    }

    handleNotesEditableToggle(e) {
        this.setState({
            notes: {
                ...this.state.notes,
                editable: !this.state.notes.editable,
                savedValue: !this.state.notes.editable
                    ? this.props.selectedProject.notes || ''
                    : this.state.notes.savedValue,
            },
        });
    }

    handleNotesChange(e) {
        this.setState({
            notes: {
                ...this.state.notes,
                savedValue: e.target.value,
            },
        });
    }

    handleNotesSubmit(e) {
        this.setState({
            notes: {
                ...this.state.notes,
                status: statuses.saving,
            },
        });

        this.props.actionsProjectBoard
            .updateProjectNotesText(this.state.notes.savedValue, this.props.selectedProject.projectId)
            .then(() => {
                this.setState(
                    {
                        notes: {
                            ...this.state.notes,
                            savedValue: '',
                            editable: false,
                            status: statuses.success,
                        },
                    },
                    () => {
                        setTimeout(() => {
                            if (this.componentIsMounted) {
                                this.setState({
                                    notes: {
                                        ...this.state.notes,
                                        status: statuses.default,
                                    },
                                });
                            }
                        }, 2048);
                    }
                );
            })
            .catch(error => {
                this.setState({
                    notes: {
                        ...this.state.notes,
                        status: statuses.error,
                    },
                });
            });
    }

    handleCampaignPicked(e) {
        if (typeof e !== 'undefined' && typeof e.value !== 'undefined' && typeof e.label !== 'undefined') {
            this.setState({
                newCampaignCreateStatus: statuses.saving,
            });

            this.props.actionsProjectBoard
                .createProjectCampaign(this.props.selectedProject.projectId, e.value, e.label.trim())
                .then(() => {
                    this.setState({
                        newCampaignCreateStatus: statuses.default,
                    });
                })
                .catch(error => {
                    this.setState({
                        newCampaignCreateStatus: statuses.error,
                    });
                });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageProjectBoard);
