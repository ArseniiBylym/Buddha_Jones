import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Section } from './../../../components/Section';
import { Button } from './../../../components/Button';
import { statuses } from './../../../helpers/status';
import * as projectBoardActions from './../../../actions/ProjectBoard';
import * as usersActions from './../../../actions/Users';
import { CreativeExecutive, CampaignManagement, Spots, ProjectPeople } from '.';
import { getCampaignCustomer, getHasCreativeExecutiveAssigned, getHasSpotsAssigned } from './CampaignSelectors';

// Styles
const s = require('./Campaign.css');
import { IconDropdownArrow, IconArrowTopBlue } from './../../../components/Icons';
import WritingAndMusicTeams from './WritingAndMusicTeams';

// Props
const propTypes = {
    campaign: PropTypes.object.isRequired
};

// Deriviations
const mapStateToProps = (state, ownProps) => {
    return {
        projectId: state.projectBoard.selectedProjectId,
        customer: getCampaignCustomer(state, ownProps),
        hasCreativeExecutiveAssigned: getHasCreativeExecutiveAssigned(state, ownProps),
        hasSpotsAssigned: getHasSpotsAssigned(state, ownProps),
    };
};

// Actions
const mapDispatchToProps = (dispatch) => {
    return {
        actionsProjectBoard: bindActionCreators(projectBoardActions, dispatch),
        actionsUsers: bindActionCreators(usersActions, dispatch),
    };
};

// Component
class CampaignComponent extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            expanded: false,
            removing: statuses.default
        };
    }

    componentDidMount() {
        this.props.campaign.users.map((user) => {
            if (user && typeof user.userId !== 'undefined' && user.userId) {
                this.props.actionsUsers.fetchUserById(user.userId);
            }
        });
    }

    render() {
        const { campaign, projectId, customer, hasCreativeExecutiveAssigned, hasSpotsAssigned } = this.props;

        return (
            <div className={s.campaign}>

                <Row className={s.campaignHeader} removeMargins={true}>
                    <Col>
                        <Row className={s.campaignInfo} removeMargins={true}>

                            <Col className={s.campaignName}>
                                <Button
                                    onClick={(e) => this.handleCampaignExpandOrCollapse(e)}
                                    label={{
                                        text: campaign.name,
                                        size: 'large',
                                        color: 'black',
                                        onLeft: false
                                    }}
                                    icon={{
                                        size: 'small',
                                        background: this.state.expanded ? 'none-alt' : 'white',
                                        element:
                                            this.state.expanded
                                                ? <IconArrowTopBlue
                                                    width={10}
                                                    height={16}
                                                    marginLeft={-5}
                                                    marginTop={-8}
                                                />
                                                : <IconDropdownArrow
                                                    width={12}
                                                    height={8}
                                                    marginLeft={-6}
                                                    marginTop={-4}
                                                />
                                    }}
                                />
                            </Col>

                            {(!hasCreativeExecutiveAssigned && !hasSpotsAssigned) && (
                                <Col className={s.campaignRemoveButtonContainer}>
                                    <Button
                                        onClick={
                                            this.state.removing !== statuses.saving
                                                ? e => this.handleCampaignRemoval(e)
                                                : undefined
                                        }
                                        label={{
                                            text: this.state.removing === statuses.default
                                                ? 'Remove'
                                                : this.state.removing === statuses.error
                                                    ? 'Could not remove, try again'
                                                    : 'Removing...',
                                            color: 'orange',
                                            size: 'small'
                                        }}
                                    />
                                </Col>
                            )}

                        </Row>
                    </Col>
                    <Col size={0}>
                        <CreativeExecutive
                            projectId={projectId}
                            campaignId={campaign.id}
                            editable={this.state.expanded}
                            executiveId={
                                typeof campaign.firstPointOfContactId !== 'undefined' && campaign.firstPointOfContactId
                                    ? campaign.firstPointOfContactId
                                    : null
                            }
                        />
                    </Col>
                </Row>

                {(this.state.expanded) && (
                    <div className={s.campaignContent}>

                        <ProjectPeople
                            projectId={this.props.projectId}
                            campaignId={campaign.id}
                            users={campaign.users}
                        />

                        <Section>
                            <Row removeMargins={true}>
                                <Col size={6}>
                                    <WritingAndMusicTeams
                                        projectId={this.props.projectId}
                                        campaignId={campaign.id}
                                        type="music"
                                        toggle={campaign.musicTeam}
                                        notes={campaign.musicTeamNotes}
                                    />
                                </Col>
                                <Col size={6}>
                                    <WritingAndMusicTeams
                                        projectId={this.props.projectId}
                                        campaignId={campaign.id}
                                        type="writing"
                                        toggle={campaign.writingTeam}
                                        notes={campaign.writingTeamNotes}
                                    />
                                </Col>
                            </Row>
                        </Section>

                        <Section
                            removeTitleGutter={false}
                            removeTitleMargins={true}
                            title={
                                campaign.spots && campaign.spots.length > 0
                                    ? 'Spots'
                                    : undefined
                            }
                            subTitle={
                                (campaign.spots === null) ||
                                (typeof campaign.spots.length !== 'undefined' && campaign.spots.length === 0)
                                    ? 'No spots assigned'
                                    : undefined
                            }
                        >
                            <Spots
                                projectId={projectId}
                                campaignId={campaign.id}
                                spots={campaign.spots}
                            />
                        </Section>

                    </div>
                )}

            </div>
        );
    }

    handleCampaignExpandOrCollapse(e) {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    handleCampaignRemoval(e) {
        this.setState({
            removing: statuses.saving
        });

        this.props.actionsProjectBoard.removeProjectCampaign(
            this.props.projectId,
            this.props.campaign.id
        ).catch((error) => {
            this.setState({
                removing: statuses.error
            });
        });
    }
}

CampaignComponent.propTypes = propTypes;
const Campaign = connect(mapStateToProps, mapDispatchToProps)(CampaignComponent);

export default Campaign;
