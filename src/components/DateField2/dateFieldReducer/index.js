import ActionTypes from './constants';

export const createInitialState = () => {
    return {
        popOutDisplay: false,
        popUpDisplay: false,
    };
};

export const dateFieldReducer = (state, action) => {
    const { togglePopOutDisplay, togglePopUpDisplay } = ActionTypes;
    const { type } = action;
    switch (type) {
        case togglePopOutDisplay: {
            return {
                ...state,
                popOutDisplay: action.isClosing ? false : !state.popOutDisplay,
            };
        }
        case togglePopUpDisplay: {
            return {
                ...state,
                popUpDisplay: action.isClosing ? false : !state.popUpDisplay,
            };
        }
    }
    throw Error(`Unknown action type: ${type}`);
};
