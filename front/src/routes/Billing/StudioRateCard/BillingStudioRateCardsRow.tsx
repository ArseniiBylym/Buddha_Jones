import * as React from 'react';
import * as styles from './styles.scss';
import { history } from 'App';
import { ButtonEdit } from 'components/Button';
import { TableCell, TableRow } from 'components/Table';
import { Client } from '../../../types/clients';
import { Paragraph } from '../../../components/Content';

interface Props {
    client: Client;
}

class BillingStudioRateCardsRow extends React.PureComponent<Props, {}> {
    public render() {
        const { client } = this.props;

        return (
            <TableRow
                key={client.id}
                onClick={this.onTableEditButtonHandler}
                className={styles.clickable}
            >
                <TableCell align="left">
                    <Paragraph
                        type="brown"
                    >
                        {`#${client.id} - `}
                        <b>{client.name}</b>
                    </Paragraph>
                </TableCell>
                <TableCell align="right">
                    <ButtonEdit
                        onClick={this.onTableEditButtonHandler}
                        label="Edit"
                        labelOnLeft={false}
                        float="right"
                    />
                </TableCell>
            </TableRow>
        );
    }

    private onTableEditButtonHandler = () => {
        history.push(`/portal/billing/studio-rate-card/${this.props.client.id}`);
    };
}

export default BillingStudioRateCardsRow;