import { createSelector } from 'reselect';

// Getters
export const getLabel = (props) => props.label;
export const getShowProgress = (props) => props.showProgress;
export const getProgress = (props) => props.progress;

// Selectors
export const getFormattedLabel = createSelector(
    [getLabel, getShowProgress, getProgress],
    (label, showProgress, progress) => {
        return (label || '') + showProgress
            ? (label ? ' ' : '') + ''
            : progress + '%';
    }
);
