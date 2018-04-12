import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from './../../../actions/ActionTypes';
import history from './../../../core/history';
import { actionAlertNotify } from './../../../actions/Notifications';
import * as API from './../../../actions/api';
import UserTypePicker from './UserTypePicker';
import { Section, Row, Col } from './../../../components/Section';
import Layout from './../../../components/Layout/Layout';
import Input from './../../../components/Form/Input';
import Radio from './../../../components/Form/Radio';
import Button from './../../../components/Button/Button';
import Select from './../../../components/Form/Select';


// Styles
import s from './ActivityDefinition.css';
import IconSendSubmit from './../../../components/Icons/IconSendSubmit';
import IconArrowLeftYellow from './../../../components/Icons/IconArrowLeftYellow';

// Component
class PageActivityDefinition extends React.Component {
    constructor(props, context) {
        super(props, context);

        // Set header
        this.props.dispatch({
            type: actions.HEADER_SET_ALL,
            payload: {
                title: 'Define activity',
                elements: [
                    <Button
                        onClick={e => history.push('/activity')}
                        label={{
                            text: 'Back to activities list',
                            color: 'white',
                            size: 'large',
                            onLeft: false
                        }}
                        icon={{
                            size: 'small',
                            background: 'none-alt',
                            element:
                                <IconArrowLeftYellow
                                    width={15}
                                    marginLeft={-7}
                                    height={11}
                                    marginTop={-5}
                                />
                        }}
                    />
                ]
            }
        });

        // Set state
        this.state = {
            activityTypeId: '1',
            activityName: '',
            detailsRequired: false,
            userTypeId: null,
            activityTypeLoading: false,
            activityTypeOptions: [],
            activityTypeSaveLoading: false
        };
    }

    componentDidMount() {
        this.setState({
            activityTypeLoading: true
        }, () => {
            API.get(API.ACTIVITY_LEVEL, {})
            .then(response => {
                this.setState({
                    activityTypeLoading: false,
                    activityTypeOptions: response.map((item, index)=>{
                        return {
                            value: item.id,
                            label: item.activityType
                        };
                    })
                });
            }).catch(error => {
                this.setState({
                    activityTypeLoading: false
                });

                this.props.dispatch(
                    actionAlertNotify(
                        'Something went wrong with fetching Activity Type',
                        'Please try again',
                        'error',
                        false,
                        true,
                        false,
                        15
                    )
                );
            });
        });
    }

    handleActivityTypeChange(e) {
        if (typeof e !== 'undefined' && typeof e.target !== 'undefined' && typeof e.target.value !== 'undefined') {
            let stateParam = {
                activityTypeId: e.target.value,
                userTypeId: null,
                detailsRequired: false,
                user_type_id: null
            };
            this.setState(stateParam);
        }
    }

    handleActivityNameChange(e) {
        if (typeof e !== 'undefined' && typeof e.target !== 'undefined' && typeof e.target.value !== 'undefined') {
            this.setState({
                activityName: e.target.value
            });
        }
    }

    handleDetailsRequiredToggle(e) {
        e.preventDefault();
        this.setState({
            detailsRequired: !this.state.detailsRequired
        });
    }

    handleSave(e) {
        if (this.state.activityTypeLoading || this.state.activityTypeOptions.length <= 0) {
            this.props.dispatch(
                actionAlertNotify(
                    'Activity type is required',
                    null,
                    'error',
                    false,
                    true,
                    false,
                    15
                )
            );
            return;
        }

        if (this.state.activityName.trim() === '') {
            this.props.dispatch(
                actionAlertNotify(
                    'Activity name is required',
                    null,
                    'error',
                    false,
                    true,
                    false,
                    15
                )
            );
            return;
        }


        let params = {
            type_id: this.state.activityTypeId,
            name: this.state.activityName,
            user_type_id: this.state.userTypeId
        };

        if (this.state.activityTypeId === '2') {
            params.description_required = (this.state.detailsRequired === true) ? 1 : 0;

            if (params.user_type_id === null) {
                this.props.dispatch(
                    actionAlertNotify(
                        'User Type is required',
                        null,
                        'error',
                        false,
                        true,
                        false,
                        15
                    )
                );
                return;
            }
        } else {
            params.description_required = null;
        }

        this.setState({
            activityTypeSaveLoading: true
        });

        // TODO: Save to database and redirect to activites list
        API.post(API.ACTIVITY, API.makePostData(params))
        .then(response => {
            this.setState({
                activityTypeSaveLoading: false
            });
            history.push('/activity');
        }).catch(error => {
            this.setState({
                activityTypeSaveLoading: false
            });
            this.props.dispatch(
                actionAlertNotify(
                    'Something went wrong with saving activity',
                    'Please try again',
                    'error',
                    false,
                    true,
                    false,
                    15
                )
            );
        });
    }

    handleUserTypePicked(e) {
        //return;
        if (typeof e !== 'undefined' && typeof e.value !== 'undefined' && typeof e.label !== 'undefined') {
            // Indicate campaign is being saved
            this.setState({
                userTypeId: e.value
            });
        }
    }

    render() {
        return (
            <Layout>

                <Section noSeparator={true}>

                    <Row>
                        <Col>
                            <Select
                                onChange={e => this.handleActivityTypeChange(e)}
                                value={this.state.activityTypeId}
                                options={
                                    this.state.activityTypeLoading || this.state.activityTypeOptions.length <= 0
                                        ? [{ value: 1, label: 'Loading...' }]
                                        : this.state.activityTypeOptions
                                }
                            />
                            <br /><br />
                            <Input
                                onChange={e =>this.handleActivityNameChange(e)}
                                value={this.state.activityName}
                                label="Activity name..."
                            />
                        </Col>
                    </Row>

                </Section>

                <Section noSeparator={true}>

                    <Row>
                        <Col size={9}>
                            {this.state.activityTypeId === '2' && (
                                <div>
                                    <Radio
                                        className={s.requiredDescription}
                                        onClick={e => this.handleDetailsRequiredToggle(e)}
                                        value="required"
                                        checked={this.state.detailsRequired}
                                        label="Worker is required to provide activity description"
                                    />
                                    <br /><br /><br />
                                    <UserTypePicker
                                        ref="UserTypePicker"
                                        align="left"
                                        label="User Type"
                                        onChange={(e) => this.handleUserTypePicked(e)}
                                    />
                                </div>
                            )}
                        </Col>
                        <Col size={3}>
                            <Button
                                onClick={e => this.handleSave(e)}
                                float="right"
                                label={{
                                    text: this.state.activityTypeSaveLoading
                                                                    ? 'Defining...'
                                                                    : 'Define new activity',
                                    color: 'orange'
                                }}
                                icon={{
                                    background: 'orange',
                                    size: 'large',
                                    element:
                                        <IconSendSubmit
                                            width={25}
                                            height={26}
                                            marginLeft={-13}
                                            marginTop={-13}
                                        />
                                }}
                                disabled={this.state.activityTypeSaveLoading}
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
        header: state.header,
        notifications: state.notifications
    };
}

export default connect(mapStateToProps)(PageActivityDefinition);
