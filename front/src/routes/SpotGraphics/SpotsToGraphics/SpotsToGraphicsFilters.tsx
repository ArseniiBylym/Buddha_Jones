import {
    DropdownContainer,
    InputSearch,
    OptionsList,
    OptionsListOptionProp
    } from 'components/Form';
import { LoadingIndicator } from 'components/Loaders';
import { Section } from 'components/Section';
import { SearchHandler } from 'helpers/SearchHandler';
import _debounce from 'lodash-es/debounce';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { SpotToGraphicsFromApi, SpotToGraphicsProducer } from 'types/spotsToGraphics';
import { SpotProjectCampaignGroup } from './SpotsToGraphics';
import { SpotsToGraphicsGrid } from './SpotsToGraphicsGrid';

export interface SpotToGraphicsProducerOption {
    id: number;
    name: string;
}

interface SpotsToGrapnicsFiltersProps {
    onChangeSearch: (search: string) => void;
    onChangeProducer: (producer: SpotToGraphicsProducerOption | null) => void;
    onSpotSelectionToggle: (spotId: number, projectCampaignId: number) => void;
    selectedSpots?: SpotProjectCampaignGroup[];
    search: string;
    producer: SpotToGraphicsProducerOption | null;
    loading: boolean;
    fetchError: boolean;
    retryFetch: () => void;
    totalCountResponse: number;
    spotsResponse: any[];
}

@observer
export class SpotsToGrapnicsFilters extends React.Component<SpotsToGrapnicsFiltersProps, {}> {
    private producerDropdown: DropdownContainer | null = null;

    // @computed
    // private get spotsList() {

    // }

    @computed
    private get spots(): { count: number; list: SpotToGraphicsFromApi[] } {
        const query = this.props.search.toLowerCase().trim();
        const producerId: number | null = this.props.producer ? this.props.producer.id : null;

        const list = this.props.spotsResponse.reduce((spots: SpotToGraphicsFromApi[], spot) => {
            let queryMatch: boolean = false;
            let producerMatch: boolean = false;

            if (query === '') {
                queryMatch = true;
            } else {
                queryMatch =
                    SearchHandler.searchPhraseInString(spot.spotName, query, true, false) ||
                    SearchHandler.searchPhraseInString(spot.campaignName, query, true, true) ||
                    SearchHandler.searchPhraseInString(spot.projectCampaignName || '', query, true, false) ||
                    SearchHandler.searchPhraseInString(spot.projectName, query, true, true) ||
                    SearchHandler.searchPhraseInString(spot.studioName, query, true, true);
            }

            if (producerId === null || (producerId && spot.producers.findIndex(p => p.userId === producerId) !== -1)) {
                producerMatch = true;
            }

            if (queryMatch && producerMatch) {
                spots.push(spot);
            }
            console.log(spots);
            return spots;
        }, []);

        console.log(list, list.length);

        return {
            count: list.length,
            list: list,
        };
    }

    componentDidMount = () => {
        console.log(this.props.spotsResponse);
    }
    componentDidUpdate = () => {
        console.log(this.props.spotsResponse);
    }

    @computed
    private get allProducers(): SpotToGraphicsProducer[] {
        let producersIds: number[] = [];

        let producersList: SpotToGraphicsProducer[] = [];

        if (this.props.spotsResponse.length > 0) {

            this.props.spotsResponse.forEach((item, i) => {
                if (item.campaing && item.campaign.length > 0) {
                    item.campaing.forEach((item1: any, i1) => {
                        item1.sport.forEach((item2: any, i2) => {
                            item2.producers.forEach((item3, i3) => {
                                producersList.push(item3);
                            });
                        });
                    });
                } 
            });
            
            return producersList;
        } else {
            return [];
        }
        // return this.props.spotsResponse.reduce((producers: SpotToGraphicsProducer[], spot) => {

        //     let producersList: SpotToGraphicsProducer[] = [];

        //     spot.producers.forEach(producer => {
        //         const match = producersIds.indexOf(producer.userId) !== -1;
        //         if (!match) {
        //             producersIds.push(producer.userId);
        //             producers.push(producer);
        //         }
        //     });

        //     return producersList;
        // }, []);
    }

    public render() {
        console.log(this.props.spotsResponse);
        const { search, producer, loading, fetchError } = this.props;
        return (
            <Section
                title="Billable spots"
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
                        key: 'filter-by-producer',
                        element: (
                            <DropdownContainer ref={this.referenceProducerDropdown} label="Producer" align="right">
                                <OptionsList
                                    onChange={this.handleProducerChange}
                                    value={producer ? producer.id : null}
                                    options={[
                                        {
                                            key: 'all',
                                            value: null,
                                            label: 'All producers',
                                        },
                                        ...this.allProducers.map(prod => ({
                                            value: prod.userId,
                                            label: [prod.firstName, prod.lastName].filter(n => n !== null).join(' '),
                                        })),
                                    ]}
                                />
                            </DropdownContainer>
                        ),
                    },
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
                />
            </Section>
        );
    }

    private referenceProducerDropdown = (ref: DropdownContainer) => (this.producerDropdown = ref);

    private handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChangeSearch(e.target.value);
    };

    private handleProducerChange = (option: OptionsListOptionProp) => {
        this.props.onChangeProducer(option ? { id: option.value as number, name: option.label } : null);

        if (this.producerDropdown) {
            this.producerDropdown.closeDropdown();
        }
    };
}
