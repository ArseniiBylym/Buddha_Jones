import React from 'react';
import PropTypes from 'prop-types';
import { Section, Row, Col } from './../../../components/Section';
import Select from './../../../components/Form/Select';
import Radio from './../../../components/Form/Radio';
import TextArea from './../../../components/Form/TextArea';
import FileUploader from './FileUploader';
import Button from './../../../components/Button/Button';

// Styles
import IconSendSubmit from './../../../components/Icons/IconSendSubmit';

// Props
const propTypes = {
};

// Default props
const defaultProps = {
};

// Component
class FinishRequestSelection extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { typeOfRequest, coordinatorFills } = this.props;
        const { common, inHouse, outOfHouse } = coordinatorFills;

        return (
            <div>

                <Section title="AE" subTitle="request">
                    <Row>
                        <Col size={6}>
                            <Section noSeparator={true} title="Picture prep notes">
                                <TextArea
                                    onChange={e =>this.props.handleElementChange(e, 'common', 'ae', 'picturePrepNotes')}
                                    value={common.ae.picturePrepNotes}
                                    label="Picture prep notes"
                                />
                            </Section>
                        </Col>
                        <Col size={6}>
                            <Section noSeparator={true} title="Audio prep notes">
                                <TextArea
                                    onChange={e =>this.props.handleElementChange(e, 'common', 'ae', 'audioPrepNotes')}
                                    value={common.ae.audioPrepNotes}
                                    label="Audio prep notes"
                                />
                            </Section>
                        </Col>
                    </Row>

                    {
                        (!typeOfRequest) &&
                        <div>
                            <Row>
                                <Col size={4}>
                                    <Section noSeparator={true}>
                                        <Radio
                                            onClick={e =>this.props.handleStatusToggle(e, 'outOfHouse', 'ae', 'deconUM')}
                                            checked={outOfHouse.ae.deconUM}
                                            label="Decon UM"
                                            value={true}
                                        />
                                    </Section>
                                </Col>
                                <Col size={4}>
                                    <Section noSeparator={true}>
                                        <Radio
                                            onClick={e =>this.props.handleStatusToggle(e, 'outOfHouse', 'ae', 'edl')}
                                            checked={outOfHouse.ae.edl}
                                            label="EDL"
                                            value={true}
                                        />
                                    </Section>
                                </Col>
                                <Col size={4}>
                                    <Section noSeparator={true}>
                                        <Radio
                                            onClick={e =>this.props.handleStatusToggle(e, 'outOfHouse', 'ae', 'avb')}
                                            checked={outOfHouse.ae.avb}
                                            label="AVB"
                                            value={true}
                                        />
                                    </Section>
                                </Col>
                            </Row>
                            <Row>
                                <Col size={4}>
                                    <Section noSeparator={true}>
                                        <Radio
                                            onClick={e =>this.props.handleStatusToggle(e, 'outOfHouse', 'ae', 'videoAAF')}
                                            checked={outOfHouse.ae.videoAAF}
                                            label="Video AAF"
                                            value={true}
                                        />
                                    </Section>
                                </Col>
                                <Col size={4}>
                                    <Section noSeparator={true}>
                                        <Radio
                                            onClick={e =>this.props.handleStatusToggle(e, 'outOfHouse', 'ae', 'audioAAF')}
                                            checked={outOfHouse.ae.audioAAF}
                                            label="Audio AAF"
                                            value={true}
                                        />
                                    </Section>
                                </Col>
                                <Col size={4}>
                                </Col>
                            </Row>
                        </div>
                    }

                    <Row>
                        <Col size={4}>
                            <Section noSeparator={true} >
                                <Radio
                                    onClick={e =>this.props.handleStatusToggle(e, 'common', 'ae', 'graphicsUM')}
                                    checked={common.ae.graphicsUM}
                                    label="Graphics UM"
                                    value={true}
                                />
                            </Section>
                        </Col>
                        <Col size={4}>
                            <Section noSeparator={true} >
                                <Radio
                                    onClick={e =>this.props.handleStatusToggle(e, 'common', 'ae', 'relinkToHiRes')}
                                    checked={common.ae.relinkToHiRes}
                                    label="Relink to HiRes"
                                    value={true}
                                />
                            </Section>
                        </Col>
                        <Col size={4}>
                            <Section noSeparator={true} >
                                <Radio
                                    onClick={e =>this.props.handleStatusToggle(e, 'common', 'ae', 'overcut')}
                                    checked={common.ae.overcut}
                                    label="OverCut"
                                    value={true}
                                />
                                {(common.ae.overcut) && (
                                    <div>
                                        <br />
                                        <TextArea
                                            onChange={e =>this.props.handleElementChange(e, 'common', 'ae', 'overcutNotes')}
                                            value={common.ae.overcutNotes}
                                            label="Notes..."
                                        />
                                    </div>
                                )}
                            </Section>
                        </Col>
                    </Row>


                </Section>

                <Section title="Cue sheet" subTitle="request">
                    <Row>
                        <Col size={4}>
                            <Section noSeparator={true}>
                                <Radio
                                    onClick={e =>this.props.handleStatusToggle(e, 'common', 'cueSheet', 'cueSheet')}
                                    checked={common.cueSheet.cueSheet}
                                    label="OverCut"
                                    value={true}
                                />
                            </Section>
                        </Col>
                        <Col size={4}>
                            {(common.cueSheet.cueSheet) && (
                                <Section noSeparator={true} title='Cue sheet file'>
                                    <FileUploader url='sample_url_1' multiple={true} checkType={true} />
                                </Section>
                            )}
                        </Col>
                        <Col size={4}>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col size={12}>
                            <Section noSeparator={true}>
                                <TextArea
                                    onChange={e => this.props.handleElementChange(e, 'common', 'cueSheet', 'notes')}
                                    value={common.cueSheet.notes}
                                    label="Notes..."
                                    width={1152}
                                    height={96}
                                />
                            </Section>
                        </Col>
                    </Row>
                </Section>

                <Section title="Continuity" subTitle="request">
                    <Row>
                        <Col size={4}>
                            <Section noSeparator={true}>
                                <Radio
                                    onClick={e =>this.props.handleStatusToggle(e, 'common', 'continuity', 'continuity')}
                                    checked={common.continuity.continuity}
                                    label="Continuity"
                                    value={true}
                                />
                            </Section>
                        </Col>
                        <Col size={4}>
                            {(common.continuity.continuity) && (
                                <Section noSeparator={true} title='Cue sheet file'>
                                    <FileUploader
                                        url='sample_url_2'
                                        checkType={true}
                                        accept={
                                            'application/msword, ' +
                                            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                                        }
                                    />
                                </Section>
                            )}
                        </Col>
                        <Col size={4}>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col size={12}>
                            <Section noSeparator={true} title='Notes'>
                                <TextArea
                                    onChange={e => this.props.handleElementChange(e, 'common', 'continuity', 'notes')}
                                    value={common.continuity.notes}
                                    label="Notes..."
                                    width={1152}
                                    height={96}
                                />
                            </Section>
                        </Col>
                    </Row>
                </Section>

                <Section title="Graphics" subTitle="request">
                </Section>

                <Section title="Narrator" subTitle="request">
                    <Row>
                        <Col size={12}>
                            <Section noSeparator={true}>
                                <TextArea
                                    onChange={e => this.props.handleElementChange(e, 'common', 'narrator', 'description')}
                                    value={common.narrator.description}
                                    label="Notes..."
                                    width={1152}
                                    height={96}
                                />
                            </Section>
                        </Col>
                    </Row>
                </Section>

                <Section title="Finished file received">
                    {
                        (!typeOfRequest) ?
                        <div>
                            <Section noSeparator={true}>
                                <Radio
                                    onClick={e =>this.props.handleStatusToggle(e, 'outOfHouse', 'finishFile', 'received')}
                                    checked={outOfHouse.finishFile.received}
                                    label="Received"
                                    value={true}
                                />
                            </Section>
                            <Section noSeparator={true}>
                                <TextArea
                                    onChange={e => this.props.handleElementChange(e, 'outOfHouse', 'finishFile', 'notes')}
                                    value={outOfHouse.finishFile.notes}
                                    label="Notes..."
                                    width={1152}
                                    height={96}
                                />
                            </Section>
                        </div>
                        :
                        <div>
                            <Section noSeparator={true}>
                                <Radio
                                    onClick={e =>this.props.handleStatusToggle(e, 'inHouse', 'finishFile', 'inHouseFinish')}
                                    checked={inHouse.finishFile.inHouseFinish}
                                    label="Finish"
                                    value={true}
                                />
                            </Section>
                        </div>
                    }
                </Section>

                <Section noSeparator={true}>
                    <Row removeGutter={true} alignItems="flex-end">
                        <Col size={8}>
                        </Col>
                        <Col size={4}>
                            <Button
                                onClick={e => {}}
                                icon={{
                                    size: 'large',
                                    background: 'orange',
                                    element:
                                        <IconSendSubmit
                                            width={25}
                                            height={26}
                                            marginLeft={-13}
                                            marginTop={-13}
                                        />
                                }}
                                label={{
                                    text: 'Send to billing',
                                    size: 'small',
                                    color: 'orange',
                                    onLeft: true
                                }}
                                float="right"
                            />
                        </Col>
                    </Row>
                </Section>

            </div>
        );
    }
}

FinishRequestSelection.propTypes = propTypes;
FinishRequestSelection.defaultProps = defaultProps;

export default FinishRequestSelection;
