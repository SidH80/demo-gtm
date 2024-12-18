import React from 'react';

import PaginationNav2 from './PaginationNav2';

export default {
    title: 'RCL/Components/PaginationNav2',
    component: PaginationNav2,
    parameters: {
        docs: {
            description: {
                component:
                    'This component is responsible for creating navigation for paginated content.',
            },
        },
    },
};

export const Default = () => (
    <PaginationNav2
        // currentPage={1}
        totalPages={7}
        // resultsPerPage={50}
        handleNextClick={() => alert('Next btn clicked...')}
        handlePrevClick={() => alert('Previous btn clicked...')}
        handlePageBtnClick={() => alert('Page btn clicked...')}
        handleChangeResults={el => alert('Results per page changed to: ', el)}
        // prevLinkLabel='Previous'
        // nextLinkLabel='Next'
        showResultsPerPage
        showJumpToPage
        showPageTracker
    />
);

export const NoJumpTo = () => (
    <PaginationNav2
        // currentPage={1}
        totalPages={7}
        // resultsPerPage={50}
        handleNextClick={() => console.log('Next btn clicked...')}
        handlePrevClick={() => console.log('Previous btn clicked...')}
        handlePageBtnClick={() => console.log('Page btn clicked...')}
        handleChangeResults={el =>
            console.log('Results per page changed to: ', el)
        }
        // prevLinkLabel='Previous'
        // nextLinkLabel='Next'
        showResultsPerPage={false}
        showJumpToPage={false}
        showJumpToPageMobile={false}
        showPageTracker
        isMobile={true}
    />
);
