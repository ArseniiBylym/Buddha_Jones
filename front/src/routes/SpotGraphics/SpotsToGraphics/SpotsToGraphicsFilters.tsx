import {
    DropdownContainer,
    InputSearch,
    OptionsListOptionProp
    } from 'components/Form';
import { LoadingIndicator } from 'components/Loaders';
import { Section } from 'components/Section';
// import { SearchHandler } from 'helpers/SearchHandler';
import _debounce from 'lodash-es/debounce';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { SpotToGraphicsFromApi, SpotToGraphicsProducer } from 'types/spotsToGraphics';
import { SpotProjectCampaignGroup } from './SpotsToGraphics';
import { SpotsToGraphicsGrid } from './SpotsToGraphicsGrid';
// import { concat } from 'lodash-es';

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

    @computed
    private get spots(): { count: number; list: SpotToGraphicsFromApi[] } {

        const query = this.props.search.toLowerCase().trim();
        // const producerId = this.props.producer && this.props.producer.id; 
        let list: any[] = [];

        list = this.props.spotsResponse.filter(() => {
            return true;
        });
        console.log(list);

        if (query)  {
            list = list.filter((item, i) => {
                if (item.campaignName.indexOf(query) !== -1 ||
                    item.customerName.indexOf(query) !== -1 ||
                    item.projectName.indexOf(query) !== -1 ||
                    item.studioName.indexOf(query) !== -1
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

    @computed
    private get allProducers(): SpotToGraphicsProducer[] {
        let producersList: any[] = [];

        if (this.props.spotsResponse && this.props.spotsResponse.length > 0) {
            this.props.spotsResponse.forEach((project, i) => {
                let spots = project.spot.filter((spot, j) => {
                    return !!spot;
                });

                spots.forEach((elem) => {
                    let producers = elem.producers.filter((producer) => {
                        return !!producer;
                    });

                    producersList.push(...producers);
                });
            });
        }
        let obj = {};

        producersList.forEach((elem, i) => {
           if (!obj[elem.userId]) {
                obj[elem.userId] = elem;
           }
        });

        let newProducersList: any[] = [];

        for (let key in obj) {
            if (obj[key]) {
                newProducersList.push(obj[key]);
            }
        }

        return newProducersList;
    }

    public render() {
        const { search, producer, loading, fetchError } = this.props;
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
                    // {
                    //     key: 'filter-by-producer',
                    //     element: (
                    //         <DropdownContainer ref={this.referenceProducerDropdown} label="Producer" align="right">
                    //             <OptionsList
                    //                 onChange={this.handleProducerChange}
                    //                 value={producer ? producer.id : null}
                    //                 options={[
                    //                     {
                    //                         key: 'all',
                    //                         value: null,
                    //                         label: 'All producers',
                    //                     },
                    //                     ...this.allProducers.map(prod => ({
                    //                         value: prod.userId,
                    //                         label: [prod.firstName, prod.lastName].filter(n => n !== null).join(' '),
                    //                     })),
                    //                 ]}
                    //             />
                    //         </DropdownContainer>
                    //     ),
                    // },
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
