import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { AppState } from '../../../../store/AllStores';
import { Checkmark } from '../../../../components/Form';
import { SpotSentActions } from 'actions';
import { SpotSentAudioOptionsFromApi } from '../../../../types/spotSent';

// Props
interface ProducerSpotSentFormFinishRequestProps {
    audio: SpotSentAudioOptionsFromApi;
}

// Types
type ProducerSpotSentFormPropsTypes = ProducerSpotSentFormFinishRequestProps & AppState;

// Component
@inject('store')
@observer
class AudioCheckMark extends React.Component<ProducerSpotSentFormPropsTypes, {}> {
    public render() {
        if (!this.props.store) {
            return null;
        }
        const {
            audio,
            store: {
                spotSent: {
                    spotSentDetails
                }
            }
        } = this.props;

        return (
            <Checkmark
                onClick={this.handleAudioCheck}
                checked={(spotSentDetails.audio) ? spotSentDetails.audio.includes(audio.id) : false}
                label={audio.name}
                type={'no-icon'}
            />
        );
    }

    private handleAudioCheck = () => SpotSentActions.handleAudioCheck(this.props.audio);
}

export default AudioCheckMark;
