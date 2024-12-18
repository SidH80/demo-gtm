import React from 'react';
import FocusTrap from '.';
import { render, cleanup, act } from '@testing-library/react';
import { focusTrapService } from '../../helpers';

jest.mock('../../helpers');

describe('Focus Trap updated component tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        focusTrapService.mockImplementation(() => {
            return { deconstruct: jest.fn() };
        });
    });
    afterEach(cleanup);

    it('renders without crashing', () => {
        render(<FocusTrap />);
    });

    it('creates focus service on mount', () => {
        const onSetFocusMock = jest.fn();
        const deconstructMock = jest.fn();
        act(() => {
            render(<FocusTrap isModal={true} onSetFocus={onSetFocusMock} />);
        });
        expect(focusTrapService).toHaveBeenCalled();
        expect(onSetFocusMock).toHaveBeenCalled();
        expect(deconstructMock).not.toHaveBeenCalled();
    });

    it('deconstructs focus service on unmount', () => {
        const onSetFocusMock = jest.fn();
        const deconstructMock = jest.fn();
        focusTrapService.mockImplementation(() => {
            return { deconstruct: deconstructMock };
        });
        const { unmount } = render(<FocusTrap />);
        unmount();
        expect(deconstructMock).toHaveBeenCalled();
        expect(onSetFocusMock).not.toHaveBeenCalled();
    });
});
