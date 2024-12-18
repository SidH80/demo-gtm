import React from 'react';
import { create } from 'react-test-renderer';
import { SectionAlertTitle } from '../subcomponents';

import FormErrorAlert from './FormErrorAlert';

describe('FormErrorAlert component tests', () => {
  it('renders a form error alert without crashing', () => {
    const fea = create(
      <FormErrorAlert>
        <SectionAlertTitle>Form Error Alert</SectionAlertTitle>
        <ol>
          <li>Item 1</li>
          <li>Item 2</li>
        </ol>
      </FormErrorAlert>
    );
    fea.unmount();
  });

});