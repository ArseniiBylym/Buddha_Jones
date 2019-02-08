import * as React from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import { DropdownContainer, OptionsList, OptionsListValuePropType } from '../../../../components/Form';
import { ProjectsVersionsActions } from '../../../../actions';
import { ProjectVersionStatus } from '../../../../types/projectVersions';

// Props
interface ProjectBoardFilterProps {
    label: string;
    value: ProjectVersionStatus;
    options: ProjectBoardFilterOption[];
    width?: number;
    float?: 'left' | 'right' | 'none';
}

interface ProjectBoardFilterOption {
    id: OptionsListValuePropType;
    name: string;
}

interface ProjectBoardFilterOptionSelected {
    value: number | null;
    label: string;
}

// Component
@observer
export class ProjectBoardFilter extends React.Component<ProjectBoardFilterProps, {}> {

    private versionStatusDropdown: DropdownContainer | null = null;

    static get defaultProps(): ProjectBoardFilterProps {
        return {
            label: '',
            value: {
                id: null,
                name: 'All status'
            },
            float: 'none',
            options: []
        };
    }

    componentWillUnmount = () => {
        ProjectsVersionsActions.changeFilterVersionStatus({
            id: null,
            name: 'All status',
        });
    }

    public render() {
        return (
            <section style={{width: this.props.width, float: this.props.float}}>
                <DropdownContainer
                    ref={this.referenceVersionStatusDropdown}
                    label={this.props.label}
                    value={this.props.value.name}
                    type="field"
                >
                    <OptionsList
                        onChange={this.handleVersionStatusChange}
                        value={this.props.value.name}
                        options={[
                            ...[
                                {
                                    value: null,
                                    label: 'All status',
                                },
                            ],
                            ...this.props.options.map(status => ({
                                value: status.id,
                                label: status.name,
                            })),
                        ]}
                    />
                </DropdownContainer>
            </section>
        );
    }

    @action
    private handleVersionStatusChange = (option: ProjectBoardFilterOptionSelected) => {
        let selectedVersionStatus: ProjectVersionStatus = {
            id: option.value,
            name: option.label,
        };
        ProjectsVersionsActions.changeFilterVersionStatus(selectedVersionStatus);
        if (this.versionStatusDropdown) {
            this.versionStatusDropdown.closeDropdown();
        }
    };

    private referenceVersionStatusDropdown = (ref: DropdownContainer) => (this.versionStatusDropdown = ref);

}
