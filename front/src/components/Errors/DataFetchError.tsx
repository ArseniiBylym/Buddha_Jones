import * as React from 'react';
import { Button } from '../Button';

const s = require('./DataFetchError.css');

interface Props {
    onRefetch?: () => void;
    errorLabel?: string;
    buttonLabel?: string;
}

export const DataFetchError: React.SFC<Props> = ({ errorLabel, buttonLabel, onRefetch }) => (
    <div>
        <p className={s.alert}>
            <strong>
                {errorLabel ? errorLabel : ''}
                {errorLabel && buttonLabel && onRefetch ? '. ' : errorLabel ? '.' : ''}
            </strong>
            {buttonLabel && onRefetch && <Button onClick={onRefetch} label={{ color: 'orange', text: buttonLabel }} />}
            {buttonLabel && onRefetch ? '.' : ''}
        </p>
    </div>
);

DataFetchError.defaultProps = {
    onRefetch: undefined,
    errorLabel: 'Could not load the data',
    buttonLabel: 'Click here to try again',
};
