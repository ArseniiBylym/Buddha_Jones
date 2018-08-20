// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as projectBoardActions from './../../../actions/ProjectBoard';
import moment from 'moment';
import accounting from 'accounting';
import classNames from 'classnames';
import * as API from './../../../actions/api';
import { Row, Col } from './../../../components/Section';
import { Button, ButtonEdit } from './../../../components/Button';
import { Paragraph } from './../../../components/Content';
import { DropdownContainer, OptionsList } from './../../../components/Form';
import { SpotForm, Version } from '.';
import { getRemainingVersions } from './SpotSelectors';
import { DatePicker } from '../../../components/Calendar';
import { statuses } from './../../../helpers/status';

// Styles
import s from './Spot.css';
import { IconPlusBlue, IconPlusWhite, IconCheckmarkGreen } from './../../../components/Icons';

// Props
const spotPropTypes = {
    hasSeparator: PropTypes.bool,
    id: PropTypes.number.isRequired,
    projectId: PropTypes.number.isRequired,
    campaignId: PropTypes.number.isRequired,
    name: PropTypes.string,
    notes: PropTypes.string,
    numberOfRevisions: PropTypes.number,
    firstRevisionCost: PropTypes.number,
    graphicsIncluded: PropTypes.bool,
    versions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        })
    ),
    justAdded: PropTypes.bool,
};

// Defaults
const defaultSpotPropTypes = {
    hasSeparator: true,
    name: null,
    notes: null,
    numberOfRevisions: 0,
    firstRevisionCost: null,
    graphicsIncluded: false,
    versions: [],
    justAdded: false,
};

// Deriviations
const mapStateToProps = (state, ownProps) => {
    return {
        remainingVersionsToSelect: getRemainingVersions(state, ownProps),
    };
};

// Actions
const mapDispatchToProps = dispatch => {
    return {
        actionsProjectBoard: bindActionCreators(projectBoardActions, dispatch),
    };
};

