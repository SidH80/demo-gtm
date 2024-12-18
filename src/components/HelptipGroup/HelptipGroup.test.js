import React from 'react';
import HelptipGroup from './HelptipGroup';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('HelptipGroup tests', () => {
    const content = (
        <p className='test'>
            This is a helptip. Helptips display additional information regarding
            a topic.
        </p>
    );
    const setHelptipIndices = jest.fn(() => {
        return true;
    });

    // const wrapper = shallow(<HelptipGroup displayContent='test' />);
    // const withProps = shallow(
    //     <HelptipGroup
    //         index={1}
    //         currentHelptipIndex={1}
    //         setHelptipIndices={setHelptipIndices}
    //         toggleExclusive={true}
    //     />
    // );

    // const mounted = mount(<HelptipGroup content={content} index={1} />);

    it('should render when passed no props', () => {
        const { container } = render(<HelptipGroup />);
        const heading = screen.getByRole('heading', { level: 3 });
        const button = screen.getByRole('button');
        const renderedContent = container.querySelector(
            '.helptip-content__content p'
        );

        expect(heading).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        expect(renderedContent).toBeInTheDocument();
    });

    it('should render when passed props', () => {
        const { container } = render(
            <HelptipGroup
                index={1}
                currentHelptipIndex={1}
                setHelptipIndices={setHelptipIndices}
                toggleExclusive={true}
                content={content}
            />
        );
        const heading = screen.getByRole('heading', { level: 3 });
        const button = screen.getByRole('button');
        const renderedContent = container.querySelector('.test');

        expect(heading).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        expect(renderedContent).toBeInTheDocument();
    });
});
