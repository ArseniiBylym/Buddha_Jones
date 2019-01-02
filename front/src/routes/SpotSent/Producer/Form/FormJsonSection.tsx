import * as React from 'react';
import { Section } from 'components/Section';
import { SpotSentValueForSubmit } from '../../../../types/spotSentForm';

// Props
interface FormJsonSectionProps {
    spotSentDetails: SpotSentValueForSubmit;
}

// Props
interface FormJsonSectionState {
    showJson: boolean;
}

class FormJsonSection extends React.PureComponent<FormJsonSectionProps, FormJsonSectionState> {
    constructor(props: FormJsonSectionProps) {
        super(props);

        this.state = {
            showJson: false,
        };
    }

    public render() {
        const { spotSentDetails } = this.props;
        return (
            <>
                <Section>
                    <button
                        onClick={this.toggleJson}
                    >
                        Show/Hide JSON
                    </button>
                </Section>
                {
                    this.state.showJson ?
                    <Section>
                        <pre>
                            {JSON.stringify(spotSentDetails.spot_version instanceof Array, null, 2)}
                        </pre>
                        <pre>
                            {JSON.stringify(spotSentDetails, null, 2)}
                        </pre>
                    </Section> : null
                }
            </>
        );
    }

    private toggleJson = () => this.setState({showJson: !this.state.showJson});
}

export default FormJsonSection;
