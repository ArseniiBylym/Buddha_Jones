import { InputSearch } from 'components/Form';
import { LoadingIndicator } from 'components/Loaders';
import { Section } from 'components/Section';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { SpotToGraphicsFromApi } from 'types/spotsToGraphics';
import { SpotProjectCampaignGroup } from './SpotsToGraphics';
import { SpotsToGraphicsGrid } from './SpotsToGraphicsGrid';

export interface SpotToGraphicsProducerOption {
    id: number;
    name: string;
}

interface SpotsToGrapnicsFiltersProps {
    onChangeSearch: (search: string) => void;
    onChangeProducer?: (producer: SpotToGraphicsProducerOption | null) => void;
    onSpotSelectionToggle?: (spotId: number, projectCampaignId: number) => void;
    selectedSpots?: SpotProjectCampaignGroup[];
    search: string;
    producer?: SpotToGraphicsProducerOption | null;
    loading: boolean;
    fetchError: boolean;
    retryFetch: () => void;
    totalCountResponse: number;
    spotsResponse: any[];
    routeType?: string;
    forceUpdating?: () => void;
}

@observer
export class SpotsToGrapnicsFilters extends React.Component<SpotsToGrapnicsFiltersProps, {}> {

    @computed
    private get spots(): { count: number; list: SpotToGraphicsFromApi[] } {

        const query = this.props.search.toLowerCase().trim();
        let list: any[] = [];

        list = this.props.spotsResponse.filter(() => {
            return true;
        });

        if (query)  {
            list = list.filter((item, i) => {
                if (item.projectName.toLowerCase().indexOf(query) !== -1 ||
                    item.studioName.toLowerCase().indexOf(query) !== -1 ||
                    item.campaignName.toLowerCase().indexOf(query) !== -1 ||
                    this.spotNameMatch(item, query)
                ) {
                    return true;
                } else {
                    return false;
                }
            });
        }

        return {
            count: list.length,
            list: list,
        };
    }

    public spotNameMatch = (elem: any, query) => {
        return elem.spot.some(spot => {
            return spot.spotName.toLowerCase().indexOf(query) !== -1;
        });
    }

    public render() {
        const { search, loading, fetchError } = this.props;
        return (
            <Section
                title=""
                noSeparator={true}
                headerElements={[
                    ...(loading && this.props.totalCountResponse > 0
                        ? [
                              {
                                  key: 'loading-indicator',
                                  element: <LoadingIndicator label="Refreshing" />,
                              },
                          ]
                        : []),
                    {
                        key: 'filter-by-query',
                        element: (
                            <InputSearch
                                onChange={this.handleSearchChange}
                                label="Search spots by name, campaign, project or studio"
                                value={search}
                                minWidth={400}
                            />
                        ),
                    },
                ]}
            >
                <SpotsToGraphicsGrid
                    loading={loading}
                    fetchError={fetchError}
                    retryFetch={this.props.retryFetch}
                    onSpotSelectionToggle={this.props.onSpotSelectionToggle}
                    spots={this.spots}
                    producerId={this.props.producer && this.props.producer.id}
                    query={this.props.search.toLowerCase().trim()}
                    routeType={this.props.routeType}
                    forceUpdating={this.props.forceUpdating}
                />
            </Section>
        );
    }

    private handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChangeSearch(e.target.value);
    };

}
