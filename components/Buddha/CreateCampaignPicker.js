import React from 'react';
import PropTypes from 'prop-types';
import CampaignPicker from './CampaignPicker';
import Paragraph from './../Content/Paragraph';
import * as API from './../../actions/api';
/**
 * CreateCampaignPicker
 */
class CreateCampaignPicker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            campaigns: [],
            savingCampaign: false
        };
    }

    componentWillMount() {
        let campaigns = [];
        campaigns = this.props.excludeCampaginIds.map((item, index)=>{
            return {
                id: item.id
            };
        });
        this.setState({
            campaigns: campaigns
        });
    }

    handleCampaignPicked(e) {
        if (typeof e !== 'undefined' && typeof e.value !== 'undefined' && typeof e.label !== 'undefined') {
            // Indicate campaign is being saved
            this.setState({
                savingCampaign: true
            });

            // Campaign
            const campaignId = e.value;
            const campaignName = e.label.trim();

            if (campaignName) {
                // Assign campaign to project
                API.post(API.ASSIGN_CAMPAIGN_TO_PROJECT, API.makePostData({
                    project_id: this.props.projectId,
                    campaign_id: campaignId
                })).then((response) => {
                    this.reloadCampaign(campaignName, campaignId);
                });
            }
        }
    }

    reloadCampaign(campaignId) {
        this.setState({
            savingCampaign: false,
            campaigns: this.state.campaigns
                .concat([
                    {
                        id: campaignId
                    }
                ])
        });
        this.props.reloadCampaign();
    }

    render() {
        if (this.state.savingCampaign) {
            return (
                <Paragraph>Saving new campaign...</Paragraph>
            );
        } else {
            return (
                <CampaignPicker
                    ref="campaignsPicker"
                    align="left"
                    label="Add new campaign"
                    projectId={this.props.projectId}
                    onNewCreated={(e) => this.handleCampaignPicked(e)}
                    onChange={(e) => this.handleCampaignPicked(e)}
                    excludeIds={this.state.campaigns.map(c => c.id)}
                />
            );
        }
    }
}

export default CreateCampaignPicker;
