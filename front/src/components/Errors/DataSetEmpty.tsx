import { Paragraph } from 'components/Content';
import { Card } from 'components/Section';
import * as React from 'react';

interface Props {
    label: string;
}

export const DataSetEmpty: React.StatelessComponent<Props> = ({ label }) => (
    <Card isExpandable={false}>
        <Paragraph type="dim">{label}</Paragraph>
    </Card>
);

DataSetEmpty.defaultProps = {
    label: 'No entries exist'
};
