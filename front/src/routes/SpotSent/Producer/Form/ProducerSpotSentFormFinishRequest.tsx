import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { AppState } from '../../../../store/AllStores';
import { Section } from '../../../../components/Section';
import { Checkmark, Input, TextArea, Toggle } from '../../../../components/Form';
import { SpotSentActions } from 'actions';
import { DatePicker } from '../../../../components/Calendar';
import { SpotSentValueParentChildForSubmit } from '../../../../types/spotSentForm';
import { FinishingHousesPicker } from '../../../../components/Buddha/FinishingHousesPicker';
import { SpotSentOptionsChildrenFromApi } from '../../../../types/spotSent';
import AudioSection from './AudioSection';
import FinishOptions from './FinishOptions';
import * as classNames from 'classnames';

const s = require('./ProducerSpotSentForm.css');

// Props
interface ProducerSpotSentFormFinishRequestProps {
}

// Types
type ProducerSpotSentFormPropsTypes = ProducerSpotSentFormFinishRequestProps & AppState;

// Component
@inject('store')
@observer
class ProducerSpotSentFormFinishRequest extends React.Component<ProducerSpotSentFormPropsTypes, {}> {
    public render() {
        if (!this.props.store) {
            return null;
        }
        const { spotSent, spotSent: {spotSentDetails} } = this.props.store;

        return (
            <Section title="Finish Request">

                <div style={{ marginTop: '30px' }}>
                    <div className={s.typeFinishingOptions}>
                        {this.getTypeFinishingChildren()}
                    </div>
                    <Toggle
                        onChange={SpotSentActions.handleTogglingRequest}
                        toggleIsSetToRight={(spotSentDetails.finish_option && (spotSentDetails.finish_option as SpotSentValueParentChildForSubmit).parent === 1) ? false : true}
                        toggleOnLeft={{
                            label: (spotSent.spotSentFinishingOptions) ? spotSent.spotSentFinishingOptions[0].name : '',
                            value: (spotSent.spotSentFinishingOptions) ? spotSent.spotSentFinishingOptions[0].id : null
                        }}
                        toggleOnRight={{
                            label: (spotSent.spotSentFinishingOptions) ? spotSent.spotSentFinishingOptions[1].name : '',
                            value: (spotSent.spotSentFinishingOptions) ? spotSent.spotSentFinishingOptions[1].id : null
                        }}
                        align="left"
                    />
                </div>
                <div
                    className={s.sentViaMethodsContainer}
                    style={{ marginTop: '30px', marginBottom: '15px' }}
                >
                    <Checkmark
                        onClick={() => {
                            spotSentDetails.full_lock = 0;
                        }}
                        checked={(spotSentDetails.full_lock === 0)}
                        label={'Soft Lock'}
                        type={'no-icon'}
                    />
                    <Checkmark
                        onClick={() => {
                            spotSentDetails.full_lock = 1;
                        }}
                        checked={(spotSentDetails.full_lock === 1)}
                        label={'Full Lock'}
                        type={'no-icon'}
                    />
                </div>
                <div className={s.finishRequestSection}>
                    <h3>Notes</h3>
                    <TextArea
                        onChange={SpotSentActions.handleTextChange.bind(this, 'notes')}
                        value={(spotSentDetails.notes as string)}
                        label="Notes..."
                        width={1152}
                        height={82}
                    />
                </div>
                <div className={s.finishRequestSection}>
                    <DatePicker
                        key="date-picker"
                        onChange={SpotSentActions.handleDateChange}
                        label="Deadline"
                        value={(spotSentDetails.deadline instanceof Date) ? (spotSentDetails.deadline as Date) : null}
                        align="left"
                    />
                </div>
                {
                    spotSentDetails.finish_option &&
                    (spotSentDetails.finish_option as SpotSentValueParentChildForSubmit).parent === 1 &&
                    <div className={s.finishRequestSection}>
                        <h3>Finishing House</h3>
                        <FinishingHousesPicker
                            onChange={SpotSentActions.handleExistingFinishingHouseSelected}
                            onNewCreating={SpotSentActions.handleExistingFinishingHouseSelected}
                            value={0}
                            valueLabel=""
                            align="left"
                            label={(spotSentDetails.finishing_house_name) ? spotSentDetails.finishing_house_name : 'Select finishing house'}
                            projectId={spotSentDetails.finishing_house}
                        />
                    </div>
                }
                {
                    spotSentDetails.finish_option &&
                    (spotSentDetails.finish_option as SpotSentValueParentChildForSubmit).parent === 2 &&
                    <FinishOptions/>
                }
                <div className={s.finishRequestSection}>
                    <h3>Additional Finishing needs</h3>
                    <div className={classNames(s.sentViaMethodsContainer, s.sentViaMethodsContainer__withInputFields, this.getFlexDirrection(spotSentDetails.finish_option))}>
                        {spotSentDetails.finish_option && (spotSentDetails.finish_option as SpotSentValueParentChildForSubmit).parent === 2 &&
                            <>
                            <Checkmark
                                onClick={SpotSentActions.handleFinishingTypeCheckmarkSelect.bind(this, 'gfx_finish')}
                                checked={(spotSentDetails.gfx_finish === 1)}
                                label={'GFX finishing request'}
                                type={'no-icon'}
                            />
                            <Input
                                onChange={this.graphicsNoteChangeHandler}
                                value={(spotSentDetails.graphics_note) as string}
                                label="Graphics Notes..."
                            />
                            </>
                        }
                        <Checkmark
                            onClick={SpotSentActions.handleFinishingTypeCheckmarkSelect.bind(this, 'music_cue_sheet')}
                            checked={(spotSentDetails.music_cue_sheet === 1)}
                            label={'Music Cue Sheet'}
                            type={'no-icon'}
                        />
                         {spotSentDetails.finish_option && (spotSentDetails.finish_option as SpotSentValueParentChildForSubmit).parent === 2 &&
                            <Input
                                onChange={this.musicNoteChangeHandler}
                                value={(spotSentDetails.music_note) as string}
                                label="Music Notes..."
                            />}
                        {spotSentDetails.finish_option && (spotSentDetails.finish_option as SpotSentValueParentChildForSubmit).parent === 1 &&
                        <>
                            <Checkmark
                                onClick={SpotSentActions.handleFinishingTypeCheckmarkSelect.bind(this, 'audio_prep')}
                                checked={(spotSentDetails.audio_prep === 1)}
                                label={'Audio prep'}
                                type={'no-icon'}
                            />
                            <Checkmark
                                onClick={SpotSentActions.handleFinishingTypeCheckmarkSelect.bind(this, 'video_prep')}
                                checked={(spotSentDetails.video_prep === 1)}
                                label={'Video prep'}
                                type={'no-icon'}
                            />
                            <Checkmark
                                onClick={SpotSentActions.handleFinishingTypeCheckmarkSelect.bind(this, 'graphics_finish')}
                                checked={(spotSentDetails.graphics_finish === 1)}
                                label={'Graphics Finish'}
                                type={'no-icon'}
                            />
                        </>
                        }
                    </div>
                </div>
                {
                    spotSentDetails.finish_option &&
                    (spotSentDetails.finish_option as SpotSentValueParentChildForSubmit).parent === 2 &&
                    <AudioSection/>
                }
                {spotSentDetails.finish_option &&
                (spotSentDetails.finish_option as SpotSentValueParentChildForSubmit).parent === 2 &&
                (spotSentDetails.finish_option as SpotSentValueParentChildForSubmit).child === 2 &&
                <div className={s.finishRequestSection}>
                    <h3>Tag chart</h3>
                    <TextArea
                        onChange={SpotSentActions.handleTextChange.bind(this, 'tag_chart')}
                        value={(spotSentDetails.tag_chart) as string}
                        label="Tag chart..."
                        width={1152}
                        height={82}
                    />
                </div>
                }
                {spotSentDetails.finish_option && (spotSentDetails.finish_option as SpotSentValueParentChildForSubmit).parent === 2 &&
                <>
                    <div className={s.finishRequestSection}>
                        <h3>Spec sheet</h3>
                        <input type="file" id="file" name="file" multiple={true} onChange={this.inputFilesHandler}/>
                        {spotSentDetails.spec_sheet_file && spotSentDetails.spec_sheet_file.length > 0 &&
                            <div className={s.filesList}>
                                {this.getSpecSheetFiles()}
                            </div> 
                        }
                    </div>
                    <div className={s.finishRequestSection}>
                        <h3>Spec Notes</h3>
                        <TextArea
                            onChange={SpotSentActions.handleTextChange.bind(this, 'spec_note')}
                            value={(spotSentDetails.spec_note as string)}
                            label="Spec Notes..."
                            width={1152}
                            height={82}
                        />
                    </div>
                </>
                }
                {spotSentDetails.finish_option && (spotSentDetails.finish_option as SpotSentValueParentChildForSubmit).parent === 2 &&
                ((spotSentDetails.finish_option as SpotSentValueParentChildForSubmit).child === 2 ||
                    (spotSentDetails.finish_option as SpotSentValueParentChildForSubmit).child === 3) &&
                <>
                    <div className={s.finishRequestSection}>
                        <h3>Delivery to client</h3>
                        <div className={s.sentViaMethodsContainer}>
                            {this.getDeliveryToClientChildren()}
                        </div>
                    </div>
                    <div className={s.finishRequestSection}>
                        <h3>Delivery Notes</h3>
                        <Input
                            onChange={SpotSentActions.handleTextChange.bind(this, 'delivery_note')}
                            value={(spotSentDetails.delivery_note) as string}
                            label="Delivery Notes..."
                        />
                    </div>
                </>
                }
            </Section>
        );
    }

