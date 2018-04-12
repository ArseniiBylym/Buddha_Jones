// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import * as projectBoardActions from './../../../actions/ProjectBoard';
import { CSSTransitionGroup } from 'react-transition-group';
import { Paragraph } from './../../../components/Content';
import { Button, ButtonClose } from './../../../components/Button';
import { DropdownContainer, OptionsList } from './../../../components/Form';
import { statuses } from '../../../helpers/status';
import {
    getCustomerCreativeExecutives,
    getSelectedCustomerCreativeExecutiveDetails,
    getSelectedCustomerCreativeExecutiveContactInfo
} from './CreativeExecutiveSelectors';

// Styles
const s = require('./CreativeExecutive.css');
import { IconEmail, IconPhone, IconBriefcase, IconLightbulb } from './../../../components/Icons';

// Props
const creativeExecutiveProps = {
    projectId: PropTypes.number.isRequired,
    campaignId: PropTypes.number.isRequired,
    editable: PropTypes.bool,
    executiveId: PropTypes.number,
};

// Defaults
const creativeExecutiveDefaultProps = {
    editable: false,
    executiveId: null,
    allExecutives: [],
};

// Deriviations
const mapStateToProps = (state, ownProps) => {
    return {
        allExecutives: getCustomerCreativeExecutives(state, ownProps),
        executive: getSelectedCustomerCreativeExecutiveDetails(state, ownProps),
        executiveContactInfo: getSelectedCustomerCreativeExecutiveContactInfo(state, ownProps),
    };
};

// Actions
const mapDispatchToProps = (dispatch) => {
    return {
        actionsProjectBoard: bindActionCreators(projectBoardActions, dispatch)
    };
};

