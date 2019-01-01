import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { AppState } from '../../../../store/AllStores';
import { Input } from '../../../../components/Form';
import { SpotSentActions } from 'actions';
import { SpotSentAudioOptionsFromApi } from '../../../../types/spotSent';
import AudioCheckMark from './AudioCheckMark';

const s = require('./ProducerSpotSentForm.css');

// Props
interface ProducerSpotSentFormFinishRequestProps {
}

// Types
type ProducerSpotSentFormPropsTypes = ProducerSpotSentFormFinishRequestProps & AppState;

// Component
@inject('store')
@observer
class AudioSection extends React.Component<ProducerSpotSentFormPropsTypes, {}> {
    public render() {
        if (!this.props.store) {
            return null;
        }
        const { spotSent: { spotSentDetails } } = this.props.store;

        return (
            <>
                <div className={s.finishRequestSection}>
                    <h3>Audio</h3>
                    <div className={s.sentViaMethodsContainer}>
                        {this.getAudioOptions()}
                    </div>
                </div>
                <div className={s.finishRequestSection}>
                    <h3>Audio Notes</h3>
                    <Input
                        onChange={SpotSentActions.handleTextChange.bind(this, 'audio_note')}
                        value={(spotSentDetails.audio_note) as string}
                        label="Audio Notes..."
                    />
                </div>
            </>
        );
    }

    private getAudioOptions(): JSX.Element[] {
        if (!this.props.store) {
            return [];
        }
        const { spotSent } = this.props.store;

        if (spotSent.spotSentAudioOptions && spotSent.spotSentAudioOptions.length > 0) {
            return spotSent.spotSentAudioOptions.map((audio: SpotSentAudioOptionsFromApi, index: number) =>
                <AudioCheckMark audio={audio} key={`audio-checkbox-${index}`}/>
            );
        } else {
            return [];
        }
    }
}

export default AudioSection;