    private getSpecSheetFiles = () => {
       const files = this.props.store!.spotSent.spotSentDetails.spec_sheet_file;
       if (files.length > 0) {
           return files.map((item, i) => {
            return (
                <div key={item}>
                    <a href={`${item}`} target="_blank">
                        <div className="iconPdf"/>
                        <div className={s.fileName}>File {i + 1}</div>
                    </a>
                </div>
            );
           });
       } else {
           return null;
       }
    }

    private getFlexDirrection = (value) => {
        if (value.parent === 1) {
            return s.withFlexRow;
        } else {
            return '';
        }
    }

    private getTypeFinishingChildren(): JSX.Element[] {
        if (!this.props.store) {
            return [];
        }

        const {spotSent: { spotSentDetails }} = this.props.store;

        let fetchedFinishingOptionsChildren: SpotSentOptionsChildrenFromApi[] | null = this.fetchedFinishingOptionsChildren;
        if (fetchedFinishingOptionsChildren) {
            return fetchedFinishingOptionsChildren.map((children: SpotSentOptionsChildrenFromApi, index: number) => {
                return (
                    <Checkmark
                        key={'type-finishing-children-' + index}
                        onClick={SpotSentActions.handleFinishingTypeChildSelect.bind(this, children.id)}
                        checked={(spotSentDetails.finish_option && children.id === (spotSentDetails.finish_option as SpotSentValueParentChildForSubmit).child) ? true : false}
                        label={children.name}
                        type={'no-icon'}
                    />
                );
            });
        } else {
            return [];
        }
    }

