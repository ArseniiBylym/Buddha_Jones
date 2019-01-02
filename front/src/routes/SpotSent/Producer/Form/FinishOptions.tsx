import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { AppState } from '../../../../store/AllStores';
import { SpotSentActions } from 'actions';
import { Checkmark, Input } from '../../../../components/Form';

const s = require('./ProducerSpotSentForm.css');
// Props
interface ProducerSpotSentFormFinishRequestProps {
}

// Types
type ProducerSpotSentFormPropsTypes = ProducerSpotSentFormFinishRequestProps & AppState;

// Component
@inject('store')
@observer
class FinishOptions extends React.Component<ProducerSpotSentFormPropsTypes, {}> {
    public render() {
        if (!this.props.store) {
            return null;
        }
        const {
            spotSent: {
                spotSentDetails
            }
        } = this.props.store;

        return (
            <>
                <div className={s.finishRequestSection}>
                    <h3>Framerate</h3>
                    <div className={s.sentViaMethodsContainer}>
                        {this.getFrameRate()}
                    </div>
                </div>
                <div className={s.finishRequestSection}>
                    <h3>Framerate Notes</h3>
                    <Input
                        onChange={SpotSentActions.handleTextChange.bind(this, 'framerate_note')}
                        value={(spotSentDetails.framerate_note) as string}
                        label="Framerate Notes..."
                    />
                </div>
                <div className={s.finishRequestSection}>
                    <h3>Raster Size</h3>
                    <div className={s.sentViaMethodsContainer}>
                        {this.getRasterSize()}
                    </div>
                </div>
                <div className={s.finishRequestSection}>
                    <h3>Raster Size Notes</h3>
                    <Input
                        onChange={SpotSentActions.handleTextChange.bind(this, 'raster_size_note')}
                        value={(spotSentDetails.raster_size_note as string)}
                        label="Raster Size Notes..."
                    />
                </div>
            </>
        );
    }

    private getFrameRate(): JSX.Element[] {
        if (!this.props.store) {
            return [];
        }

        const {spotSent, spotSent: { spotSentDetails }} = this.props.store;

        if (spotSent.spotSentFramerateOptions && spotSent.spotSentFramerateOptions.length > 0) {
            return spotSent.spotSentFramerateOptions.map((frameRate: string, index: number) => {
                return (
                    <Checkmark
                        key={'frame-rate-' + index}
                        onClick={() => {
                            spotSentDetails.framerate = frameRate;
                        }}
                        checked={(spotSentDetails.framerate === frameRate) ? true : false}
                        label={frameRate}
                        type={'no-icon'}
                    />
                );
            });
        } else {
            return [];
        }
    }

    private getRasterSize(): JSX.Element[] {
        if (!this.props.store) {
            return [];
        }

        const {spotSent, spotSent: { spotSentDetails }} = this.props.store;

        if (spotSent.spotSentRasterSizeOptions && spotSent.spotSentRasterSizeOptions.length > 0) {
            return spotSent.spotSentRasterSizeOptions.map((rasterSize: string, index: number) => {
                return (
                    <Checkmark
                        key={'raster-size-' + index}
                        onClick={() => {
                            spotSentDetails.raster_size = rasterSize;
                        }}
                        checked={(spotSentDetails.raster_size === rasterSize) ? true : false}
                        label={rasterSize}
                        type={'no-icon'}
                    />
                );
            });
        } else {
            return [];
        }
    }
}

export default FinishOptions;
