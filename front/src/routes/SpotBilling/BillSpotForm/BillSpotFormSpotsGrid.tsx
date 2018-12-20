import { Section } from 'components/Section';
import * as React from 'react';

const s = require('./BillSpotFormSpotsGrid.css');

interface Props {}

export class BillSpotFormSpotsGrid extends React.Component<Props, {}> {
    public render() {
        return (
            <Section title="Summary" noSeparator={true}>
                <div />
            </Section>
        );
    }
}
