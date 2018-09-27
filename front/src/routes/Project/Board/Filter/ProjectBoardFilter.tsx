import * as React from 'react';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { DropdownContainer, OptionsList, OptionsListValuePropType } from '../../../../components/Form';

// Props
interface ProjectBoardFilterProps {
    label: string;
    options: ProjectBoardFilterOption[];
    value?: OptionsListValuePropType;
    width?: number;
    float?: 'left' | 'right' | 'none';
}

interface ProjectBoardFilterOption {
    id: OptionsListValuePropType;
    name: string;
}

interface ProjectBoardFilterOptionSelected {
    value: OptionsListValuePropType;
    label: string;
}

// Component
@observer
export class ProjectBoardFilter extends React.Component<ProjectBoardFilterProps, {}> {

    @observable private selectedOption: ProjectBoardFilterOptionSelected = {
        value: null,
        label: ''
    };

    static get defaultProps(): ProjectBoardFilterProps {
        return {
            label: '',
            value: '',
            width: 200,
            float: 'none',
            options: []
        };
    }

    public render() {
        return (
            <section style={{width: this.props.width, float: this.props.float}}>
                <DropdownContainer
                    label={this.props.label}
                    value={'test'}
                    type="field"
                >
                    <OptionsList
                        onChange={this.handleVersionStatusChange}
                        value={this.selectedOption ? this.selectedOption.value : 'No status'}
                        options={[
                            ...[
                                {
                                    value: null,
                                    label: 'No status',
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
        this.selectedOption = option;
    };

}
