import * as classNames from 'classnames';
import { Button, ButtonSave } from 'components/Button';
import { Paragraph } from 'components/Content';
import { MoneyHandler } from 'helpers/MoneyHandler';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';

const s = require('./BillSpotPreviewRowEdit.css');

interface Props {
    className?: string;
    id: number;
    name: string;
    note: string | null;
    spots: string | null;
    revisions: string | null;
    billingRate: {
        id: number;
        name: string;
    } | null;
    amount: number;
    editable: boolean;
}

@observer
export class BillSpotPreviewRowEdit extends React.Component<Props, {}> {
    @observable private isInEditMode: boolean = false;

    public render() {
        return (
            <div className={classNames(s.row, this.props.className)}>
                <div>
                    <Paragraph>{'#' + this.props.id}</Paragraph>
                </div>

                <div>
                    <Paragraph>{this.props.name}</Paragraph>
                    {this.props.note && (
                        <Paragraph type="brown" size="small">
                            {'Note: ' + this.props.note}
                        </Paragraph>
                    )}
                </div>

                <div>
                    <Paragraph type={this.props.spots ? 'default' : 'dim'}>
                        {this.props.spots ? this.props.spots : 'None'}
                    </Paragraph>
                </div>

                <div>
                    {(this.props.revisions && <Paragraph>{'Ver. ' + this.props.revisions}</Paragraph>) || (
                        <Paragraph type="dim">None</Paragraph>
                    )}
                </div>

                <div className={s.rateAndEditCol}>
                    {
                        <Paragraph>
                            {this.props.billingRate ? `Rate "` + this.props.billingRate.name + `"` : 'Flat'}
                        </Paragraph>
                    }

                    {(this.isInEditMode === false && (
                        <Button onClick={this.handleEnteringEditModeOfRow} label={{ color: 'blue', text: 'Edit' }} />
                    )) || <ButtonSave onClick={this.handleSavingRowChanges} label="Save" isSaving={false} />}
                </div>

                <div>
                    <Paragraph align="right">{MoneyHandler.formatAsDollars(this.props.amount)}</Paragraph>
                </div>
            </div>
        );
    }

    private handleEnteringEditModeOfRow = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.isInEditMode = true;
    };

    private handleSavingRowChanges = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.isInEditMode = false;
    };
}
