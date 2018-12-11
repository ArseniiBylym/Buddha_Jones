import { HeaderActions } from 'actions';
import { Section } from 'components/Section';
import { inject } from 'mobx-react';
import * as React from 'react';
import { AppState } from 'store/AllStores';

interface SpotsToBillPageProps extends AppState {}

@inject('store')
class SpotsToBillPage extends React.Component<SpotsToBillPageProps, {}> {
    componentDidMount() {
        HeaderActions.replaceMainHeaderContent({
            title: 'Spots ready for billing',
        });
    }

    public render() {
        return (
            <>
                <Section title="All billable spots" noSeparator={true}>
                    <div />
                </Section>
            </>
        );
    }
}

export default SpotsToBillPage;
