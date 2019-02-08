import { HeaderActions } from 'actions';
import { DataFetchError } from 'components/Errors/DataFetchError';
import { LoadingShade, LoadingSpinner } from 'components/Loaders';
import { FetchQueryMock } from 'fetch';
import { SpotSentBillStatus } from 'invariables';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppState } from 'store/AllStores';
import { SpotBillingType } from 'types/projectDetailsEnums';
import { SpotBillFormSummary } from 'types/spotBilling';
import { ApprovedBillSpotForm } from './ApprovedBillSpotForm';
import { BackToSpotsToBillListButton, BillIdDoesNotExist } from './BillSpotFormElements';
import { DraftBillSpotForm } from './DraftBillSpotForm';

interface Props extends AppState {}

@inject('store')
@observer
export default class BillSpotForm extends React.Component<Props, {}> {
    @observable private billId: number | null = null;
    @observable private isPreview: boolean = false;

    constructor(props: Props) {
        super(props);

        // Set bill ID coming from URL
        if (this.props.match && this.props.match.params && this.props.match.params['id']) {
            const billId = parseInt(this.props.match.params['id'], 10);
            this.billId = !isNaN(billId) && billId ? billId : null;
        }

        // Set preview coming from URL
        if (this.props.match && this.props.match.params && this.props.match.params['preview']) {
            this.isPreview = true;
        }
    }

    componentDidMount() {
        // Set initial header and page title
        this.setHeader(this.billId);
    }

    componentWillReceiveProps(nextProps: Props) {
        // Set modified bill ID
        if (
            this.props.match &&
            this.props.match.params &&
            nextProps.match &&
            nextProps.match.params &&
            this.props.match.params['id'] &&
            nextProps.match.params['id'] &&
            this.props.match.params['id'] !== nextProps.match.params['id']
        ) {
            const billId = parseInt(nextProps.match.params['id'], 10);
            this.billId = !isNaN(billId) && billId ? billId : null;
            this.setHeader(this.billId);
        }

        // Set modified preview
        if (
            this.props.match &&
            this.props.match.params &&
            nextProps.match &&
            nextProps.match.params &&
            this.props.match.params['preview'] !== nextProps.match.params['preview']
        ) {
            this.isPreview = nextProps.match.params['preview'] ? true : false;
        }
    }

