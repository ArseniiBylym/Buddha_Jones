import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionAlertNotify } from './../../actions/Notifications';
import * as API from './../../actions/api';
import { Row, Col } from './../Section';
import ClientsFilterDropdown from './ClientsFilterDropdown';
import DropdownContainer from './../Form/DropdownContainer';
import Input from './../Form/Input';
import TextArea from './../Form/TextArea';
import Button from './../Button/Button';
import Paragraph from './../Content/Paragraph';

// Component
class CreateProjectPicker extends React.Component {
    constructor(props, state) {
        super(props, state);

        this.client = '';
        this.projectName = '';
        this.notes = '';

        this.state = {
            isUploading: false,
            clientLabel: ''
        };
    }

    handleClientChange(e) {
        this.client = e.value;
        this.setState({
            clientLabel: e.label
        });
    }

    handleProjectNameChange(e) {
        this.projectName = e.target.value;
    }

    handleProjectNoteChange(e) {
        this.notes = e.target.value;
    }

    handleSubmit(e) {
        if (this.client === '' || this.projectName === '') {
            this.props.dispatch(
                actionAlertNotify(
                    'Client and Project title are required',
                    null,
                    'error',
                    false,
                    true,
                    false,
                    15
                )
            );
        } else {
            this.setState({
                isUploading: true
            });

            API.post(API.PROJECT, API.makePostData({
                name: this.projectName,
                customer_id: this.client,
                notes: this.notes
            })).then(response => {
                if (response.status === 1) {
                    this.setState({
                        isUploading: false
                    });
                } else {
                    this.setState({
                        isUploading: false
                    });
                }
                this.props.reloadProject(
                    this.projectName,
                    response.data.project_id,
                    this.client,
                    this.state.clientLabel
                );
            }).catch(error => {
                this.setState({
                    isUploading: false
                });
            });
        }
    }

    render() {
        let { clientLabel } = this.state;

        if (this.state.isUploading) {
            return (
                <Paragraph>Defining...</Paragraph>
            );
        } else {
            return (
                <div>
                     <Row>
                        <Col>
                            <DropdownContainer
                                ref="spotPickerDropdown"
                                minWidth={480}
                                overflowAuto={true}
                                label={this.props.label}
                            >
                                <Row>
                                    <Col>
                                        <ClientsFilterDropdown
                                            align="left"
                                            maxWidth={640}
                                            onChange={e => this.handleClientChange(e)}
                                            label="Create project for client"
                                            truncuateLabelTo={96}
                                        />
                                    </Col>
                                    <Col>
                                        <br />
                                        <Paragraph>
                                            Create new project {clientLabel!=='' && `for client ${clientLabel}`}
                                        </Paragraph>
                                        <br />
                                        <Input
                                            onChange={e => this.handleProjectNameChange(e)}
                                            label="Title..."
                                            autoFocus={true}
                                            width={260}
                                        />
                                        <br />
                                        <TextArea
                                            onChange={e => this.handleProjectNoteChange(e)}
                                            label="Description..."
                                            height={280}
                                            width={260}
                                        />
                                        <Button
                                            onClick={e => this.handleSubmit(e)}
                                            float="right"
                                            label={{
                                                text: 'Define new project',
                                                color: 'orange',
                                                onLeft: true
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </DropdownContainer>
                        </Col>
                    </Row>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        notifications: state.notifications
    };
}

export default connect(mapStateToProps)(CreateProjectPicker);
