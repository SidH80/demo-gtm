import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import { Modal, ModalHeader, ModalBody } from '.';

const setAttribute = jest.fn();
const removeAttribute = jest.fn();
const appRoot = {
    setAttribute,
    removeAttribute,
};
const onClose = jest.fn();

beforeEach(() => {
    appRoot.setAttribute.mockClear();
    appRoot.removeAttribute.mockClear();
    onClose.mockClear();
});

describe('Modal tests', () => {
    it('should render a dialog', () => {
        render(<Modal />);

        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should render content under the dialog', () => {
        render(
            <Modal>
                <ModalHeader>Foo</ModalHeader>
                <ModalBody>Bar</ModalBody>
                {/* Here is an example of how to place actions in the Modal
                <div className='my-modal-actions'>
                    <IrsButton
                        inverted
                        buttonText='Action 1'
                        className='mb-16 mr-16 sm:my-10'
                        clickEvent={handleAction1}
                    />
                    <IrsButton
                        active
                        buttonText='Action 2'
                        className='mb-16 sm:my-10'
                        clickEvent={handleAction2}
                    />
                </div>
                */}
            </Modal>
        );

        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('should take a close function', async () => {
        render(
            <Modal onClose={onClose}>
                <ModalHeader>Foo</ModalHeader>
                <ModalBody>Bar</ModalBody>
            </Modal>
        );

        userEvent.click(screen.getByRole('button'));
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should handle key presses', () => {
        const { unmount } = render(
            <Modal appRoot={appRoot} onClose={onClose}>
                <ModalHeader>Foo</ModalHeader>
                <ModalBody>Bar</ModalBody>
            </Modal>
        );
        fireEvent.keyDown(global.document, { key: 'a' });
        expect(onClose).toHaveBeenCalledTimes(0);

        fireEvent.keyDown(global.document, { key: 'Escape' });
        expect(onClose).toHaveBeenCalledTimes(1);

        expect(appRoot.setAttribute).toHaveBeenCalledTimes(1);
        unmount();
        expect(appRoot.removeAttribute).toHaveBeenCalledTimes(1);
    });
});
