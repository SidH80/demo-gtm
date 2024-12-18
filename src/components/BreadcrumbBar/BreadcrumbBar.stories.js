import React from 'react';
import BreadcrumbBar from './BreadcrumbBar';
import { BrowserRouter } from 'react-router-dom';

export default {
    title: 'RCL/Components/BreadcrumbBar',
    component: BreadcrumbBar,
    parameters: {
        docs: {
            description: {
                component:
                    "This component displays navigation breadcrumbs upon navigation through the application's views.",
            },
        },
    },
};

export const Default = () => {
    const isUndefined = require('lodash/isUndefined');
    const homeObject = {
        get linkDescription() {
            return 'Leave this page and return to the main account page';
        },
        get linkDisplayText() {
            return 'Account Home';
        },
        get linkDestination() {
            return '/ola/';
        },
    };

    const paymentOptionsObject = {
        get linkDescription() {
            return 'Leave this page and return to the Payment Options page.';
        },
        get linkDisplayText() {
            return 'Payment Options';
        },
        get linkDestination() {
            return '/ola/payment_options';
        },
    };
    const locationMap = {
        get account_balance() {
            return [homeObject, 'Account Balance'];
        },
        get 'payment_options/payment_plans'() {
            return [homeObject, paymentOptionsObject, 'Payment Plans'];
        },
        get payment_options() {
            return [homeObject, 'Payment Options'];
        },
        get 'payment_options/create_short_term_plan'() {
            return [homeObject, paymentOptionsObject, 'Create Short-Term Plan'];
        },
        get 'payment_options/create_long_term_plan'() {
            return [homeObject, paymentOptionsObject, 'Create Long-Term Plan'];
        },
    };

    const resolveLocationToHome = path => {
        let formatPath = path.replace(/^\/|\/$/g, '');
        const result = locationMap[formatPath];
        return isUndefined(result) ? [] : result;
    };
    return (
        <>
            <BrowserRouter>
                <BreadcrumbBar
                    pathGetter={() => resolveLocationToHome('/account_balance')}
                />
            </BrowserRouter>
            <br />
            <BrowserRouter>
                <BreadcrumbBar
                    pathGetter={() => resolveLocationToHome('/payment_options')}
                />
            </BrowserRouter>
            <br />
            <BrowserRouter>
                <BreadcrumbBar
                    pathGetter={() =>
                        resolveLocationToHome('/payment_options/payment_plans')
                    }
                />
            </BrowserRouter>
            <br />
            <BrowserRouter>
                <BreadcrumbBar
                    ariaLabel='Account Balance'
                    pathGetter={() =>
                        resolveLocationToHome(
                            '/payment_options/create_short_term_plan'
                        )
                    }
                />
            </BrowserRouter>
            <br />
            <BrowserRouter>
                <BreadcrumbBar
                    pathGetter={() =>
                        resolveLocationToHome(
                            '/payment_options/create_long_term_plan'
                        )
                    }
                />
            </BrowserRouter>
            <br />
        </>
    );
};