    private getDeliveryToClientChildren(): JSX.Element[] {
        if (!this.props.store) {
            return [];
        }

        const {spotSent: { spotSentDetails }} = this.props.store;

        if (this.getDeliverToClientOptionsChildren) {
            return this.getDeliverToClientOptionsChildren.map((children: SpotSentOptionsChildrenFromApi, index: number) => {
                return (
                    <Checkmark
                        key={'delivery-to-client-option-' + index}
                        onClick={() => {
                            if (spotSentDetails.delivery_to_client) {
                                (spotSentDetails.delivery_to_client as SpotSentValueParentChildForSubmit).child = children.id;
                            }
                        }}
                        checked={(spotSentDetails.delivery_to_client && children.id === (spotSentDetails.delivery_to_client as SpotSentValueParentChildForSubmit).child) ? true : false}
                        label={children.name}
                        type={'no-icon'}
                    />
                );
            });
        } else {
            return [];
        }
    }

    private graphicsNoteChangeHandler = (e) => {
        const value = e.target.value;
        SpotSentActions.handleGraphicsNoteChange(value);
    }
    
    private musicNoteChangeHandler = (e) => {
        const value = e.target.value;
        SpotSentActions.handleMusicNoteChange(value);
    }

    private get getDeliverToClientOptionsChildren(): SpotSentOptionsChildrenFromApi[] | null {
        if (!this.props.store) {
            return null;
        }

        const {spotSent, spotSent: { spotSentDetails }} = this.props.store;

        if (spotSentDetails.finish_option && spotSent.spotSentDeliveryToClientOptions && spotSent.spotSentDeliveryToClientOptions.length > 0) {
            let children: SpotSentOptionsChildrenFromApi[] | null = null;
            for (let i = 0; i < spotSent.spotSentDeliveryToClientOptions.length; i++) {
                if (spotSent.spotSentDeliveryToClientOptions[i].id === (spotSentDetails.finish_option as SpotSentValueParentChildForSubmit).child) {
                    children = spotSent.spotSentDeliveryToClientOptions[i].children;
                    break;
                }
            }
            return children;
        } else {
            return null;
        }
    }

    private get fetchedFinishingOptionsChildren(): SpotSentOptionsChildrenFromApi[] | null {
        if (!this.props.store) {
            return null;
        }

        const {spotSent, spotSent: { spotSentDetails }} = this.props.store;

        if (spotSent.spotSentFinishingOptions && spotSent.spotSentFinishingOptions.length > 0 && spotSentDetails.finish_option) {
            let children: SpotSentOptionsChildrenFromApi[] | null = null;
            for (let i = 0; i < spotSent.spotSentFinishingOptions.length; i++) {
                if (spotSent.spotSentFinishingOptions[i].id === (spotSentDetails.finish_option as SpotSentValueParentChildForSubmit).parent) {
                    children = spotSent.spotSentFinishingOptions[i].children;
                    break;
                }
            }
            return children;
        } else {
            return null;
        }
    }

    private inputFilesHandler = (e) => {
        SpotSentActions.handleInputFiles(e.target.files);
    }
}

export default ProducerSpotSentFormFinishRequest;
