// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as projectBoardActions from './../../../actions/ProjectBoard';
import { Row, Col } from './../../../components/Section';
import { Input, TextArea, Toggle, Counter, DropdownContainer, OptionsList } from './../../../components/Form';
import { Button } from './../../../components/Button';
import { revisionsOptions, getSpotFormDetails } from './SpotFormSelectors';
import { statuses } from './../../../helpers/status';

// Statuses
const spotFormStatuses = {
    ...statuses,
    spotNameIsRequired: 'Spot name is required'
};

// Styles
import s from './SpotForm.css';
import { IconCheckmarkGreen } from './../../../components/Icons';

// Props
const spotFormProps = {
    onFormHide: PropTypes.func.isRequired,
    projectId: PropTypes.number.isRequired,
    campaignId: PropTypes.number.isRequired,
    spotId: PropTypes.number,
    removeGutter: PropTypes.bool,
};

// Default props
const spotFormDefaultProps = {
    onFormHide: null,
    spotId: null,
    removeGutter: false,
};

// Deriviations
const mapStateToProps = (state, ownProps) => {
    return {
        revisionsOptions: revisionsOptions,
        spotDetails: getSpotFormDetails(state, ownProps),
    };
};

// Actions
const mapDispatchToProps = (dispatch) => {
    return {
        actionsProjectBoard: bindActionCreators(projectBoardActions, dispatch)
    };
};

