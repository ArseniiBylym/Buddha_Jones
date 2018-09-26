import * as React from 'react';
import { observer } from 'mobx-react';
/*import {action, observable} from 'mobx';*/
import { DropdownContainer, OptionsList } from '../../../../components/Form';

// Props
interface ProjectBoardFilterProps {
    label: string;
    value?: string;
    width?: number;
    float?: 'left' | 'right' | 'none';
}

// Component
@observer
export class ProjectBoardFilter extends React.Component<ProjectBoardFilterProps, {}> {

    /*@observable private selectedVal: OptionsListValuePropType = '';*/

    static get defaultProps(): ProjectBoardFilterProps {
        return {
            label: '',
            value: '',
            width: 200,
            float: 'none'
        };
    }

    public render() {
        return (
            <section style={{width: this.props.width, float: this.props.float}}>
                <DropdownContainer
                    label={this.props.label}
                    value={this.props.value}
                    type="field"
                >
                    <OptionsList
                        value={
                            'No status'
                        }
                        options={[
                            ...[
                                {
                                    value: null,
                                    label: 'No status',
                                },
                            ],
                            ...[
                                {
                                    value: 'aaaaaa',
                                    label: 'aaaaaaa',
                                },
                                {
                                    value: 'bbbbbb',
                                    label: 'bbbbbbbb',
                                },
                            ],
                        ]}
                    />
                </DropdownContainer>
            </section>
        );
    }

/*
    @action
    private handleVersionStatusChange = (option: { value: OptionsListValuePropType; label: string }) => {
        this.selectedVal = option.value;
    };
*/

}
