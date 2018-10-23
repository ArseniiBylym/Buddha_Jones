import * as React from 'react';
import { observer } from 'mobx-react';
import { DropdownContainer, OptionsList } from '../../../../components/Form';
import { OptionsListValuePropType } from '../../../../components/Form/OptionsList';

// Props
interface ProjectBoardCampaignCustomerSelectorProps {
    label: string;
    value: ProjectBoardCampaignCustomerSelector;
    options: ProjectBoardCampaignCustomerSelectorOption[];
    onChange?: ((option: { id: number; name: string } | null) => void) | null;
    studioId: number | null;
}

interface ProjectBoardCampaignCustomerSelectorOption {
    id: OptionsListValuePropType;
    name: string;
}

interface ProjectBoardCampaignCustomerSelectorOptionSelected {
    value: number | null;
    label: string;
}

interface ProjectBoardCampaignCustomerSelector {
    id: number | null;
    name: string;
}

// Component
@observer
export class CustomerSelector extends React.Component<ProjectBoardCampaignCustomerSelectorProps, {}> {

    private versionStatusDropdown: DropdownContainer | null = null;

    static get defaultProps(): ProjectBoardCampaignCustomerSelectorProps {
        return {
            label: '',
            value: {
                id: null,
                name: 'Edit client'
            },
            studioId: null,
            options: []
        };
    }

    public render() {
        return (
            <DropdownContainer
                ref={this.referenceCustomerSelectorDropdown}
                label={this.props.label}
                value={this.props.value.name}
                type="field"
            >
                <OptionsList
                    onChange={this.handleCustomerSelectorChange}
                    value={this.props.value.name}
                    options={[
                        ...[
                            {
                                value: null,
                                label: 'not selected',
                            },
                        ],
                        ...this.props.options.map(status => ({
                            value: status.id,
                            label: status.name,
                        })),
                    ]}
                />
            </DropdownContainer>
        );
    }

    private handleCustomerSelectorChange = (option: ProjectBoardCampaignCustomerSelectorOptionSelected) => {
        let selectedCustomerSelector: ProjectBoardCampaignCustomerSelector = {
            id: option.value
            , name: option.label
        };
        if (this.props.onChange) {
            this.props.onChange(selectedCustomerSelector as { id: number; name: string });
        }
        if (this.versionStatusDropdown) {
            this.versionStatusDropdown.closeDropdown();
        }
    };

    private referenceCustomerSelectorDropdown = (ref: DropdownContainer) => (this.versionStatusDropdown = ref);

}
