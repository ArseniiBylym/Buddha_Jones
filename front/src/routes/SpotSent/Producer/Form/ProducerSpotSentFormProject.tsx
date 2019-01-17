import {
    ProjectPicker,
    ProjectPickerGroupValues,
    ProjectPickerSections,
    ProjectPickerValues
    } from 'components/Buddha';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { AppOnlyStoreState } from 'store/AllStores';

// Props
interface ProducerSpotSentFormProjectProps {
    onProjectChange: (values: ProjectPickerValues | null) => void;
    onDateChange: (date: Date | null) => void;
    project: ProjectPickerGroupValues | null;
    clientId: number | null;
    date: Date;
    isClosedWhenInit?: boolean;
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
                    // headerElements={[
                    //     {
                    //         element: (
                    //             <DatePicker
                    //                 key="date-picker"
                    //                 label="Spot sent date"
                    //                 value={this.props.date}
                    //                 align="right"
                    //             />
                    //         ),
                    //     },
                    // ]}
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
                    openOn={this.props.isClosedWhenInit ? null : ProjectPickerSections.project}
                    requiredSelection="project"
                    noSeparator={true}
                    isSubmoduleVisible={true}
                />
            </>
        );
    }

    private handleProjectChange = (values: ProjectPickerValues | null) => {
        this.props.onProjectChange(values);
    };
}
