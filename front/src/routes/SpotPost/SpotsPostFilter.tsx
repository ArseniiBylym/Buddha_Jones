import { InputSearch } from 'components/Form';
import { LoadingIndicator } from 'components/Loaders';
import { Section } from 'components/Section';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import SpotsPostTable from './SpotsPostTable';
import * as moment from 'moment';

export interface SpotToGraphicsProducerOption {
    id: number;
    name: string;
}

// interface SpotsToGrapnicsFiltersProps {
//     onChangeSearch: (search: string) => void;
//     search: string;
//     loading: boolean;
//     fetchError: boolean;
//     retryFetch: () => void;
//     spots: any[];
//     routeType?: string;
//     forceUpdating?: () => void;
// }

@observer
export class SpotsPostFilter extends React.Component<any, {}> {

    @computed
    private get spots(): any {

        const query = this.props.search.toLowerCase().trim();
        let list: any[] = [];

        if (this.props.spots && this.props.spots.data && this.props.spots.data.length > 0) {
            list = this.props.spots.data.filter(() => {
                return true;
            });
            
            if (query)  {
                list = list.filter((item, i) => {
                    if (item.projectName.toLowerCase().indexOf(query) !== -1 ||
                        (item.spotSentDate && moment(item.spotSentDate.date).format('DD/MM/YYYY').indexOf(query) !== -1)
                    ) {
                        return true;
                    } else {
                        return false;
                    }
                });
            } 
            
            return list;
        } else {
            return [];
        }
        
    }

    public spotNameMatch = (elem: any, query) => {
        return elem.spot.some(spot => {
            return spot.projectName.toLowerCase().indexOf(query) !== -1;
        });
    }

    public render() {
        const { search, loading } = this.props;
        return (
            <Section
                title=""
                noSeparator={true}
                headerElements={[
                    ...(loading && this.props.spots && this.props.spots.length > 0
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
                                label="Search spots by date, project name"
                                value={search}
                                minWidth={400}
                            />
                        ),
                    },
                ]}
            >
              < SpotsPostTable config={this.spots}/>
            </Section>
        );
    }

    private handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChangeSearch(e.target.value);
    };

}
