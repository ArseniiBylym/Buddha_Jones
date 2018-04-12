import { isNil as _isNil } from 'lodash';
import * as actions from './ActionTypes';

export default function ActionsHeader(state = {
    title: null,
    preTitleSpan: null,
    subTitle: null,
    preSubTitleSpan: null,
    elements: []
}, action) {
    switch (action.type) {
        case actions.HEADER_CHANGE_TITLE:
            return Object.assign({}, state, {
                title: action.payload.title,
                preTitleSpan: action.payload.preTitleSpan
            });

        case actions.HEADER_CHANGE_SUB_TITLE:
            return Object.assign({}, state, {
                subTitle: action.payload.subTitle,
                preSubTitleSpan: action.payload.preSubTitleSpan
            });

        case actions.HEADER_CHANGE_TITLES:
            return Object.assign({}, state, {
                title: action.payload.title,
                preTitleSpan: action.payload.preSubTitleSpan,
                subTitle: action.payload.subTitle,
                preSubTitleSpan: action.payload.preSubTitleSpan
            });

        case actions.HEADER_SET_ELEMENTS:
            return Object.assign({}, state, {
                elements: action.payload
            });

        case actions.HEADER_SET_ALL:
            return Object.assign({}, state, {
                title: action.payload.title,
                preTitleSpan: action.payload.preSubTitleSpan,
                subTitle: action.payload.subTitle,
                preSubTitleSpan: action.payload.preSubTitleSpan,
                elements: action.payload.elements
            });

        case actions.HEADER_RESET:
            return Object.assign({}, state, {
                title: null,
                preTitleSpan: null,
                subTitle: null,
                preSubTitleSpan: null,
                elements: []
            });

        default:
            return state;
    }
}

/**
 * Sets header main title
 *
 * @param {string} [title = null] - Main title in the header
 * @param {string} [preTitleSpan = null] - Additional text or symbol before main title
 * @returns Promise
 */
export const setMainHeaderTitle = (title, preTitleSpan) => {
    return function(dispatch, getState) {
        title = typeof title !== 'undefined' && title ? title : null;
        preTitleSpan = typeof preTitleSpan !== 'undefined' && preTitleSpan ? preTitleSpan : null;

        dispatch({
            type: actions.HEADER_CHANGE_TITLE,
            payload: {
                title,
                preTitleSpan
            }
        });

        return Promise.resolve();
    };
};

/**
 * Sets header sub title
 *
 * @param {string} [subTitle = null] - Main title in the header
 * @param {string} [preSubTitleSpan = null] - Additional text or symbol before main title
 * @returns Promise
 */
export const setSubHeaderTitle = (subTitle, preSubTitleSpan) => {
    return function(dispatch, getState) {
        subTitle = typeof subTitle !== 'undefined' && subTitle ? subTitle : null;
        preSubTitleSpan = typeof preSubTitleSpan !== 'undefined' && preSubTitleSpan ? preSubTitleSpan : null;

        dispatch({
            type: actions.HEADER_CHANGE_SUB_TITLE,
            payload: {
                subTitle,
                preSubTitleSpan
            }
        });

        return Promise.resolve();
    };
};

/**
 * Changes header titles
 *
 * @param {object} [titles | undefined] Information about header text
 * @param {string} [titles.title = null] - Main title in the header
 * @param {string} [titles.preTitleSpan = null] - Additional text or symbol before main title
 * @param {string} [titles.subTitle = null] - Second line of the title in the header
 * @param {string} [titles.preSubTitleSpan = null] - Additional text or symbol before second line of the title
 * @returns Promise
 */
export const setHeaderTitles = (titles) => {
    return function(dispatch, getState) {
        titles = typeof titles !== 'undefined' ? Object.assign({}, titles, {
            title: typeof titles.title !== 'undefined' && titles.title ? titles.title : null,
            preTitleSpan: typeof titles.preTitleSpan !== 'undefined' && titles.preTitleSpan ? titles.preTitleSpan : null,
            subTitle: typeof titles.subTitle !== 'undefined' && titles.subTitle ? titles.subTitle : null,
            preSubTitleSpan: typeof titles.preSubTitleSpan !== 'undefined' && titles.preSubTitleSpan ? titles.preSubTitleSpan : null,
        }) : {
            title: null,
            preTitleSpan: null,
            subTitle: null,
            preSubTitleSpan: null
        };

        dispatch({
            type: actions.HEADER_CHANGE_TITLES,
            payload: {
                title: titles.title,
                preTitleSpan: titles.preTitleSpan,
                subTitle: titles.subTitle,
                preSubTitleSpan: titles.preSubTitleSpan
            }
        });

        return Promise.resolve();
    };
};

/**
 * Changes header elements
 *
 * @param {JSX[]} [elements = []] - List of JSX elements to be appended to the right part of the header
 * @returns Promise
 */
export const setHeaderElements = (elements) => {
    return function(dispatch, getState) {
        elements = typeof elements !== 'undefined' && elements ? elements : [];

        dispatch({
            type: actions.HEADER_SET_ELEMENTS,
            payload: elements
        });

        return Promise.resolve(true);
    };
};

/**
 * Sets new layout header
 *
 * @param {object} [titles | undefined] Information about header text
 * @param {string} [titles.title = null] - Main title in the header
 * @param {string} [titles.preTitleSpan = null] - Additional text or symbol before main title
 * @param {string} [titles.subTitle = null] - Second line of the title in the header
 * @param {string} [titles.preSubTitleSpan = null] - Additional text or symbol before second line of the title
 * @param {JSX[]} [elements = []] - List of JSX elements to be appended to the right part of the header
 * @returns Promise
 */
export const setNewHeader = (titles, elements) => {
    return function(dispatch, getState) {
        titles = Object.assign({}, titles, {
            title: !_isNil(titles.title) && titles.title ? titles.title : null,
            preTitleSpan: !_isNil(titles.preTitleSpan) && titles.preTitleSpan ? titles.preTitleSpan : null,
            subTitle: !_isNil(titles.subTitle) && titles.subTitle ? titles.subTitle : null,
            preSubTitleSpan: !_isNil(titles.preSubTitleSpan) && titles.preSubTitleSpan ? titles.preSubTitleSpan : null,
        });

        elements = !_isNil(elements) ? elements : [];

        dispatch({
            type: actions.HEADER_SET_ALL,
            payload: {
                title: titles.title,
                preTitleSpan: titles.preTitleSpan,
                subTitle: titles.subTitle,
                preSubTitleSpan: titles.preSubTitleSpan,
                elements
            }
        });

        return Promise.resolve();
    };
};

/**
 * Removes titles and elements from the header
 *
 * @returns Promise
 */
export const resetHeader = () => {
    return function(dispatch, getState) {
        setNewHeader().then(() => {
            return Promise.resolve();
        });
    };
};
