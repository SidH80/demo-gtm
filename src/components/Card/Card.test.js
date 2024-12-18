import React from 'react';
import Card from '.';
import IrsButton from '../IrsButton';
import IrsLink from '../IrsLink';
import HelptipIcon from '../HelptipIcon';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Card Component Tests', () => {
    const testCard = (
        <Router>
            <Card headerText='Pay Now'>
                <h3>No setup fee</h3>
                <h3>
                    Avoid additional penalties and interest from accruing
                    <div>
                        <IrsLink
                            newWindow
                            linkDisplayText='Learn more'
                            blue
                            noPadding
                            linkDestination='/'
                            linkDescription='This is a dead link that goes nowhere.'
                        />
                    </div>
                </h3>
                <h3>Pay off amount owed today</h3>
                <div className='card--linkContainer card--multiLink'>
                    <h3>
                        Pay By Bank Account <HelptipIcon />
                    </h3>
                    <IrsButton buttonText='GO TO IRS DIRECT PAY' newWindow />
                    <h3>
                        Pay By Debit or Credit Card <HelptipIcon />
                    </h3>
                    <IrsButton buttonText='GO TO CARD OPTIONS' newWindow />
                </div>
            </Card>
        </Router>
    );

    it('should render with no children', () => {
        const { container } = render(<Card />);
        expect(container).toBeInTheDocument();
    });

    it('should render H2 "Pay Now"', () => {
        render(testCard);
        const h2 = screen.getByRole('heading', { level: 2 });
        expect(h2).toBeInTheDocument();
    });

    //There are multiple H3 headings, so the H3 queries targets the heading's string value
    it('should render H3 "No Setup Fee"', () => {
        render(testCard);
        const h3 = screen.getByRole('heading', { name: /no setup fee/i });
        expect(h3).toBeInTheDocument();
    });

    it('should render H3 "Avoid additional penalties and interest from accruing"', () => {
        render(testCard);
        const h3 = screen.getByRole('heading', {
            name: /avoid additional penalties and interest from accruing/i,
        });
        expect(h3).toBeInTheDocument();
    });

    it('should render H3 "Pay off amount owed today"', () => {
        render(testCard);
        const h3 = screen.getByRole('heading', {
            name: /pay off amount owed today/i,
        });
        expect(h3).toBeInTheDocument();
    });

    it('should render H3 "Pay By Bank Account"', () => {
        render(testCard);
        const h3 = screen.getByRole('heading', {
            name: /pay by bank account/i,
        });
        expect(h3).toBeInTheDocument();
    });

    it('should render H3 "Pay By Debit or Credit Card"', () => {
        render(testCard);
        const h3 = screen.getByRole('heading', {
            name: /pay by debit or credit card/i,
        });
        expect(h3).toBeInTheDocument();
    });

    it('should render link "Learn More"', () => {
        render(testCard);
        const link = screen.getByRole('link', {
            name: /This is a dead link that goes nowhere./i,
        });
        expect(link).toBeInTheDocument();
        expect(screen.getByText(/learn more/i)).toBeInTheDocument();
    });

    it('should render button "GO TO IRS DIRECT PAY"', () => {
        render(testCard);
        const button = screen.getByRole('button', {
            name: /go to irs direct pay/i,
        });
        expect(button).toBeInTheDocument();
    });

    it('should render button "GO TO CARD OPTIONS"', () => {
        render(testCard);
        const button = screen.getByRole('button', {
            name: /go to card options/i,
        });
        expect(button).toBeInTheDocument();
    });
});
