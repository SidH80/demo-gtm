// UsBanner.stories.js|jsx

import React from 'react';

import UsBanner from './UsBanner';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'RCL/Components/UsBanner',
  component: UsBanner,
};

export const Default = () => <UsBanner/>;

export const WithBannerText = () => <UsBanner bannerText='Banner Text' />;