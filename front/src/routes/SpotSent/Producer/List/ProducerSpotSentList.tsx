import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { HeaderActions } from 'actions';
import { Paragraph } from 'components/Content';
import { ButtonAdd } from 'components/Button';
import { history } from 'App';

// Styles
require('./ProducerSpotSentList.css');

// Props
interface ProducerSpotSentListProps {}

// Component
@inject('store')
@observer
class ProducerSpotSentList extends React.Component<ProducerSpotSentListProps, {}> {
    public componentDidMount() {
        HeaderActions.setMainHeaderTitlesAndElements('Spots sent', null, null, null, [
            <ButtonAdd
                key="create-spot-sent"
                onClick={this.handleCreateSpotSentReport}
                label="Create new spot sent report"
                labelOnLeft={true}
                isWhite={true}
            />,
        ]);
    }

    public render() {
        return <Paragraph type="dim">No spots sent exist yet.</Paragraph>;
    }

    private handleCreateSpotSentReport = (e: React.MouseEvent<HTMLButtonElement>) => {
        history.push('/portal/studio/producer-spot-sent/report');
    };
}

export default ProducerSpotSentList;
