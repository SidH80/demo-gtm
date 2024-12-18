import React from 'react';
import TabView from './TabView';

export default {
    title: 'RCL/Components/TabView',
    components: TabView,
};

export const Default = () => (
    <TabView
        label='Tabs label'
        chevronLeftAriaLabel={'Left Chevron'}
        chevronRightAriaLabel={'Right Chevron'}>
        <TabView.Tab title='Tab1' onTabSelect={() => {}}>
            <p>Content1</p>
        </TabView.Tab>
        <TabView.Tab title='Tab2' onTabSelect={() => {}}>
            <p>Content2</p>
        </TabView.Tab>
        <TabView.Tab title='Tab3' onTabSelect={() => {}}>
            <p>Content3</p>
        </TabView.Tab>
        <TabView.Tab title='Tab4' onTabSelect={() => {}}>
            <p>Content4</p>
        </TabView.Tab>
    </TabView>
);

export const LotsOfTabs = () => (
    <TabView
        label='Tabs label'
        chevronLeftAriaLabel={'Previous 3 tabs'}
        chevronRightAriaLabel={'Next $tabs tabs'}>
        <TabView.Tab title='Overview' onTabSelect={() => {}}>
            <p>Content1</p>
        </TabView.Tab>
        <TabView.Tab title='Authorizations' onTabSelect={() => {}}>
            <p>Content2</p>
        </TabView.Tab>
        <TabView.Tab title='Account Balance' onTabSelect={() => {}}>
            <p>Content3</p>
        </TabView.Tab>
        <TabView.Tab title='Tab4' onTabSelect={() => {}}>
            <p>Content4</p>
        </TabView.Tab>
        <TabView.Tab title='Tab5' onTabSelect={() => {}}>
            <p>Content5</p>
        </TabView.Tab>
        <TabView.Tab title='Tab6' onTabSelect={() => {}}>
            <p>Content6</p>
        </TabView.Tab>
        <TabView.Tab title='Tab7' onTabSelect={() => {}}>
            <p>Content7</p>
        </TabView.Tab>
        <TabView.Tab title='Tab8' onTabSelect={() => {}}>
            <p>Content8</p>
        </TabView.Tab>
        <TabView.Tab title='Tab9' onTabSelect={() => {}}>
            <p>Content9</p>
        </TabView.Tab>
        <TabView.Tab title='Tab10' onTabSelect={() => {}}>
            <p>Content10</p>
        </TabView.Tab>
    </TabView>
);

export const LotsOfLongTabs = () => (
    <TabView
        label='Tabs label'
        chevronLeftAriaLabel={'Previous 3 tabs'}
        chevronRightAriaLabel={'Next $tabs tabs'}>
        <TabView.Tab title='Overview' onTabSelect={() => {}}>
            <p>Content1</p>
        </TabView.Tab>
        <TabView.Tab title='Authorizations' onTabSelect={() => {}}>
            <p>Content2</p>
        </TabView.Tab>
        <TabView.Tab title='Account Balance' onTabSelect={() => {}}>
            <p>Content3</p>
        </TabView.Tab>
        <TabView.Tab title='Payment Activity' onTabSelect={() => {}}>
            <p>Content4</p>
        </TabView.Tab>
        <TabView.Tab title='Tab5' onTabSelect={() => {}}>
            <p>Content5</p>
        </TabView.Tab>
        <TabView.Tab title='Tab6' onTabSelect={() => {}}>
            <p>Content6</p>
        </TabView.Tab>
        <TabView.Tab title='Tab7' onTabSelect={() => {}}>
            <p>Content7</p>
        </TabView.Tab>
        <TabView.Tab title='Tab8' onTabSelect={() => {}}>
            <p>Content8</p>
        </TabView.Tab>
        <TabView.Tab title='Tab9' onTabSelect={() => {}}>
            <p>Content9</p>
        </TabView.Tab>
        <TabView.Tab title='Tab10' onTabSelect={() => {}}>
            <p>Content10</p>
        </TabView.Tab>
        <TabView.Tab title='Tab11 111111' onTabSelect={() => {}}>
            <p>Content11</p>
        </TabView.Tab>
    </TabView>
);

export const ActiveTabIndex = () => (
    <TabView
        activeTabIndex={2}
        label='Tabs label'
        chevronLeftAriaLabel={'Left Chevron'}
        chevronRightAriaLabel={'Right Chevron'}>
        <TabView.Tab title='Tab1' onTabSelect={() => {}}>
            <p>Content1</p>
        </TabView.Tab>
        <TabView.Tab title='Tab2' onTabSelect={() => {}}>
            <p>Content2</p>
        </TabView.Tab>
        <TabView.Tab title='Tab3' onTabSelect={() => {}}>
            <p>Content3</p>
        </TabView.Tab>
        <TabView.Tab title='Tab4' onTabSelect={() => {}}>
            <p>Content4</p>
        </TabView.Tab>
    </TabView>
);

export const TwoMobileTabs = () => (
    <TabView
        label='Tabs label'
        chevronLeftAriaLabel={'Previous $tabs tabs'}
        chevronRightAriaLabel={'Next $tabs tabs'}
        totalMobileTabs={2}>
        <TabView.Tab title='Tab1' onTabSelect={() => {}}>
            <p>Content1</p>
        </TabView.Tab>
        <TabView.Tab title='Tab2' onTabSelect={() => {}}>
            <p>Content2</p>
        </TabView.Tab>
        <TabView.Tab title='Tab3' onTabSelect={() => {}}>
            <p>Content3</p>
        </TabView.Tab>
        <TabView.Tab title='Tab4' onTabSelect={() => {}}>
            <p>Content4</p>
        </TabView.Tab>
    </TabView>
);
