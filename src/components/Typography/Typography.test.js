import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Typography } from './Typography';
import './Typography.css';

describe('Typography tests', () => {
    it('should render a paragraph by default', () => {
        const { container } = render(<Typography>Text</Typography>);

        expect(container.getElementsByTagName('p')).toHaveLength(1);
    });

    it('should render an H1', () => {
        render(<Typography as='h1'>Text</Typography>);

        const h1 = screen.getAllByRole('heading', { level: 1 });
        expect(h1).toHaveLength(1);
    });

    it('should render an H2', () => {
        render(<Typography as='h2'>Text</Typography>);

        const h2 = screen.getAllByRole('heading', { level: 2 });
        expect(h2).toHaveLength(1);
    });

    it('should render an H3', () => {
        render(<Typography as='h3'>Text</Typography>);

        const h3 = screen.getAllByRole('heading', { level: 3 });
        expect(h3).toHaveLength(1);
    });

    it('should render an H4', () => {
        render(<Typography as='h4'>Text</Typography>);

        const h4 = screen.getAllByRole('heading', { level: 4 });
        expect(h4).toHaveLength(1);
    });

    it('should render an H5', () => {
        render(<Typography as='h5'>Text</Typography>);

        const h5 = screen.getAllByRole('heading', { level: 5 });
        expect(h5).toHaveLength(1);
    });

    it('should render an H6', () => {
        render(<Typography as='h6'>Text</Typography>);

        const h6 = screen.getAllByRole('heading', { level: 6 });
        expect(h6).toHaveLength(1);
    });

    it('should render a bold styling', () => {
        const { container } = render(<Typography as='b'>Text</Typography>);

        expect(container.getElementsByTagName('b')).toHaveLength(1);
    });

    it('should render a span element', () => {
        const { container } = render(<Typography as='span'>Text</Typography>);

        expect(container.getElementsByTagName('span')).toHaveLength(1);
    });

    it('should render a small', () => {
        const { container } = render(<Typography as='small'>Text</Typography>);

        expect(container.getElementsByTagName('small')).toHaveLength(1);
    });

    it('should render a strong styling', () => {
        const { container } = render(<Typography as='strong'>Text</Typography>);

        expect(container.getElementsByTagName('strong')).toHaveLength(1);
    });

    it('should render a legend', () => {
        const { container } = render(<Typography as='legend'>Text</Typography>);

        expect(container.getElementsByTagName('legend')).toHaveLength(1);
    });

    it('should render a caption', () => {
        const { container } = render(
            <Typography as='caption'>Text</Typography>
        );

        expect(container.getElementsByTagName('caption')).toHaveLength(1);
    });

    it('should render a figcaption', () => {
        const { container } = render(
            <Typography as='figcaption'>Text</Typography>
        );

        expect(container.getElementsByTagName('figcaption')).toHaveLength(1);
    });

    it('should take size configuration', () => {
        const { container } = render(<Typography size='xl'>Text</Typography>);

        expect(container.getElementsByClassName('typography--xl')).toHaveLength(
            1
        );
    });

    it("should use an element's default size if an invalid size is provided", () => {
        const { container } = render(
            <Typography size='invalidSize'>Text</Typography>
        );

        expect(container.getElementsByClassName('typography--xs')).toHaveLength(
            1
        );
    });

    it('should render a paragraph by default if an invalid element type is provided', () => {
        const { container } = render(
            <Typography as='badElement'>Text</Typography>
        );

        expect(container.getElementsByTagName('p')).toHaveLength(1);
    });

    it('should remove margins if specified', () => {
        const { container } = render(
            <Typography removeMargins={true}>Text</Typography>
        );

        expect(
            container.getElementsByClassName('typography--zero-margins')
        ).toHaveLength(1);
    });

    it('should add other html attributes to the text', () => {
        render(<Typography aria-label='Text label'>Text</Typography>);

        expect(screen.getByLabelText('Text label')).toBeInTheDocument();
    });
});
