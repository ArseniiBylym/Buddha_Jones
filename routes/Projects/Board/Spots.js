// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from './../../../components/Section';
import { ButtonAdd } from './../../../components/Button';
import Spot from './Spot';
import SpotForm from './SpotForm';

// Styles
import s from './Spots.css';
import { IconPlusBlue } from './../../../components/Icons';

// Props
const propTypes = {
    projectId: PropTypes.number.isRequired,
    campaignId: PropTypes.number.isRequired,
    spots: PropTypes.arrayOf(PropTypes.shape({
        firstRevisionCost: PropTypes.number,
        graphicsRevisions: PropTypes.number,
        id: PropTypes.number,
        notes: PropTypes.string,
        revisionNotCounted: PropTypes.bool,
        revisions: PropTypes.number,
        spotName: PropTypes.string,
        versions: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired
            })
        ),
        justAdded: PropTypes.bool,
    }))
};

// Defaults
const defaultProps = {
    projectId: null,
    campaignId: null,
    spots: []
};

// Component
class Spots extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            addingNewSpotFormVisible: false
        };
    }

    render() {
        return (
            <Row className={s.campaignSpots} removeGutter={true}>
                <Col>

                    <Row className={s.spotsContainer} key="spots-columns" removeMargins={true}>
                        <Col
                            key={`spots-col1-from-campaign-${this.props.campaignId}`}
                            className={s.spotContainer}
                            removeGutter={true}
                            size={6}
                        >
                            {this.props.spots.filter((s, si) => si % 2 === 0).map((spot, spotIndex) => (
                                <Spot
                                    {...spot}
                                    key={`spot-${spot.id}`}
                                    hasSeparator={spotIndex > 0}
                                    projectId={this.props.projectId}
                                    campaignId={this.props.campaignId}
                                    id={spot.id}
                                />
                            ))}
                        </Col>
                        <Col
                            key={`spots-col2-from-campaign-${this.props.campaignId}`}
                            className={s.spotContainer}
                            removeGutter={true}
                            size={6}
                        >
                            {this.props.spots.filter((s, si) => si % 2 !== 0).map((spot, spotIndex) => (
                                <Spot
                                    {...spot}
                                    key={`spot-${spot.id}`}
                                    hasSeparator={spotIndex > 0}
                                    projectId={this.props.projectId}
                                    campaignId={this.props.campaignId}
                                    id={spot.id}
                                />
                            ))}
                        </Col>
                    </Row>

                    {(this.state.addingNewSpotFormVisible) && (
                        <SpotForm
                            key={`campaign-${this.props.campaignId}-new-spot-form`}
                            onFormHide={e => this.handleNewSpotFormHide(e)}
                            projectId={this.props.projectId}
                            campaignId={this.props.campaignId}
                        />
                    ) || (
                        <Row key="adding-spot" removeMargins={true} className={s.campaignAddSpot}>
                            <Col>
                                <hr />
                                <ButtonAdd
                                    onClick={e => this.handleNewSpotFormToggle(e)}
                                    className={
                                        this.state.addingNewSpotFormVisible
                                            ? [s.campaignAddSpotButton, s.rotate45].join(' ')
                                            : s.campaignAddSpotButton
                                    }
                                    float="right"
                                    label={
                                        this.state.addingNewSpotFormVisible
                                            ? 'Cancel adding new spot'
                                            : 'Add new spot'
                                    }
                                    labelColor={
                                        this.state.addingNewSpotFormVisible
                                            ? 'orange'
                                            : 'blue'
                                    }
                                    labelOnLeft={true}
                                />
                            </Col>
                        </Row>
                    )}

                </Col>
            </Row>
        );
    }

    handleNewSpotFormToggle(e) {
        this.setState({
            addingNewSpotFormVisible: !this.state.addingNewSpotFormVisible
        });
    }

    handleNewSpotFormHide(e) {
        this.setState({
            addingNewSpotFormVisible: false
        });
    }
}

Spots.propTypes = propTypes;
Spots.defaultProps = defaultProps;

export default Spots;
