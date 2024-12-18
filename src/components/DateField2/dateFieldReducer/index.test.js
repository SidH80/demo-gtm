import { createInitialState, dateFieldReducer } from '.';
import ActionTypes from './constants';

const { togglePopOutDisplay, togglePopUpDisplay } = ActionTypes;

describe('dateFieldReducer', () => {
    const initialState = createInitialState();
    it.each`
        initialState                                    | action                                            | updatedState
        ${initialState}                                 | ${{ type: togglePopOutDisplay }}                  | ${{ popOutDisplay: true, popUpDisplay: false }}
        ${initialState}                                 | ${{ type: togglePopUpDisplay }}                   | ${{ popOutDisplay: false, popUpDisplay: true }}
        ${{ popUpDisplay: true, popOutDisplay: false }} | ${{ type: togglePopUpDisplay, isClosing: true }}  | ${{ popOutDisplay: false, popUpDisplay: false }}
        ${{ popUpDisplay: false, popOutDisplay: true }} | ${{ type: togglePopOutDisplay, isClosing: true }} | ${{ popOutDisplay: false, popUpDisplay: false }}
    `(
        'should return $updatedState for an action of $action.',
        ({ initialState, action, updatedState }) => {
            expect(dateFieldReducer(initialState, action)).toEqual(
                updatedState
            );
        }
    );
    it('should throw Error for unknown action type.', () => {
        expect(() => {
            dateFieldReducer(initialState, 'UNKNOWN_ACTION');
        }).toThrow(Error);
    });

    describe('createInitialState', () => {
        it('should return initial state of: { popOutDisplay: false, popUpDisplay: false }.', () => {
            const expectedInitialState = {
                popOutDisplay: false,
                popUpDisplay: false,
            };
            expect(initialState).toEqual(expectedInitialState);
        });
    });
});
