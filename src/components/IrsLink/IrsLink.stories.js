import React from 'react';
import IrsLink from './IrsLink';

export default {
    title: 'RCL/Components/IrsLink',
    component: IrsLink,
    parameters: {
        docs: {
            description: {
                component:
                    'This component will render a link. The link will be decorated with an underline and will be the color white. It is expected to be used in the header and footer. Passing in the prop delineate will add a delineator to the left of the link. If the link will open in a new window, an icon will appear denoting the external destination.',
            },
        },
    },
};

const Template = args => {
    return <IrsLink {...args} />;
};
export const Default = Template.bind({});
Default.args = {
    linkDisplayText: 'IRS.GOV',
    linkDestination: 'https://irs.gov',
    linkDescription:
        'This link will open the IRS.gov page in the same browser window.',
    newWindow: true,
};
