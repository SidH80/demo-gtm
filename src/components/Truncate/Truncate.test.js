import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Truncate from '.';
import clip from 'text-clipper';

describe('Truncate Tests', () => {
    const mockResponse =
        '\u003Ch2\u003EPrint Important New Messages\u003C/h2\u003E\u003Cb\u003EPrint Your Authorization Requests\u003C/b\u003E\u003Cbr\u003E\r\n\r\n\u003Cspan class=\u0022already-filed\u0022\u003EYou can submit unlimited authorization requests with Tax Pro Account. At this time, only the 20 most recent requests display in Authorizations. To keep a record of earlier requests, you may want to print copies. Thank you for your patience as we expand the service to display all requests.\u003C/span\u003E';

    const mockImg =
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTEuNjI2IiBoZWlnaHQ9IjUxMS42MjciIHZpZXdCb3g9IjAgMCA1MTEuNjI2IDUxMS42MjciPjxnIGZpbGw9IiMyMjdkYWUiPjxwYXRoIGQ9Ik0zOTIuODU3IDI5Mi4zNTRoLTE4LjI3NGMtMi42NyAwLTQuODYuODU1LTYuNTYzIDIuNTczLTEuNzE4IDEuNzA4LTIuNTczIDMuODk3LTIuNTczIDYuNTYzdjkxLjM2YzAgMTIuNTY0LTQuNDcgMjMuMzE2LTEzLjQxNSAzMi4yNjMtOC45NDUgOC45NDUtMTkuNyAxMy40MTQtMzIuMjY0IDEzLjQxNEg4Mi4yMjRjLTEyLjU2MiAwLTIzLjMxNy00LjQ3LTMyLjI2NC0xMy40MTQtOC45NDUtOC45NDYtMTMuNDE3LTE5LjY5OC0xMy40MTctMzIuMjYyVjE1NS4zMWMwLTEyLjU2MiA0LjQ3LTIzLjMxMyAxMy40MTctMzIuMjYgOC45NDctOC45NDYgMTkuNzAyLTEzLjQxNyAzMi4yNjQtMTMuNDE3aDIwMC45OTRjMi42NyAwIDQuODYtLjg2IDYuNTctMi41NyAxLjcxLTEuNzEzIDIuNTY2LTMuOSAyLjU2Ni02LjU2N1Y4Mi4yMmMwLTIuNjYtLjg1NS00Ljg1Mi0yLjU2Ni02LjU2Mi0xLjcxLTEuNzEzLTMuOS0yLjU2OC02LjU3LTIuNTY4SDgyLjIyNGMtMjIuNjQ4IDAtNDIuMDE2IDguMDQyLTU4LjEwMiAyNC4xMjVDOC4wNDIgMTEzLjI5NyAwIDEzMi42NjUgMCAxNTUuMzEzdjIzNy41NDJjMCAyMi42NDcgOC4wNDIgNDIuMDE4IDI0LjEyMyA1OC4wOTUgMTYuMDg2IDE2LjA4NCAzNS40NTQgMjQuMTMgNTguMTAyIDI0LjEzaDIzNy41NDNjMjIuNjQ3IDAgNDIuMDE3LTguMDQ2IDU4LjEtMjQuMTMgMTYuMDg2LTE2LjA3NyAyNC4xMjgtMzUuNDQ3IDI0LjEyOC01OC4wOTV2LTkxLjM1OGMwLTIuNjctLjg1Ni00Ljg2LTIuNTc0LTYuNTctMS43MTMtMS43MTgtMy45MDMtMi41NzMtNi41NjUtMi41NzN6Ii8+PHBhdGggZD0iTTUwNi4yIDQxLjk3Yy0zLjYxOC0zLjYxNi03LjkwNi01LjQyMy0xMi44NS01LjQyM0gzNDcuMTdjLTQuOTQ3IDAtOS4yMzIgMS44MDctMTIuODQ2IDUuNDI0LTMuNjE3IDMuNjE2LTUuNDI4IDcuOS01LjQyOCAxMi44NDhzMS44MSA5LjIzMyA1LjQyOCAxMi44NWw1MC4yNDcgNTAuMjQ4LTE4Ni4xNDYgMTg2LjE1Yy0xLjkwNiAxLjkwNC0yLjg1NiA0LjA5NC0yLjg1NiA2LjU2NCAwIDIuNDguOTUzIDQuNjY4IDIuODU2IDYuNTdsMzIuNTQ4IDMyLjU0NWMxLjkwMyAxLjkwMyA0LjA5MyAyLjg1MiA2LjU2NyAyLjg1MnM0LjY2NC0uOTQ4IDYuNTY2LTIuODUybDE4Ni4xNDgtMTg2LjE0OCA1MC4yNSA1MC4yNDhjMy42MTUgMy42MTcgNy45IDUuNDI2IDEyLjg0OCA1LjQyNnM5LjIzMy0xLjgwOCAxMi44NS01LjQyNWMzLjYxOC0zLjYxNiA1LjQyNS03Ljg5OCA1LjQyNS0xMi44NDdWNTQuODE4YzAtNC45NTItMS44MTQtOS4yMzItNS40MjgtMTIuODQ3eiIvPjwvZz48L3N2Zz4=';

    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(), // Deprecated
                removeListener: jest.fn(), // Deprecated
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });

        // Define media queries
        const queryDict = {
            '(min-width: 1200px)': {
                mql: null,
                size: 'xl',
                displayMessage: `${clip(mockResponse, 122, {
                    html: true,
                    maxLines: 1,
                    indicator: '',
                })} ...`,
            },
            '(min-width: 992px) and (max-width: 1199px)': {
                mql: null,
                size: 'l',
                displayMessage: `${clip(mockResponse, 106, {
                    html: true,
                    maxLines: 1,
                    indicator: '',
                })} ...`,
            },
            '(min-width: 768px) and (max-width: 991px)': {
                mql: null,
                size: 'm',
                displayMessage: `${clip(mockResponse, 65, {
                    html: true,
                    maxLines: 1,
                    indicator: '',
                })} ...`,
            },
            '(min-width: 576px) and (max-width: 767px)': {
                mql: null,
                size: 's',
                displayMessage: `${clip(mockResponse, 46, {
                    html: true,
                    maxLines: 1,
                    indicator: '',
                })} ...`,
            },
            '(max-width: 575px)': {
                mql: null,
                size: 'xs',
                displayMessage: `${clip(mockResponse, 31, {
                    html: true,
                    maxLines: 1,
                    indicator: '',
                })} ...`,
            },
        };

        // Store references for unmounting later
        for (const [key, { size, displayMessage }] of Object.entries(
            queryDict
        )) {
            let mql = window.matchMedia(key);
            queryDict[key].mql = mql;
            if (mql.matches) state = { ...state, size, displayMessage };
        }
    });

    it('renders without crashing', () => {
        const { container } = render(<Truncate />);
        expect(container).toBeInTheDocument();
    });

    it('should render a Truncated message instance and handle screen width change', () => {
        render(<Truncate img={mockImg} removedHeaderMessage={mockResponse} />);
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 450,
        });
        window.dispatchEvent(new Event('resize'));
        expect(window.innerWidth).toBe(450);
        expect(screen.getByRole('button')).toHaveTextContent('Read more');
    });

    it('should display expanded text content when Read More is clicked ', () => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: true,
                media: query,
                onchange: null,
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });
        render(<Truncate img={mockImg} removedHeaderMessage={mockResponse} />);
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 576,
        });

        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(
            screen.getByText(
                /You can submit unlimited authorization requests with Tax Pro Account./i
            )
        ).toBeInTheDocument();

        fireEvent.click(button);
        expect(
            screen.queryByText(
                /You can submit unlimited authorization requests with Tax Pro Account./i
            )
        ).toBeNull();
    });

    it('should toggle button text-content when button is clicked', () => {
        render(<Truncate img={mockImg} removedHeaderMessage={mockResponse} />);
        fireEvent.click(screen.getByText('Read more'));
        expect(screen.getByRole('button')).toHaveTextContent('Read less');
        fireEvent.click(screen.getByText('Read less'));
        expect(screen.getByRole('button')).toHaveTextContent('Read more');
    });

    it('should assign multi-lingual props if hasLangPicker is true', () => {
        render(
            <Truncate
                img={mockImg}
                hasLangPicker={true}
                removedHeaderMessage={mockResponse}
                readMore={'Leer mas'}
                readLess={'Leer menos'}
                ariaLabelMore={'Abrir'}
                ariaLabelLess={'Cerrar'}
            />
        );
        expect(screen.getByRole('button')).toHaveTextContent('Leer mas');
        fireEvent.click(screen.getByText('Leer mas'));
        expect(screen.getByRole('button')).toHaveTextContent('Leer menos');
    });
});
