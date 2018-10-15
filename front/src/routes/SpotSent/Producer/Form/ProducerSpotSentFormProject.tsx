import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { ProjectPicker, ProjectPickerValues, ProjectPickerGroupValues } from 'components/Buddha';
import { AppOnlyStoreState } from 'store/AllStores';

// Props
interface ProducerSpotSentFormProjectProps {
    onProjectChange: (values: ProjectPickerValues | null) => void;
    onDateChange: (date: Date | null) => void;
    project: ProjectPickerGroupValues | null;
    clientId: number | null;
    date: Date;
}

// Types
type ProducerSpotSentFormProjectPropsTypes = ProducerSpotSentFormProjectProps & AppOnlyStoreState;

// Component
@inject('store')
@observer
export class ProducerSpotSentFormProject extends React.Component<ProducerSpotSentFormProjectPropsTypes, {}> {
    public render() {
        return (
            <>
                <ProjectPicker
                    headerElements={[
                        /*{
                            element: (
                                <DatePicker
                                    key="date-picker"
                                    label="Spot sent date"
                                    value={this.props.date}
                                    align="right"
                                />
                            ),
                        },*/
                    ]}
                    onChange={this.handleProjectChange}
                    forUserId={this.props.store!.user.data!.id}
                    value={{
                        project: this.props.project,
                        projectCampaign: null,
                        spot: null,
                        version: null,
                        customerId: this.props.clientId,
                    }}
                    title="Pick project"
                    show="project"
                    openOn="project"
                    requiredSelection="project"
                    noSeparator={true}
                />
            </>
        );
    }

    private handleProjectChange = (values: ProjectPickerValues | null) => {
        this.props.onProjectChange(values);
    };
}
