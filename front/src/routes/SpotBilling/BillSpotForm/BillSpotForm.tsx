import { HeaderActions } from 'actions';
import { DataFetchError } from 'components/Errors/DataFetchError';
import { LoadingShade, LoadingSpinner } from 'components/Loaders';
import { FetchQueryMock } from 'fetch';
import { SpotSentBillStatus } from 'invariables';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppState } from 'store/AllStores';
import { SpotBillFormSummary } from 'types/spotBilling';
import { ApprovedBillSpotForm } from './ApprovedBillSpotForm';
import { BackToSpotsToBillListButton, BillIdDoesNotExist } from './BillSpotFormElements';
import { DraftBillSpotForm } from './DraftBillSpotForm';

interface Props extends AppState {}

@inject('store')
@observer
export default class BillSpotForm extends React.Component<Props, {}> {
    @observable private billId: number | null = null;

    constructor(props: Props) {
        super(props);

        // Set bill ID coming from URL
        if (this.props.match && this.props.match.params && this.props.match.params['id']) {
            const billId = parseInt(this.props.match.params['id'], 10);
            this.billId = !isNaN(billId) && billId ? billId : null;
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
    }

    public render() {
        if (this.billId === null) {
            return <BillIdDoesNotExist />;
        }

        return (
            <FetchQueryMock<SpotBillFormSummary>
                mockResponses={[
                    {
                        billId: 1,
                        billStatusId: 1,
                        billStatusName: 'Draft',
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
                        spots: [
                            {
                                spotId: 79,
                                spotName: '#2 Saved',
                                timeEntries: [],
                            },
                        ],
                        bill: {
                            typeId: 2,
                            typeName: 'Revisions',
                            firstStage: [],
                            activities: [],
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

                    return billFromApi.response.billStatusId === SpotSentBillStatus.Draft ? (
                        <DraftBillSpotForm bill={billFromApi.response} />
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
