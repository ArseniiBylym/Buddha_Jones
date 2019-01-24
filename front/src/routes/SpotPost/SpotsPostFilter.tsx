import { InputSearch } from 'components/Form';
import { LoadingIndicator } from 'components/Loaders';
import { Section } from 'components/Section';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import SpotsPostTable from './SpotsPostTable';
import * as moment from 'moment';
// import './SpotsPost.css';

const s = require('./SpotsPost.css');

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

    @observable filterActive: {production: boolean, finishing: boolean} = {production: false, finishing: false}; 

    @computed
    private get spots(): any {

        const query = this.props.search.toLowerCase().trim();
        let list: any[] = [];

        if (this.props.spots && this.props.spots.data && this.props.spots.data.length > 0) {
            list = this.props.spots.data.filter(() => {
                return true;
            });

            if (this.filterActive.production && !this.filterActive.finishing) {
                list = list.filter((item, i) => {
                    return !item.finishRequest;
                });
            }

            if (this.filterActive.finishing && !this.filterActive.production) {
                list = list.filter((item, i) => {
                    return item.finishRequest;
                });
            }
            
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

            list.sort((a: any, b: any): any => {
                if (+a.spotSentRequestId > +b.spotSentRequestId) {
                    return 1; 
                }
                if (+a.spotSentRequestId < +b.spotSentRequestId) {
                    return -1;
                }
                if (+a.spotSentRequestId === +b.spotSentRequestId) {
                     if (a.spotName > b.spotName) {
                         return 1;
                     }
                     if (a.spotName < b.spotName) {
                         return -1;
                     }
                     if (a.spotName === b.spotName) {
                         if (a.versionName > b.versionName) {
                             return 1;
                         }
                         if (a.versionName < b.versionName) {
                             return -1;
                         } else {
                             return 0;
                         }
                     }
                }
            });
            
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
                        key: 'filter-buttons',
                        minWidth: 500,
                        element: (
                            this.getFilterButtons()
                        ),
                    },
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

    private getFilterButtons = () => {
        return (
            <div className={s.filterButtonWrapper}>
                <div onClick={this.filterHandlerAction('production')} className={this.getFilterButtonStyle('production')}>Production</div>
                <div onClick={this.filterHandlerAction('finishing')} className={this.getFilterButtonStyle('finishing')}>Finishing</div>
            </div>
        );
    }

    @action
    private filterHandlerAction = (name: string) => e => {
            this.filterActive[name] = this.filterActive[name] ? false : true; 
    }

    private getFilterButtonStyle = (name: string): string => {
        return this.filterActive[name] ? s.filterButton__active : s.filterButton;
    }

    private handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChangeSearch(e.target.value);
    };

}
