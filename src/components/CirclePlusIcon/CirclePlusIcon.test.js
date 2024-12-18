import React from 'react';
import { render } from '@testing-library/react';

import CirclePlusIcon from '.';

describe('CirclePlusIcon unit tests', () => {
    it('renders without crashing', () => {
        render(<CirclePlusIcon />);
    });
});