// Component
class CreativeExecutiveComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            changing: statuses.default,
            showDetails: false
        };

        this.executiveDropdown = null;
        this.referenceExecutiveDropdown = (ref) => this.executiveDropdown = ref;
    }

    render() {
        return (
            <div className={s.executiveContainer}>

                {this.renderInfoButton()}

                {(this.props.editable) && this.renderEditable() || this.renderViewable()}

                {(this.renderDetails())}

            </div>
        );
    }

    renderInfoButton() {
        return this.props.executive || this.state.showDetails ? (
            <Button
                className={s.showDetailsButton}
                onClick={e => this.handleDetailsToggle()}
                label={{
                    text: 'Contact info',
                    color: 'blue',
                    size: 'small',
                    onLeft: true,
                }}
                icon={{
                    size: 'small',
                    background: 'white',
                    element:
                        <IconLightbulb
                            width={12}
                            height={16}
                            marginLeft={-6}
                            marginTop={-8}
                        />
                }}
            />
        ) : null;
    }

    renderDetails() {
        const { executive, executiveId } = this.props;

        return (
            <CSSTransitionGroup
                className={s.detailsContainer}
                component="div"
                transitionName="fade"
                transitionAppear={true}
                transitionEnter={true}
                transitionLeave={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={600}
            >
                {(this.state.showDetails && executive && typeof executive.name !== 'undefined') && (
                    <div key="details" className={s.details}>

                        <h3>{executive.name}</h3>

                        {(this.props.executiveContactInfo.length > 0) && (
                            <ul>
                                {this.props.executiveContactInfo.map((info) => (
                                    <li key={`value-${info.key}`}>
                                        {(info.type === 'email') && (
                                            <IconEmail width={21} height={17} />
                                        ) || (info.type === 'address') && (
                                            <IconBriefcase width={23} height={20} />
                                        ) || (info.type === 'phone') && (
                                            <IconPhone width={20} height={20} />
                                        )}
                                        {(info.type === 'email') && (
                                            <a href={`mailto:${info.value}`}>{info.value}</a>
                                        ) || (
                                            <p>{info.value}</p>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <ButtonClose
                            className={s.closeDetailsButton}
                            onClick={e => this.handleDetailsToggle()}
                            tooltipText="Close executive's details"
                            tooltipOn="left"
                            label={null}
                        />

                    </div>
                )}
            </CSSTransitionGroup>
        );
    }

    renderViewable() {
        const { executive, executiveId, allExecutives } = this.props;

        return (
            <Paragraph
                className={classNames(s.creativeExecutiveName, {
                    [s.bold]: executive !== null
                })}
                align="right"
                type={allExecutives.length > 0 ? 'default' : 'dim'}
            >
                {
                    allExecutives.length > 0
                        ? executive !== null
                            ? 'Creative executive: ' + executive.name
                            : 'No creative executive assigned'
                        : 'Customer has no creative executives'
                }
            </Paragraph>
        );
    }

    renderEditable() {
        const { executive, executiveId, allExecutives } = this.props;

        return (
            <DropdownContainer
                ref={this.referenceExecutiveDropdown}
                label={
                    this.state.changing === statuses.error
                        ? 'Could not change assigned executive, try again'
                        : this.state.changing === statuses.saving
                            ? 'Changing assigned executive...'
                            : executive ? 'Creative executive' : 'Assign creative executive'
                }
                value={this.state.changing === statuses.default && executive ? executive.name : ''}
                align="default"
            >
                <OptionsList
                    onChange={e => this.handleExecutiveChange(e)}
                    label="Select creative executive"
                    value={executive ? executive.id : 0}
                    options={[
                        ...allExecutives.map((exec) => ({
                            value: exec.id,
                            label: exec.name,
                        })),
                        ...(executive ? [{ value: 'separator', label: '------' }] : []),
                        { value: null, label: executive ? 'Deselect creative executive' : 'No creative executive' },
                    ]}
                />
            </DropdownContainer>
        );
    }

    handleDetailsToggle() {
        this.setState({
            showDetails: !this.state.showDetails
        });
    }

    handleExecutiveChange(e) {
        this.setState({
            changing: statuses.saving
        });

        this.props.actionsProjectBoard.changeCampaignsCreativeExecutive(
            this.props.projectId,
            this.props.campaignId,
            e.value
        ).then(() => {
            this.setState({
                changing: statuses.default
            });
        }).catch((error) => {
            this.setState({
                changing: statuses.error
            });
        });

        if (this.executiveDropdown && typeof this.executiveDropdown.closeDropdown === 'function') {
            this.executiveDropdown.closeDropdown();
        }
    }

    /*
    render() {
        {(() => {
            if (campaign.id === this.state.editing.creativeExecutive.campaignId) {
                // Save exec button
                let saveExecButton = {
                    label: this.state.editing.creativeExecutive.id === 0
                        ? 'Create new creative executive'
                        : 'Save creative executive\'s changes',
                    color: 'blue'
                };
                if (this.state.editing.creativeExecutive.saving) {
                    saveExecButton = {
                        label: 'Saving creative executive',
                        color: 'black'
                    };
                }
                if (this.state.editing.creativeExecutive.error) {
                    saveExecButton = {
                        label: 'Executive\'s name is required',
                        color: 'orange'
                    };
                }

                // Render
                return (
                    <Row className={s.campaignCreativeExecutive} removeMargins={true}>
                        <Col>
                            <Dropdown
                                onChange={e => this.handleCreativeExecutiveChange(e)}
                                options={this.state.creativeExecutives.map((exec, execIndex) => {
                                    return {
                                        value: exec.id,
                                        label: exec.name
                                    };
                                })}
                                selected={{
                                    value: this.state.editing.creativeExecutive.id,
                                    label: this.state.editing.creativeExecutive.name
                                }}
                                label="Select creative executive"
                                type="oneline"
                            />
                        </Col>
                    </Row>
                );
            } else if (creativeExec !== null) {
                // Info
                let creativeExecInfo = [];

                // Creative exec row class name
                let creativeExecClassName = s.campaignCreativeExecutive;
                creativeExecClassName += creativeExecInfo.length > 0 ? ' ' + s.expandable : '';
                creativeExecClassName += campaign.showCreativeExecutiveInfo === true ? ' ' + s.showExecutiveInfo : '';

                // Render
                return (
                    <Row className={creativeExecClassName} removeMargins={true}>
                        <Col>
                            <h4
                                onClick={e => this.handleCreativeExecutiveInfoToggle(campaign.id)
                                }
                            >
                                <span>Creative executive: </span>
                                {creativeExec.name}
                            </h4>
                            <Button
                                className={s.execInfoToggleButton}
                                onClick={e => this.handleCreativeExecutiveInfoToggle(campaign.id)}
                                tooltip={{
                                    text: campaign.showCreativeExecutiveInfo === false
                                        ? 'Show contact info'
                                        : 'Hide contact info',
                                    on: 'top'
                                }}
                                icon={{
                                    element:
                                        <IconLightbulb
                                            width={12}
                                            marginLeft={-6}
                                            height={16}
                                            marginTop={-8}
                                        />,
                                    size: 'small',
                                    background: 'white'
                                }}
                            />
                            <ul className={s.creativeExecInfo}>
                                {creativeExecInfo}
                                <li className={s.creativeExecEdit}>
                                    <Button
                                        onClick={e => this.handleCreativeExecutiveInfoEdit(
                                            e, campaign.id, creativeExec
                                        )}
                                        label={{
                                            text: 'Edit creative executive',
                                            size: 'small',
                                            color: 'blue',
                                            onLeft: false
                                        }}
                                        icon={{
                                            element:
                                                <IconTickBlue
                                                    width={12}
                                                    marginLeft={-6}
                                                    height={9}
                                                    marginTop={-5}
                                                />,
                                            size: 'small',
                                            background: 'white'
                                        }}
                                    />
                                </li>
                            </ul>
                        </Col>
                    </Row>
                );
            } else {
                return (
                    <Row className={s.campaignCreativeExecutive} removeMargins={true}>
                        <Col>
                            <p>No creative executive assigned.</p>
                        </Col>
                        <Button
                            className={s.campaignCreativeExecutiveAssignButton}
                            onClick={e => this.handleCreativeExecutiveInfoEdit(
                                e, campaign.id
                            )}
                            tooltip={{
                                text: 'Assign creative executive',
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
                    </Row>
                );
            }
        })()}
    }
    */
}

CreativeExecutiveComponent.propTypes = creativeExecutiveProps;
const CreativeExecutive = connect(mapStateToProps, mapDispatchToProps)(CreativeExecutiveComponent);
CreativeExecutive.defaultProps = creativeExecutiveDefaultProps;

export default CreativeExecutive;
