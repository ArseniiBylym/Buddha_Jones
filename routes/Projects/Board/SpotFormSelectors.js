import { get as _get } from 'lodash';
import { createSelector } from 'reselect';
import { getSelectedProject, getSelectedProjectCampaigns } from './../../../actions/ProjectBoardSelectors';

// Number of revisions
export const revisionsOptions = [
    { value: 0, label: 'Not included' },
    { value: null, label: 'Unlimited' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
    { value: 9, label: '9' },
    { value: 10, label: '10' }
];

// Getters
const getSpotFormCampaignId = (state, ownProps) => _get(ownProps, 'campaignId', null);
const getSpotFormSpotId = (state, ownProps) => _get(ownProps, 'spotId', null);

// Get details of form's campaign
export const getSpotFormCampaign = createSelector(
    [getSpotFormCampaignId, getSelectedProject],
    (campaignId, project) => {
        if (campaignId !== null && project && typeof project.campaigns !== 'undefined') {
            return project.campaigns.find((c, ci) => c.id === campaignId);
        } else {
            return null;
        }
    }
);

// Get details of form's spot details
export const getSpotFormDetails = createSelector(
    [getSpotFormSpotId, getSpotFormCampaign],
    (spotId, campaign) => {
        let spotDetails = {
            name: '',
            notes: '',
            numberOfRevisions: revisionsOptions[0].value,
            numberOfRevisionsText: revisionsOptions[0].label,
            firstRevisionCost: null,
            graphicsIncluded: false,
        };

        if (spotId !== null && campaign && typeof campaign.spots !== 'undefined') {
            campaign.spots.some((s, si) => {
                if (s.id === spotId) {
                    const numberOfRevisions = s.numberOfRevisions;
                    let numberOfRevisionsText = '';
                    const selectedRevisionOption = Object.values(revisionsOptions).find((o) => {
                        return o.value === numberOfRevisions;
                    });
                    if (typeof selectedRevisionOption !== 'undefined' && selectedRevisionOption) {
                        numberOfRevisionsText = selectedRevisionOption.label;
                    }

                    spotDetails = {
                        ...spotDetails,
                        name: s.name || '',
                        notes: s.notes || '',
                        numberOfRevisions,
                        numberOfRevisionsText,
                        firstRevisionCost: s.firstRevisionCost,
                        graphicsIncluded: s.graphicsIncluded
                    };

                    return true;
                }
            });
        }

        return spotDetails;
    }
);
