import * as React from 'react';
import { ProjectPickerSections } from '.';
import { Button } from '../Button';

export interface ProjectPickerResult {
    section: ProjectPickerSections;
    id: number;
    campaignId: number | null;
    name: string;
    clientId: number | null;
    clientName: string | null;
}

interface Props {
    entry: {
        section: ProjectPickerSections;
        id: number;
        campaignId?: number;
        name: string;
        clientId: number | null;
        clientName: string | null;
        trtId?: number | null;
    };
    spotName: string;
    onResultPicked: (result: ProjectPickerResult) => void;
}

export class ProjectPickerEntry extends React.PureComponent<Props, {}> {
    public render() {
        return (
            <li>
                <Button
                    onClick={this.handleResultPick}
                    label={{
                        text: this.props.spotName,
                        size: 'small',
                        color: 'blue',
                        onLeft: true,
                    }}
                />
            </li>
        );
    }

    private handleResultPick = () => {
        this.props.onResultPicked({
            section: this.props.entry.section,
            id: this.props.entry.id,
            campaignId: this.props.entry.campaignId ? this.props.entry.campaignId : null,
            name: this.props.entry.name,
            clientId: this.props.entry.clientId,
            clientName: this.props.entry.clientName,
        });
    };
}
