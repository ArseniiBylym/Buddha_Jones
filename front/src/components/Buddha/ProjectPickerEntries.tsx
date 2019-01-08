import * as React from 'react';
import { ProjectPickerSections } from '.';
import {
    CampaignsResult,
    CampaignsResultsEntry,
    ProjectsResult,
    ProjectsResultsEntry,
    SpotsResult,
    SpotsResultsEntry,
    VersionsResult,
    VersionsResultsEntry,
} from 'types/projectsCampaignsSpots';
import { truncate } from 'lodash-es';
import { ProjectPickerEntry, ProjectPickerResult } from './ProjectPickerEntry';
import { TRTItem } from '../../types/projectsCampaignsSpots';

interface Props {
    currentResults: ProjectsResult | CampaignsResult | SpotsResult | VersionsResult | null;
    sectionOpen: ProjectPickerSections | null;
    onResultPicked: (result: ProjectPickerResult) => void;
    userCanViewProjectCodeName: boolean;
    userCanViewProjectName: boolean;
    trtList: TRTItem[] | null;
}

interface Entry {
    section: ProjectPickerSections;
    id: number;
    campaignId?: number;
    name: string;
    clientId: number | null;
    clientName: string | null;
    trtId?: number | null;
}

export class ProjectPickerEntries extends React.Component<Props, {}> {
    public render() {
        return (
            this.mapEntries(this.props.currentResults).map((result, index: number) => {
                let spotName: string = result.name;

                if (result.trtId) {
                    spotName += ` (${this.getSpotTRTNameById(result.trtId)})`;
                }

                return (
                    <ProjectPickerEntry
                        key={`li-${result.id}-${index}`}
                        entry={result}
                        spotName={spotName}
                        onResultPicked={this.props.onResultPicked}
                    />
                );
            })
        );
    }

    private getSpotTRTNameById(trtId: number): string {
        if (this.props.trtList && this.props.trtList.length > 0) {
            const trtItem = this.props.trtList.find((item) => item.id === trtId);

            return trtItem ? trtItem.runtime : '';

        }

        return '';
    }

    private mapEntries(
        currentResults: ProjectsResult | CampaignsResult | SpotsResult | VersionsResult | null
    ): Entry[] {
        if (currentResults && currentResults.results && currentResults.results instanceof Array) {
            switch (this.props.sectionOpen) {
                case ProjectPickerSections.project:
                    return (currentResults.results as ProjectsResultsEntry[]).map(result => {
                        let name = '';

                        if (this.props.userCanViewProjectCodeName && this.props.userCanViewProjectName) {
                            name = result.projectCode
                                ? `(${result.projectCode})` + (result.projectName ? ' - ' + result.projectName : '')
                                : result.projectName ? result.projectName : '';
                        } else {
                            name = result.projectCode ? result.projectCode : result.projectName ? result.projectName : '';
                        }

                        return {
                            section: ProjectPickerSections.project,
                            id: result.id,
                            name: name,
                            clientId: result.customerId,
                            clientName: result.customerName,
                        };
                    });
                case ProjectPickerSections.projectCampaign:
                    return (currentResults.results as CampaignsResultsEntry[]).map(result => {
                        return {
                            section: ProjectPickerSections.projectCampaign,
                            id: result.id,
                            campaignId: result.campaignId,
                            name:
                            (result.campaignName || '') +
                            (result.note && result.note !== result.campaignName
                                ? ' - ' + truncate(result.note, { length: 32 })
                                : ''),
                            clientId: null,
                            clientName: null,
                        };
                    });
                case ProjectPickerSections.spot:
                    return (currentResults.results as SpotsResultsEntry[]).map(result => {
                        return {
                            section: ProjectPickerSections.spot,
                            id: result.id,
                            name: result.spotName,
                            clientId: null,
                            clientName: null,
                            trtId: result.trtId
                        };
                    });
                case ProjectPickerSections.version:
                default:
                    return (currentResults.results as VersionsResultsEntry[]).map(result => {
                        return {
                            section: ProjectPickerSections.version,
                            id: result.id,
                            name: result.versionName,
                            clientId: null,
                            clientName: null,
                        };
                    });
            }
        }
        return [];
    }
}
