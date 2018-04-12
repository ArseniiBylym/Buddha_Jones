import { createSelector } from 'reselect';

const getStatus = (props) => props.status;
const getLabel = (props) => props.label;
const getLabelSaving = (props) => props.labelSaving;
const getLabelSuccess = (props) => props.labelSuccess;
const getLabelError = (props) => props.labelError;

export const getButton = createSelector(
    [getStatus, getLabel, getLabelSaving, getLabelSuccess, getLabelError],
    (status, label, labelSaving, labelSuccess, labelError) => {
        switch (status) {
            case 'saving':
                return {
                    color: 'black',
                    label: labelSaving
                };

            case 'success':
                return {
                    color: 'green',
                    label: labelSuccess
                };

            case 'error':
                return {
                    color: 'orange',
                    label: labelError
                };

            default:
                return {
                    color: 'blue',
                    label
                };
        }
    }
);