// Component
class SpotForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            saving: spotFormStatuses.default,
            spotForm: {
                name: this.props.spotDetails.name,
                notes: this.props.spotDetails.notes,
                numberOfRevisions: this.props.spotDetails.numberOfRevisions,
                numberOfRevisionsText: this.props.spotDetails.numberOfRevisionsText,
                firstRevisionCost: this.props.spotDetails.firstRevisionCost,
                graphicsIncluded: this.props.spotDetails.graphicsIncluded,
            }
        };

        this.revisionsDropdown = null;
        this.referenceRevisionsDropdown = (ref) => this.revisionsDropdown = ref;

        this.componentIsMounted = true;
    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    render() {
        return (
            <Row
                key={'new-spot-fields-' + this.props.campaignId}
                className={s.newSpotFields}
                removeMargins={true}
            >
                <Col removeGutter={this.props.removeGutter}>
                    <hr />

                    {(typeof this.props.spotId === 'undefined' || this.props.spotId === null) && (
                        <p>Creating new spot:</p>
                    )}

                    <Input
                        onChange={e => this.handleSpotNameChange(e)}
                        value={this.state.spotForm.name}
                        label="Spot name..."
                        autoFocus={true}
                    />
                    <br />

                    <TextArea
                        onChange={e => this.handleSpotNotesChange(e)}
                        value={this.state.spotForm.notes}
                        label="Notes..."
                        width={1152}
                        height={64}
                    />
                    <br />

                    <Row>
                        <Col>
                            <DropdownContainer
                                ref={this.referenceRevisionsDropdown}
                                label="Revisions"
                                value={this.state.spotForm.numberOfRevisionsText}
                            >
                                <OptionsList
                                    onChange={e => this.handleRevisionsCountChange(e)}
                                    value={this.state.spotForm.numberOfRevisions}
                                    options={this.props.revisionsOptions}
                                />
                            </DropdownContainer>
                        </Col>
                        <Col>
                            {(this.state.spotForm.numberOfRevisions !== 0) && (
                                <Toggle
                                    align="right"
                                    label="Graphics included:"
                                    labelOnLeft={true}
                                    onChange={e => this.handleGraphicsIncludeToggle(e)}
                                    isRight={this.state.spotForm.graphicsIncluded}
                                    left={{
                                        value: false,
                                        label: 'No'
                                    }}
                                    right={{
                                        value: true,
                                        label: 'Yes'
                                    }}
                                />
                            )}
                        </Col>
                    </Row>
                    <br />

                    {(this.state.spotForm.numberOfRevisions !== 0) && (
                        <Counter
                            onChange={e => this.handleFirstStageCostChange(e)}
                            value={this.state.spotForm.firstRevisionCost}
                            label="First stage cost"
                            fieldMaxWidth={512}
                            multipleOf={0.01}
                            increment={100}
                            decimals={2}
                            showPlusMinus={true}
                            defaultValue={1000}
                            min={0}
                        />
                    )}

                    {(this.state.spotForm.numberOfRevisions !== 0) && (
                        <br />
                    )}

                    <Row>
                        <Col>
                            <Button
                                className={s.cancelSpotFormButton}
                                onClick={e => this.handleSpotFormCancel(e)}
                                label={{
                                    text: 'Cancel',
                                    color: 'orange',
                                    size: 'small'
                                }}
                            />
                        </Col>
                        <Col>
                            <Button
                                onClick={e => this.handleSpotSave(e)}
                                float="right"
                                label={{
                                    text: this.state.saving === spotFormStatuses.default
                                        ? typeof this.props.spotId !== 'undefined' && this.props.spotId
                                            ? 'Save changes'
                                            : 'Create spot'
                                        : this.state.saving === spotFormStatuses.saving
                                            ? typeof this.props.spotId !== 'undefined' && this.props.spotId
                                                ? 'Saving changes...'
                                                : 'Creating spot...'
                                            : this.state.saving === spotFormStatuses.error
                                                ? typeof this.props.spotId !== 'undefined' && this.props.spotId
                                                    ? 'Could not save, try again'
                                                    : 'Could not create, try again'
                                                : this.state.saving === spotFormStatuses.spotNameIsRequired
                                                    ? 'Spot name is required'
                                                    : typeof this.props.spotId !== 'undefined' && this.props.spotId
                                                        ? 'Saved changes'
                                                        : 'Created spot',
                                    color: this.state.saving === spotFormStatuses.default
                                        ? 'blue'
                                        : this.state.saving === spotFormStatuses.saving
                                            ? 'black'
                                            : this.state.saving === spotFormStatuses.success
                                                ? 'green'
                                                : 'orange',
                                    size: 'small',
                                    onLeft: true,
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
                                    background: 'none',
                                }}
                            />
                        </Col>
                    </Row>

                </Col>
            </Row>
        );
    }

    handleSpotNameChange(e) {
        this.setState({
            spotForm: {
                ...this.state.spotForm,
                name: e.target.value,
            }
        });
    }

    handleSpotNotesChange(e) {
        this.setState({
            spotForm: {
                ...this.state.spotForm,
                notes: e.target.value,
            }
        });
    }

    handleRevisionsCountChange(e) {
        this.setState({
            spotForm: {
                ...this.state.spotForm,
                numberOfRevisions: e.value,
                numberOfRevisionsText: e.label,
            }
        });

        if (this.revisionsDropdown) {
            if (typeof this.revisionsDropdown.closeDropdown !== 'undefined') {
                this.revisionsDropdown.closeDropdown();
            }
        }
    }

    handleGraphicsIncludeToggle(value) {
        this.setState({
            spotForm: {
                ...this.state.spotForm,
                graphicsIncluded: value,
            }
        });
    }

    handleFirstStageCostChange(value) {
        this.setState({
            spotForm: {
                ...this.state.spotForm,
                firstRevisionCost: value,
            }
        });
    }

    handleSpotFormCancel() {
        if (this.props.onFormHide) {
            this.props.onFormHide();
        }
    }

    handleSpotSave(e) {
        e.preventDefault();

        if (this.state.saving !== spotFormStatuses.saving) {
            this.setState({
                saving: spotFormStatuses.saving
            });

            console.log('spotForm: ', this.state.spotForm);

            if (this.state.spotForm.name.trim().length > 0) {
                this.props.actionsProjectBoard.updateOrCreateSpot(
                    this.props.projectId,
                    this.props.campaignId,
                    typeof this.props.spotId !== 'undefined' && this.props.spotId ? this.props.spotId : null,
                    this.state.spotForm
                ).then(() => {
                    this.setState({
                        saving: spotFormStatuses.success
                    });

                    this.handleSpotFormCancel();

                    setTimeout(() => {
                        if (this.componentIsMounted && this.state.saving === spotFormStatuses.success) {
                            this.setState({
                                saving: spotFormStatuses.default
                            });
                        }
                    }, 2048);
                }).catch((error) => {
                    this.setState({
                        saving: spotFormStatuses.error
                    });
                });
            } else {
                this.setState({
                    saving: spotFormStatuses.spotNameIsRequired
                });
            }
        }
    }
}

SpotForm.propTypes = spotFormProps;
SpotForm.defaultProps = spotFormDefaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(SpotForm);