// Component
class Spot extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            addNewVersion: statuses.default,
            removeSpot: statuses.default,
            editFormVisible: false,
        };

        this.versionDropdown = null;
        this.referenceVersionDropdown = ref => (this.versionDropdown = ref);
    }

    render() {
        // Destructure
        const { numberOfRevisions, versions } = this.props;

        // Single spot
        return (
            <Row key={`spot-id-${this.props.spotId}`} removeMargins={true} className={s.campaignSpot}>
                <Col>
                    {this.props.hasSeparator && <hr />}

                    <Row className={s.campaignSpotHeader}>
                        <Col>
                            <h5>{this.props.name}</h5>

                            {this.props.justAdded && (
                                <Button
                                    onClick={e => this.handleSpotRemoval(e)}
                                    className={classNames(s.removeSpotButton, s.rotate45)}
                                    label={{
                                        color: 'orange',
                                        size: 'small',
                                        text:
                                            this.state.removeSpot === statuses.default
                                                ? '(Remove)'
                                                : this.state.removeSpot === statuses.error
                                                    ? '(Issue removing, try again)'
                                                    : this.state.removeSpot === statuses.saving
                                                        ? '(Removing...)'
                                                        : '(Removed)',
                                    }}
                                />
                            )}

                            <ButtonEdit
                                className={s.editSpotButton}
                                onClick={e => this.handleSpotEdit(e)}
                                float="right"
                                label={this.state.editFormVisible ? 'Cancel' : 'Edit spot'}
                            />
                        </Col>
                    </Row>

                    <Row className={s.campaignSpotVersions} justifyContent="flex-start">
                        {this.props.versions.length > 0 && (
                            <Col className={s.versionsLabel} key={`spot-${this.props.spotId}-versions-label`}>
                                <p>Versions:</p>
                            </Col>
                        )}

                        {this.props.versions.map((version, versionIndex) => (
                            <Version
                                key={`version-${version.id}-from-spot-${this.props.spotId}`}
                                projectId={this.props.projectId}
                                campaignId={this.props.campaignId}
                                spotId={this.props.id}
                                id={version.id}
                                name={version.name}
                                editable={this.state.editFormVisible}
                            />
                        ))}

                        {this.props.numberOfRevisions !== 0 &&
                            (this.props.versions === null || this.props.versions.length <= 0) && (
                                <Col key={`spot-${this.props.spotId}-has-no-versions`}>
                                    <p>No spot versions added.</p>
                                </Col>
                            )}

                        {this.state.editFormVisible &&
                            this.state.addNewVersion !== statuses.default && (
                                <Col className={s.addingNewSpot} key={`spot-${this.props.spotId}-adding-new-version`}>
                                    <p>
                                        {this.state.addNewVersion === statuses.saving
                                            ? 'Adding...'
                                            : this.state.addNewVersion === statuses.error
                                                ? 'Error, try again'
                                                : 'Added'}
                                    </p>
                                </Col>
                            )}

                        {this.state.editFormVisible &&
                            (numberOfRevisions === null ||
                                (numberOfRevisions !== 0 && numberOfRevisions > versions.length)) && (
                                <Col className={s.addVersion} key={`spot-${this.props.spotId}-add-version`}>
                                    <DropdownContainer
                                        ref={this.referenceVersionDropdown}
                                        label="Add version"
                                        align="right"
                                    >
                                        <OptionsList
                                            onChange={e => this.handleNewVersionAdd(e)}
                                            label="Select version"
                                            options={
                                                this.props.remainingVersionsToSelect.length > 0
                                                    ? this.props.remainingVersionsToSelect
                                                    : [
                                                          {
                                                              value: 0,
                                                              label: 'No versions remaining',
                                                          },
                                                      ]
                                            }
                                        />
                                    </DropdownContainer>
                                </Col>
                            )}
                    </Row>

                    <Row>
                        <Col>
                            {!this.state.editFormVisible && (
                                <div className={s.spotDetails}>
                                    <DatePicker
                                        type="field"
                                        isAmerican={true}
                                        label="V.1 internal deadline"
                                        value={
                                            this.props.id === '55'
                                                ? moment('2018-03-28')
                                                : this.props.id === '73' ? moment('2018-04-11') : moment('2018-04-25')
                                        }
                                    />

                                    <DatePicker
                                        type="field"
                                        isAmerican={true}
                                        label="V.1 client deadline"
                                        value={
                                            this.props.id === '55'
                                                ? moment('2018-03-30')
                                                : this.props.id === '73' ? moment('2018-04-20') : moment('2018-05-04')
                                        }
                                    />

                                    {this.props.notes !== null &&
                                        this.props.notes !== 'null' && (
                                            <Paragraph>
                                                <span>Notes: </span>
                                                {this.props.notes}
                                            </Paragraph>
                                        )}

                                    {(this.props.numberOfRevisions !== 0 && (
                                        <div>
                                            <Row>
                                                <Col>
                                                    <Paragraph>
                                                        <span>Number of revisions: </span>
                                                        <strong>
                                                            {(this.props.numberOfRevisions === null
                                                                ? 'Unlimited'
                                                                : this.props.numberOfRevisions) +
                                                                ', ' +
                                                                (this.props.graphicsIncluded
                                                                    ? 'graphics included'
                                                                    : 'graphics not included')}
                                                        </strong>
                                                    </Paragraph>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Paragraph>
                                                        <span>First stage cost: </span>
                                                        <strong>
                                                            {this.props.firstRevisionCost === null
                                                                ? 'not specified'
                                                                : accounting.formatMoney(this.props.firstRevisionCost)}
                                                        </strong>
                                                    </Paragraph>
                                                </Col>
                                            </Row>
                                        </div>
                                    )) || (
                                        <p>
                                            <span>No revisions included</span>
                                        </p>
                                    )}
                                </div>
                            )}

                            {this.state.editFormVisible && (
                                <SpotForm
                                    onFormHide={e => this.handleEditHide(e)}
                                    projectId={this.props.projectId}
                                    campaignId={this.props.campaignId}
                                    spotId={this.props.id}
                                    removeGutter={true}
                                />
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }

    handleEditHide(e) {
        this.setState({
            editFormVisible: false,
        });
    }

    handleSpotRemoval(e) {
        this.setState({
            removeSpot: statuses.saving,
        });

        this.props.actionsProjectBoard
            .removeProjectSpot(this.props.projectId, this.props.campaignId, this.props.id)
            .catch(error => {
                this.setState({
                    removeSpot: statuses.error,
                });
            });
    }

    handleNewVersionAdd(e) {
        this.setState({
            addNewVersion: statuses.saving,
        });

        this.props.actionsProjectBoard
            .addProjectVersion(this.props.projectId, this.props.campaignId, this.props.id, e.value, e.label)
            .then(() => {
                this.setState({
                    addNewVersion: statuses.default,
                });
            })
            .catch(error => {
                this.setState({
                    addNewVersion: statuses.error,
                });
            });

        if (this.versionDropdown) {
            if (typeof this.versionDropdown.closeDropdown !== 'undefined') {
                this.versionDropdown.closeDropdown();
            }
        }
    }

    handleSpotEdit(e) {
        this.setState({
            editFormVisible: !this.state.editFormVisible,
        });
    }
}

Spot.propTypes = spotPropTypes;
Spot.defaultProps = defaultSpotPropTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Spot);
