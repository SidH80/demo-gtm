import React from 'react';
import FileIcon from '.';
import { render } from '@testing-library/react';

describe('FileIcon component tests', () => {
    it('should render without crashing', () => {
        render(<FileIcon />);
    });
});