    public render() {
        if (this.billId === null) {
            return <BillIdDoesNotExist />;
        }

        return (
            <FetchQueryMock<SpotBillFormSummary>
                mockResponses={[
                    {
                        projectId: 47,
                        projectName: 'Annihilation',
                        projectCampaignId: 156,
                        projectCampaignName: 'Massey',
                        campaignId: 4,
                        campaignName: 'Theatrical Teaser/Trai',
                        studioId: 2,
                        studioName: 'Warner Bros.',
                        projectBillsHistory: [
                            {
                                billId: 123,
                                billStatusId: 2,
                                billStatusName: 'Submitted',
                                billTotal: 10000,
                                createdByUserId: 1,
                                createdByUsername: 'johndoe',
                                createdByUserFirstName: 'John',
                                createdByUserLastName: 'Doe',
                                createdByUserImage: null,
                                createdAt: {
                                    date: '2018-12-16 12:48:11.000000',
                                    timezone: 'US/Eastern',
                                    timezone_type: 3,
                                },
                            },
                            {
                                billId: 111,
                                billStatusId: 3,
                                billStatusName: 'Approved',
                                billTotal: 16690,
                                createdByUserId: 1,
                                createdByUsername: 'johndoe',
                                createdByUserFirstName: 'John',
                                createdByUserLastName: 'Doe',
                                createdByUserImage: null,
                                createdAt: {
                                    date: '2018-12-01 14:21:00.000000',
                                    timezone: 'US/Eastern',
                                    timezone_type: 3,
                                },
                            },
                        ],
                        unbilledTimeEntries: [
                            {
                                timeEntryId: 59,
                                projectId: 47,
                                projectName: 'Annihilation',
                                projectCampaignId: 156,
                                campaignName: 'Theatrical Teaser/Trai',
                                projectCampaignName: 'Massey',
                                spotId: null,
                                spotName: null,
                                versionId: null,
                                versionName: null,
                                versionSequence: null,
                                activityId: 32,
                                activityName: 'Produce',
                                activityDescription: '',
                                activityIsBillable: false,
                                userId: 1,
                                userName: 'demo',
                                userFirstName: 'Demo',
                                userLastName: 'User',
                                userInitials: 'DU',
                                userImage: null,
                                duration: '1.00',
                                startDate: {
                                    date: '2018-06-14 09:15:00.000000',
                                    timezone: 'US/Eastern',
                                    timezone_type: 3,
                                },
                            },
                            {
                                timeEntryId: 63,
                                projectId: 47,
                                projectName: 'Annihilation',
                                projectCampaignId: 156,
                                campaignName: 'Theatrical Teaser/Trai',
                                projectCampaignName: 'Massey',
                                spotId: null,
                                spotName: null,
                                versionId: null,
                                versionName: null,
                                versionSequence: null,
                                activityId: 1,
                                activityName: 'AE Work (NOT Dailies)',
                                activityDescription: 'omf',
                                activityIsBillable: false,
                                userId: 6,
                                userName: 'JZAKOSKI',
                                userFirstName: 'Jamie',
                                userLastName: 'Zakoski',
                                userInitials: 'JZ',
                                userImage: null,
                                duration: '1.00',
                                startDate: {
                                    date: '2018-07-06 12:30:00.000000',
                                    timezone: 'US/Eastern',
                                    timezone_type: 3,
                                },
                            },
                            {
                                timeEntryId: 104,
                                projectId: 47,
                                projectName: 'Annihilation',
                                projectCampaignId: 156,
                                campaignName: 'Theatrical Teaser/Trai',
                                projectCampaignName: 'Massey',
                                spotId: null,
                                spotName: null,
                                versionId: null,
                                versionName: null,
                                versionSequence: null,
                                activityId: 33,
                                activityName: 'Screen Movie',
                                activityDescription: '',
                                activityIsBillable: false,
                                userId: 19,
                                userName: 'ACAPUTO',
                                userFirstName: 'Ashley',
                                userLastName: 'Caputo',
                                userInitials: 'AC',
                                userImage: null,
                                duration: '1.00',
                                startDate: {
                                    date: '2018-11-05 07:00:00.000000',
                                    timezone: 'US/Eastern',
                                    timezone_type: 3,
                                },
                            },
                            {
                                timeEntryId: 99,
                                projectId: 47,
                                projectName: 'Annihilation',
                                projectCampaignId: 156,
                                campaignName: 'Theatrical Teaser/Trai',
                                projectCampaignName: 'Massey',
                                spotId: null,
                                spotName: null,
                                versionId: null,
                                versionName: null,
                                versionSequence: null,
                                activityId: 21,
                                activityName: 'IT Work',
                                activityDescription: 'qweqwe',
                                activityIsBillable: false,
                                userId: 1,
                                userName: 'demo',
                                userFirstName: 'Demo',
                                userLastName: 'User',
                                userInitials: 'DU',
                                userImage: null,
                                duration: '1.00',
                                startDate: {
                                    date: '2018-11-07 00:00:00.000000',
                                    timezone: 'US/Eastern',
                                    timezone_type: 3,
                                },
                            },
                            {
                                timeEntryId: 110,
                                projectId: 47,
                                projectName: 'Annihilation',
                                projectCampaignId: 156,
                                campaignName: 'Theatrical Teaser/Trai',
                                projectCampaignName: 'Massey',
                                spotId: null,
                                spotName: null,
                                versionId: null,
                                versionName: null,
                                versionSequence: null,
                                activityId: 2,
                                activityName: 'Breakdown Movie',
                                activityDescription: '',
                                activityIsBillable: false,
                                userId: 19,
                                userName: 'ACAPUTO',
                                userFirstName: 'Ashley',
                                userLastName: 'Caputo',
                                userInitials: 'AC',
                                userImage: null,
                                duration: '1.00',
                                startDate: {
                                    date: '2018-11-05 09:30:00.000000',
                                    timezone: 'US/Eastern',
                                    timezone_type: 3,
                                },
                            },
                            {
                                timeEntryId: 115,
                                projectId: 47,
                                projectName: 'Annihilation',
                                projectCampaignId: 156,
                                campaignName: 'Theatrical Teaser/Trai',
                                projectCampaignName: 'Massey',
                                spotId: null,
                                spotName: null,
                                versionId: null,
                                versionName: null,
                                versionSequence: null,
                                activityId: 24,
                                activityName: 'Meeting (Project Creative)',
                                activityDescription: '',
                                activityIsBillable: false,
                                userId: 1,
                                userName: 'demo',
                                userFirstName: 'Demo',
                                userLastName: 'User',
                                userInitials: 'DU',
                                userImage: null,
                                duration: '1.0',
                                startDate: {
                                    date: '2018-11-12 21:15:00.000000',
                                    timezone: 'US/Eastern',
                                    timezone_type: 3,
                                },
                            },
                            {
                                timeEntryId: 139,
                                projectId: 47,
                                projectName: 'Annihilation',
                                projectCampaignId: 156,
                                campaignName: 'Theatrical Teaser/Trai',
                                projectCampaignName: 'Massey',
                                spotId: null,
                                spotName: null,
                                versionId: null,
                                versionName: null,
                                versionSequence: null,
                                activityId: 10,
                                activityName: 'Fiber',
                                activityDescription: '',
                                activityIsBillable: false,
                                userId: 19,
                                userName: 'ACAPUTO',
                                userFirstName: 'Ashley',
                                userLastName: 'Caputo',
                                userInitials: 'AC',
                                userImage: null,
                                duration: '3.30',
                                startDate: {
                                    date: '2018-11-13 18:00:00.000000',
                                    timezone: 'US/Eastern',
                                    timezone_type: 3,
                                },
                            },
                            {
                                timeEntryId: 129,
                                projectId: 47,
                                projectName: 'Annihilation',
                                projectCampaignId: 156,
                                campaignName: 'Theatrical Teaser/Trai',
                                projectCampaignName: 'Massey',
                                spotId: null,
                                spotName: null,
                                versionId: null,
                                versionName: null,
                                versionSequence: null,
                                activityId: 21,
                                activityName: 'IT Work',
                                activityDescription: '',
                                activityIsBillable: false,
                                userId: 1,
                                userName: 'demo',
                                userFirstName: 'Demo',
                                userLastName: 'User',
                                userInitials: 'DU',
                                userImage: null,
                                duration: '1.00',
                                startDate: {
                                    date: '2018-11-13 23:15:00.000000',
                                    timezone: 'US/Eastern',
                                    timezone_type: 3,
                                },
                            },
                            {
                                timeEntryId: 130,
                                projectId: 47,
                                projectName: 'Annihilation',
                                projectCampaignId: 156,
                                campaignName: 'Theatrical Teaser/Trai',
                                projectCampaignName: 'Massey',
                                spotId: null,
                                spotName: null,
                                versionId: null,
                                versionName: null,
                                versionSequence: null,
                                activityId: 24,
                                activityName: 'Meeting (Project Creative)',
                                activityDescription: '',
                                activityIsBillable: false,
                                userId: 1,
                                userName: 'demo',
                                userFirstName: 'Demo',
                                userLastName: 'User',
                                userInitials: 'DU',
                                userImage: null,
                                duration: '1.00',
                                startDate: {
                                    date: '2018-11-14 00:15:00.000000',
                                    timezone: 'US/Eastern',
                                    timezone_type: 3,
                                },
                            },
                            {
                                timeEntryId: 131,
                                projectId: 47,
                                projectName: 'Annihilation',
                                projectCampaignId: 156,
                                campaignName: 'Theatrical Teaser/Trai',
                                projectCampaignName: 'Massey',
                                spotId: null,
                                spotName: null,
                                versionId: null,
                                versionName: null,
                                versionSequence: null,
                                activityId: 21,
                                activityName: 'IT Work',
                                activityDescription: '',
                                activityIsBillable: false,
                                userId: 1,
                                userName: 'demo',
                                userFirstName: 'Demo',
                                userLastName: 'User',
                                userInitials: 'DU',
                                userImage: null,
                                duration: '1.00',
                                startDate: {
                                    date: '2018-11-14 21:15:00.000000',
                                    timezone: 'US/Eastern',
                                    timezone_type: 3,
                                },
                            },
                            {
                                timeEntryId: 132,
                                projectId: 47,
                                projectName: 'Annihilation',
                                projectCampaignId: 156,
                                campaignName: 'Theatrical Teaser/Trai',
                                projectCampaignName: 'Massey',
                                spotId: null,
                                spotName: null,
                                versionId: null,
                                versionName: null,
                                versionSequence: null,
                                activityId: 21,
                                activityName: 'IT Work',
                                activityDescription: '',
                                activityIsBillable: false,
                                userId: 1,
                                userName: 'demo',
                                userFirstName: 'Demo',
                                userLastName: 'User',
                                userInitials: 'DU',
                                userImage: null,
                                duration: '1.00',
                                startDate: {
                                    date: '2018-11-14 22:15:00.000000',
                                    timezone: 'US/Eastern',
                                    timezone_type: 3,
                                },
                            },
                            {
                                timeEntryId: 133,
                                projectId: 47,
                                projectName: 'Annihilation',
                                projectCampaignId: 156,
                                campaignName: 'Theatrical Teaser/Trai',
                                projectCampaignName: 'Massey',
                                spotId: null,
                                spotName: null,
                                versionId: null,
                                versionName: null,
                                versionSequence: null,
                                activityId: 2,
                                activityName: 'Breakdown Movie',
                                activityDescription: '',
                                activityIsBillable: false,
                                userId: 19,
                                userName: 'ACAPUTO',
                                userFirstName: 'Ashley',
                                userLastName: 'Caputo',
                                userInitials: 'AC',
                                userImage: null,
                                duration: '3.00',
                                startDate: {
                                    date: '2018-11-12 09:00:00.000000',
                                    timezone: 'US/Eastern',
                                    timezone_type: 3,
                                },
                            },
                            {
                                timeEntryId: 147,
                                projectId: 47,
                                projectName: 'Annihilation',
                                projectCampaignId: 156,
                                campaignName: 'Theatrical Teaser/Trai',
                                projectCampaignName: 'Massey',
                                spotId: null,
                                spotName: null,
                                versionId: null,
                                versionName: null,
                                versionSequence: null,
                                activityId: 17,
                                activityName: 'Graphic Design',
                                activityDescription: 'Worked on graphics design',
                                activityIsBillable: false,
                                userId: 67,
                                userName: 'KPANG',
                                userFirstName: 'Keith',
                                userLastName: 'Pang',
                                userInitials: 'KP',
                                userImage: null,
                                duration: '3.00',
                                startDate: {
                                    date: '2018-11-26 09:30:00.000000',
                                    timezone: 'US/Eastern',
                                    timezone_type: 3,
                                },
                            },
                            {
                                timeEntryId: 149,
                                projectId: 47,
                                projectName: 'Annihilation',
                                projectCampaignId: 156,
                                campaignName: 'Theatrical Teaser/Trai',
                                projectCampaignName: 'Massey',
                                spotId: null,
                                spotName: null,
                                versionId: null,
                                versionName: null,
                                versionSequence: null,
                                activityId: 2,
                                activityName: 'Breakdown Movie',
                                activityDescription: '',
                                activityIsBillable: false,
                                userId: 19,
                                userName: 'ACAPUTO',
                                userFirstName: 'Ashley',
                                userLastName: 'Caputo',
                                userInitials: 'AC',
                                userImage: null,
                                duration: '5.00',
                                startDate: {
                                    date: '2018-11-26 07:45:00.000000',
                                    timezone: 'US/Eastern',
                                    timezone_type: 3,
                                },
                            },
                            {
                                timeEntryId: 34,
                                projectId: 47,
                                projectName: 'Annihilation',
                                projectCampaignId: 156,
                                campaignName: 'Theatrical Teaser/Trai',
                                projectCampaignName: 'Massey',
                                spotId: 79,
                                spotName: '#2 Saved',
                                versionId: null,
                                versionName: null,
                                versionSequence: null,
                                activityId: 8,
                                activityName: 'Edit',
                                activityDescription: 'Did a lot of stuff',
                                activityIsBillable: true,
                                userId: 1,
                                userName: 'demo',
                                userFirstName: 'Demo',
                                userLastName: 'User',
                                userInitials: 'DU',
                                userImage: null,
                                duration: '2.30',
                                startDate: {
                                    date: '2018-05-03 18:21:29.000000',
                                    timezone: 'US/Eastern',
                                    timezone_type: 3,
                                },
                            },
                            {
                                timeEntryId: 158,
                                projectId: 47,
                                projectName: 'Annihilation',
                                projectCampaignId: 156,
                                campaignName: 'Theatrical Teaser/Trai',
                                projectCampaignName: 'Massey',
                                spotId: 79,
                                spotName: '#2 Saved',
                                versionId: 2,
                                versionName: '1 Alt',
                                versionSequence: 2,
                                activityId: 8,
                                activityName: 'Edit',
                                activityDescription: '',
                                activityIsBillable: true,
                                userId: 19,
                                userName: 'ACAPUTO',
                                userFirstName: 'Ashley',
                                userLastName: 'Caputo',
                                userInitials: 'AC',
                                userImage: null,
                                duration: '5.15',
                                startDate: {
                                    date: '2018-11-30 12:21:48.000000',
                                    timezone: 'US/Eastern',
                                    timezone_type: 3,
                                },
                            },
                            {
                                timeEntryId: 35,
                                projectId: 47,
                                projectName: 'Annihilation',
                                projectCampaignId: 156,
                                campaignName: 'Theatrical Teaser/Trai',
                                projectCampaignName: 'Massey',
                                spotId: 79,
                                spotName: '#2 Saved',
                                versionId: null,
                                versionName: null,
                                versionSequence: null,
                                activityId: 8,
                                activityName: 'Edit',
                                activityDescription: null,
                                activityIsBillable: true,
                                userId: 1,
                                userName: 'demo',
                                userFirstName: 'Demo',
                                userLastName: 'User',
                                userInitials: 'DU',
                                userImage: null,
                                duration: '2.30',
                                startDate: {
                                    date: '2018-05-03 19:21:29.000000',
                                    timezone: 'US/Eastern',
                                    timezone_type: 3,
                                },
                            },
                            {
                                timeEntryId: 36,
                                projectId: 47,
                                projectName: 'Annihilation',
                                projectCampaignId: 156,
                                campaignName: 'Theatrical Teaser/Trai',
                                projectCampaignName: 'Massey',
                                spotId: 79,
                                spotName: '#2 Saved',
                                versionId: null,
                                versionName: null,
                                versionSequence: null,
                                activityId: 8,
                                activityName: 'Edit',
                                activityDescription: null,
                                activityIsBillable: true,
                                userId: 19,
                                userName: 'ACAPUTO',
                                userFirstName: 'Ashley',
                                userLastName: 'Caputo',
                                userInitials: 'AC',
                                userImage: null,
                                duration: '3.0',
                                startDate: {
                                    date: '2018-05-03 18:50:29.000000',
                                    timezone: 'US/Eastern',
                                    timezone_type: 3,
                                },
                            },
                            {
                                timeEntryId: 157,
                                projectId: 47,
                                projectName: 'Annihilation',
                                projectCampaignId: 156,
                                campaignName: 'Theatrical Teaser/Trai',
                                projectCampaignName: 'Massey',
                                spotId: 79,
                                spotName: '#2 Saved',
                                versionId: 1,
                                versionName: '1',
                                versionSequence: 1,
                                activityId: 8,
                                activityName: 'Edit',
                                activityDescription: '',
                                activityIsBillable: true,
                                userId: 19,
                                userName: 'ACAPUTO',
                                userFirstName: 'Ashley',
                                userLastName: 'Caputo',
                                userInitials: 'AC',
                                userImage: null,
                                duration: '7.45',
                                startDate: {
                                    date: '2018-11-29 17:38:48.000000',
                                    timezone: 'US/Eastern',
                                    timezone_type: 3,
                                },
                            },
                            {
                                timeEntryId: 998,
                                projectId: 47,
                                projectName: 'Annihilation',
                                projectCampaignId: 156,
                                campaignName: 'Theatrical Teaser/Trai',
                                projectCampaignName: 'Massey',
                                spotId: null,
                                spotName: null,
                                versionId: null,
                                versionName: null,
                                versionSequence: null,
                                activityId: 4,
                                activityName: 'Dailies Assembly',
                                activityDescription: '',
                                activityIsBillable: false,
                                userId: 19,
                                userName: 'ACAPUTO',
                                userFirstName: 'Ashley',
                                userLastName: 'Caputo',
                                userInitials: 'AC',
                                userImage: null,
                                duration: '4.30',
                                startDate: {
                                    date: '2018-12-23 13:38:48.000000',
                                    timezone: 'US/Eastern',
                                    timezone_type: 3,
                                },
                            },
                            {
                                timeEntryId: 999,
                                projectId: 47,
                                projectName: 'Annihilation',
                                projectCampaignId: 156,
                                campaignName: 'Theatrical Teaser/Trai',
                                projectCampaignName: 'Massey',
                                spotId: 2,
                                spotName: '#1 Interrogation',
                                versionId: null,
                                versionName: null,
                                versionSequence: null,
                                activityId: 8,
                                activityName: 'Edit',
                                activityDescription: null,
                                activityIsBillable: true,
                                userId: 19,
                                userName: 'ACAPUTO',
                                userFirstName: 'Ashley',
                                userLastName: 'Caputo',
                                userInitials: 'AC',
                                userImage: null,
                                duration: '3.30',
                                startDate: {
                                    date: '2018-05-03 18:50:29.000000',
                                    timezone: 'US/Eastern',
                                    timezone_type: 3,
                                },
                            },
                        ],
                        unbilledSpots: [
                            {
                                spotId: 2,
                                spotName: '#1 Interrogation',
                                projectCampaignId: 156,
                                numberOfRevisions: 5,
                                graphicsIncluded: false,
                                firstRevisionCost: 45000,
                                firstRevisionIsBilled: true,
                                billingType: null,
                                billingNote: null,
                            },
                            {
                                spotId: 79,
                                spotName: '#2 Saved',
                                projectCampaignId: 156,
                                numberOfRevisions: 4,
                                graphicsIncluded: false,
                                firstRevisionCost: 12500,
                                firstRevisionIsBilled: false,
                                billingType: 'R' as SpotBillingType,
                                billingNote: 'Spec revised, is billable',
                            },
                        ],
                        bill: {
                            billId: 1,
                            billStatusId: 1,
                            billStatusName: 'Draft',
                            billTypeId: null,
                            billTypeName: null,
                            selectedSpots: [79],
                            selectedRateCardId: null,
                            timeEntries: [],
                            rows: [],
                        },
                    },
                ]}
            >
                {([billFromApi]) => {
                    if (billFromApi.fetchError) {
                        return (
                            <DataFetchError
                                errorLabel="Could not fetch bill data"
                                buttonLabel="Click here to try again"
                                onRefetch={billFromApi.retry}
                            />
                        );
                    }

                    if (billFromApi.loading || billFromApi.response === null) {
                        return (
                            <LoadingShade contentCentered={true} isStatic={true} background="transparent">
                                <LoadingSpinner />
                            </LoadingShade>
                        );
                    }

                    return billFromApi.response.bill.billStatusId === SpotSentBillStatus.Draft ? (
                        <DraftBillSpotForm billData={billFromApi.response} showPreview={this.isPreview} />
                    ) : (
                        <ApprovedBillSpotForm bill={billFromApi.response} />
                    );
                }}
            </FetchQueryMock>
        );
    }

    private setHeader = (billId: number | null) => {
        HeaderActions.replaceMainHeaderContent({
            title: billId ? 'Preparing the bill' : 'Bill does not exist',
            elements: [<BackToSpotsToBillListButton key="back-to-spots-to-bill" />],
        });
    };
}
