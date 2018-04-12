import * as actions from './ActionTypes';

export default function ActionsWindow(state = {
    boardWidth: 1152
}, action) {
    switch (action.type) {
        case actions.WINDOW_SET_BOARD_WIDTH:
            return Object.assign({}, state, {
                boardWidth: action.payload
            });
            break;

        default:
            return state;
            break;
    }
}

export const setBoardWidth = (width) => {
    return function(dispatch, getState) {
        dispatch({
            type: actions.WINDOW_SET_BOARD_WIDTH,
            payload: width
        });

        return Promise.resolve();
    };
};
