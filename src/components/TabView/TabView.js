import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TabView.css';
import ChevronButton from '../ChevronButton/ChevronButton';

export default class TabView extends Component {
    constructor(props) {
        super(props);

        const t = props.totalMobileTabs;

        // display chevrons if in mobile view and there are more than 3 tabs
        let displayChevrons = window.innerWidth < 992 ? true : false;
        const children = props.children?.filter(child =>
            child ? true : false
        );

        if (children?.length <= t) {
            displayChevrons = false;
        }

        this.chevronLeftRef = React.createRef(null);
        this.chevronRightRef = React.createRef(null);

        let nextTabs = children?.length - t > t ? t : children.length - t;
        const chevronRightAriaLabel = this.props.chevronRightAriaLabel.replace(
            /\$tabs/,
            nextTabs
        );
        const chevronLeftAriaLabel = this.props.chevronLeftAriaLabel.replace(
            /\$tabs/,
            t
        );

        this.state = {
            selectedIndex: this.props.activeTabIndex || 0, // Tab button currently active
            focusedIndex: this.props.activeTabIndex || 0, // Tab button currently or last focused
            mobileTabIndexes: [...Array(t).keys()], // Holds the indexes of displayed mobile tabs
            displayChevrons: displayChevrons,
            chevronLeftDisabled: true,
            chevronRightDisabled: false,
            chevronRightAriaLabel: chevronRightAriaLabel,
            chevronLeftAriaLabel: chevronLeftAriaLabel,
            chevronRightClicked: false,
            chevronLeftClicked: false,
            children: children,
        };
    }

    componentDidMount() {
        this.resizeObserver = new ResizeObserver(this.handleResize);
        this.resizeObserver.observe(document.body);
    }

    componentDidUpdate(prevProps) {
        if (this.props.activeTabIndex !== prevProps.activeTabIndex) {
            this.setState({ selectedIndex: this.props.activeTabIndex });
        }

        // Since the chevrons appear and dissapear, we set focus on them after
        // things are updated and rendered
        if (this.state.chevronRightClicked && this.chevronLeftRef.current) {
            this.chevronLeftRef.current.focus();
            this.setState({ chevronRightClicked: false });
        }

        if (this.state.chevronLeftClicked) {
            if (
                !this.state.chevronRightDisabled &&
                this.chevronRightRef.current
            ) {
                this.chevronRightRef.current.focus();
            } else if (this.chevronLeftRef.current) {
                this.chevronLeftRef.current.focus();
            }

            this.setState({ chevronLeftClicked: false });
        }
    }

    componentWillUnmount() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
    }
    // Random string used to make html element ids unique
    uid =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

    // Key mappings used in keyDownEventListener
    keyDowns = {
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        enter: 13,
        space: 32,
    };

    // Object used for generating and storing tab button refs
    tabs = {
        listItems: [],

        /**
         * @method setListRefs
         * Function that dynamically creates tab button refs. It keeps an array of btn references, and updates the references
         * on each render. If in mobile view, buttons are taken into and out of view, but still need to maintain
         * an array reference of all buttons.
         */
        setListRefs: ref => {
            if (!ref) return;

            const listIndex = this.tabs.listItems.findIndex(
                item => item.id === ref.id
            );

            if (listIndex !== -1) {
                this.tabs.listItems[listIndex] = ref;
            } else {
                this.tabs.listItems.push(ref);
            }
        },
    };

    handleResize = entries => {
        if (
            this.state.children.length <= this.props.totalMobileTabs ||
            entries[0]?.contentRect?.width >= 992
        ) {
            this.setState({
                displayChevrons: false,
            });
        } else if (entries[0]?.contentRect?.width < 992) {
            this.setState({
                displayChevrons: true,
            });
        }
    };

    /*calculate width of selected tab and tabs around selected tab to display display selected tab full length and other tab labels partially
     This only is for screen widths 430px and less and some tab labels are very long */
    handleLongTabsToDisplay = i => {
        let moduloThreeRemainder = i % 3;
        const tabIndexesArray = [i];
        let showBothChevrons =
            !this.state.chevronLeftDisabled && !this.state.chevronRightDisabled;
        if (
            moduloThreeRemainder === 0 &&
            i !== this.tabs.listItems.length - 1 &&
            i + 2 <= this.tabs.listItems.length - 1
        ) {
            tabIndexesArray[1] = i + 1;
            tabIndexesArray[2] = i + 2;
        } else if (
            moduloThreeRemainder === 1 &&
            i !== this.tabs.listItems.length - 1
        ) {
            tabIndexesArray[1] = i - 1;
            tabIndexesArray[2] = i + 1;
        } else if (moduloThreeRemainder === 2) {
            tabIndexesArray[1] = i - 1;
            tabIndexesArray[2] = i - 2;
        }

        if (
            tabIndexesArray.length === 3 &&
            !tabIndexesArray.includes('undefined')
        ) {
            tabIndexesArray.forEach(tabIndex => {
                let tab = this.tabs.listItems[tabIndex].firstElementChild;

                tab.style.width = 'auto';
                tab.style.overflow = 'visible';
            });
            let windowWidth = window.innerWidth - 100;
            if (showBothChevrons) {
                windowWidth = window.innerWidth - 130;
            }

            let currentTabLength =
                this.tabs.listItems[
                    tabIndexesArray[0]
                ].firstElementChild.getBoundingClientRect().width + 20;
            let tab2Length =
                this.tabs.listItems[
                    tabIndexesArray[1]
                ].firstElementChild.getBoundingClientRect().width + 20;
            let tab3Length =
                this.tabs.listItems[
                    tabIndexesArray[2]
                ].firstElementChild.getBoundingClientRect().width + 20;

            let remainingWidth =
                windowWidth - (currentTabLength + tab2Length + tab3Length);
            if (remainingWidth < 0) {
                let subtractWidth = Math.ceil(Math.abs(remainingWidth)) / 2;
                let tab2 = this.tabs.listItems[tabIndexesArray[1]]
                    .firstElementChild;
                let tab3 = this.tabs.listItems[tabIndexesArray[2]]
                    .firstElementChild;
                if (moduloThreeRemainder === 0 && !showBothChevrons) {
                    tab3.style.width =
                        (tab3Length - remainingWidth - 10).toString() + 'px';
                    tab3.style.overflow = 'hidden';
                } else {
                    tab2.style.width =
                        (tab2Length - subtractWidth - 10).toString() + 'px';
                    tab2.style.overflow = 'hidden';
                    tab3.style.width =
                        (tab3Length - subtractWidth - 10).toString() + 'px';
                    tab3.style.overflow = 'hidden';
                }
            }
        }
    };
    /**
     * @method selectTab
     * Function that activates a tab button and invokes the
     * associated prop function.
     */
    selectTab = i => {
        let state = {
            selectedIndex: i,
            focusedIndex: i,
        };
        const mobileTabIndexes = this.state.mobileTabIndexes;
        const t = this.props.totalMobileTabs;

        if (window.innerWidth <= 430) {
            this.handleLongTabsToDisplay(i);
        }

        // keep mobileTabIndexes updated if not in mobile view
        if (
            !this.state.displayChevrons &&
            this.state.mobileTabIndexes.indexOf(i) === -1
        ) {
            let startIndex = i - (i % t);
            for (let x = 0; x < t; x++) {
                mobileTabIndexes[x] = startIndex + x;
            }

            const chevronState = this.updateChevrons(mobileTabIndexes);

            state.mobileTabIndexes = mobileTabIndexes;
            state.chevronLeftDisabled = chevronState.chevronLeftDisabled;
            state.chevronRightDisabled = chevronState.chevronRightDisabled;
            state.chevronRightAriaLabel = chevronState.chevronRightAriaLabel;
        }

        this.props.children[i].props.onTabSelect();
        this.setState(state);
    };

    /**
     * @method focusListener
     * Function that is attached to tab button element focus event.
     */
    focusListener = e => {
        e.persist();
        this.setState({
            focusedIndex: parseInt(e.target.getAttribute('data-key')),
        });
    };

    /**
     * @method focusRight
     * Function that is attached to right arrow key and down arrow key,
     * which moves focus to a tab button to the right,
     * or resets it to the first tab button on the left.
     */
    focusRight = () => {
        let i = 0;
        if (this.state.displayChevrons) {
            i =
                this.state.focusedIndex <
                this.state.mobileTabIndexes[this.props.totalMobileTabs - 1]
                    ? this.state.focusedIndex + 1
                    : this.state.mobileTabIndexes[0];
        } else {
            i =
                this.state.focusedIndex < this.tabs.listItems.length - 1
                    ? this.state.focusedIndex + 1
                    : 0;
        }

        document.activeElement.blur();

        if (i >= this.state.children.length) {
            i = this.state.mobileTabIndexes[0];
        }

        this.tabs.listItems[i].focus();
        this.setState({ focusedIndex: i });
    };

    /**
     * @method focusLeft
     * Function that is attached to left arrow key and up arrow key,
     * which moves focus to a tab button to the left,
     * or resets it to the last tab button on the right.
     */
    focusLeft = () => {
        let i = 0;
        if (this.state.displayChevrons) {
            i =
                this.state.focusedIndex > this.state.mobileTabIndexes[0]
                    ? this.state.focusedIndex - 1
                    : this.state.mobileTabIndexes[
                          this.props.totalMobileTabs - 1
                      ];
        } else {
            i =
                this.state.focusedIndex > 0
                    ? this.state.focusedIndex - 1
                    : this.tabs.listItems.length - 1;
        }

        document.activeElement.blur();

        if (i >= this.state.children.length) {
            i = i - (i - this.state.children.length + 1);
        }

        this.tabs.listItems[i].focus();
        this.setState({ focusedIndex: i });
    };

    /**
     * @method keyDownEventListener
     * Function that is attached to the tab button,
     * which invokes functions attached to their respective keys.
     */
    keyDownEventListener = e => {
        e.persist();
        const key = e.keyCode;
        switch (key) {
            case this.keyDowns.left:
            case this.keyDowns.up:
                e.preventDefault();
                this.focusLeft();
                break;
            case this.keyDowns.right:
            case this.keyDowns.down:
                e.preventDefault();
                this.focusRight();
                break;
            case this.keyDowns.enter:
            case this.keyDowns.space:
                e.preventDefault();
                this.selectTab(parseInt(e.target.getAttribute('data-key')));
                break;
        }
    };

    /**
     * @function handleLeftChevronClick
     * Handles clicking of the left chevron icon and shifts the tabs
     * to the left by 3
     */
    handleLeftChevronClick = () => {
        const mobileTabIndexes = this.state.mobileTabIndexes;
        const t = this.props.totalMobileTabs;
        if (mobileTabIndexes[0] === 0) {
            return;
        }

        // Shift indexes left
        const newIndexes = mobileTabIndexes.map(i => i - t);
        const chevronState = this.updateChevrons(newIndexes);

        this.setState({
            mobileTabIndexes: newIndexes,
            chevronLeftDisabled: chevronState.chevronLeftDisabled,
            chevronRightDisabled: chevronState.chevronRightDisabled,
            chevronRightAriaLabel: chevronState.chevronRightAriaLabel,
            chevronLeftClicked: true,
        });
    };

    /**
     * @function handleRightChevronClick
     * Handles clicking of the right chevron icon and shifts tabs to the
     * right by 3
     */
    handleRightChevronClick = () => {
        const mobileTabIndexes = this.state.mobileTabIndexes;
        const totalTabs = this.props.children.length;
        const t = this.props.totalMobileTabs;

        if (mobileTabIndexes[2] === totalTabs - 1) {
            return;
        }

        // Shift indexes right
        const newIndexes = mobileTabIndexes.map(i => i + t);
        const chevronState = this.updateChevrons(newIndexes);

        this.setState({
            mobileTabIndexes: newIndexes,
            chevronLeftDisabled: chevronState.chevronLeftDisabled,
            chevronRightDisabled: chevronState.chevronRightDisabled,
            chevronRightAriaLabel: chevronState.chevronRightAriaLabel,
            chevronRightClicked: true,
        });
    };

    /**
     * @function updateChevrons
     * Updates the chevrons state based on the passed array, which should always
     * be the updated mobileTabIndexes state
     *
     * @param newIndexes The new mobileTabIndexes state
     */
    updateChevrons = newIndexes => {
        const t = this.props.totalMobileTabs;
        let chevronLeftDisabled = false;
        let chevronRightDisabled = false;
        let chevronRightAriaLabel = this.state.chevronRightAriaLabel;

        if (newIndexes[0] === 0) {
            chevronLeftDisabled = true;
        }

        if (newIndexes[t - 1] >= this.props.children.length - 1) {
            chevronRightDisabled = true;
        }

        let tabsLength = this.state.children.length;
        let nextTabs = tabsLength - newIndexes[t - 1] - 1;
        chevronRightAriaLabel = this.props.chevronRightAriaLabel.replace(
            /\$tabs/,
            nextTabs > t ? t : nextTabs
        );

        return {
            chevronLeftDisabled: chevronLeftDisabled,
            chevronRightDisabled: chevronRightDisabled,
            chevronRightAriaLabel: chevronRightAriaLabel,
        };
    };

    /**
     * @function getTabIndex
     * Returns 0 or -1 as a tabIndex value based on if the current state of the
     * display is mobile view or desktop view
     *
     * @param i The index of the tab to be displayed
     */
    getTabIndex = i => {
        // If in mobile view and selected tab index is within mobileTabIndexes
        if (
            this.state.displayChevrons &&
            this.state.mobileTabIndexes.indexOf(this.state.selectedIndex) !== -1
        ) {
            if (this.state.selectedIndex === i) {
                return '0';
            } else {
                return '-1';
            }
        }

        // If in mobile view and selected tab index is not within mobileTabIndexes
        if (
            this.state.displayChevrons &&
            this.state.mobileTabIndexes.indexOf(this.state.selectedIndex) === -1
        ) {
            if (this.state.mobileTabIndexes[0] === i) {
                return '0';
            } else {
                return '-1';
            }
        }

        // Not in mobile view
        if (this.state.selectedIndex === i) {
            return '0';
        }

        return '-1';
    };

    getAriaLabel = (tab, i) => {
        const title = tab.props.title;
        const current = this.state.selectedIndex === i;

        if (this.state.displayChevrons) {
            return `${title} ${current ? 'Current' : 'double tap to activate'}`;
        } else {
            return `${title} ${
                current ? 'Current' : 'To activate press enter'
            }`;
        }
    };

    getAriaFlowto = () => {
        const isIOS =
            /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

        if (isIOS) {
            const firstTabIndex = this.state.mobileTabIndexes[0];
            return `basic-tab-list-item-${this.uid}-${firstTabIndex}`;
        }
    };

    renderTab = (tab, i) => {
        let hidden = false;
        const selected = i === this.state.selectedIndex;
        if (
            this.state.displayChevrons &&
            this.state.mobileTabIndexes.indexOf(i) === -1
        ) {
            hidden = true;
        }

        return (
            <li
                aria-label={this.getAriaLabel(tab, i)}
                ref={this.tabs.setListRefs}
                data-key={i}
                tabIndex={this.getTabIndex(i)}
                onKeyDown={e => this.keyDownEventListener(e)}
                onFocus={e => this.focusListener(e)}
                key={i}
                className={`${
                    hidden ? 'tab-view-list-item-hidden' : 'tab-view-list-item'
                }`}
                id={`basic-tab-list-item-${this.uid}-${i}`}>
                <button
                    data-testid={`tab-btn-${i}`}
                    tabIndex='-1'
                    id={`basic-tabs-tab-${this.uid}-${i}`}
                    onClick={() => this.selectTab(i)}
                    className={`basic-tab ${hidden ? 'tab-hidden' : ''} ${
                        selected ? 'tab-selected' : ''
                    }`}
                    aria-hidden={true}>
                    {tab.props.title}
                    {tab.props.infoUnavailable && (
                        <span className='sr-only'>
                            {tab.props.infoUnavailable}
                        </span>
                    )}
                </button>
            </li>
        );
    };

    renderTabs = () => {
        return this.props.children.map((tab, i) => {
            return tab ? this.renderTab(tab, i) : null;
        });
    };

    renderTabContent = (tab, i) => {
        return (
            <div
                key={i}
                data-key={i}
                id={`basic-tabs-panel-${this.uid}-${i}`}
                className='content-panel'
                role='tabpanel'
                tabIndex='-1'
                aria-labelledby={`basic-tabs-tab-${this.uid}-${i}`}
                hidden={`${i === this.state.selectedIndex ? '' : 'hidden'}`}>
                {tab}
            </div>
        );
    };

    render() {
        return (
            <div className='tab-view' id={`basic-tabs-${this.uid}`}>
                <nav role='navigation' aria-label={this.props.ariaNavLabel}>
                    {/* set role=application to allow keyboard events to pass through JAWS */}
                    <div className='tab-view-container'>
                        {this.state.displayChevrons &&
                        !this.state.chevronLeftDisabled ? (
                            <ChevronButton
                                ref={this.chevronLeftRef}
                                direction={'left'}
                                height={'20'}
                                width={'20'}
                                classNames={'tab-list-chevron left'}
                                ariaLabel={this.state.chevronLeftAriaLabel}
                                onClick={this.handleLeftChevronClick}
                                aria-flowto={this.getAriaFlowto()}
                            />
                        ) : null}
                        <ul className='tab-view-list'>{this.renderTabs()}</ul>
                        {this.state.displayChevrons &&
                        !this.state.chevronRightDisabled ? (
                            <ChevronButton
                                ref={this.chevronRightRef}
                                direction={'right'}
                                height={'20'}
                                width={'20'}
                                classNames={'tab-list-chevron right'}
                                ariaLabel={this.state.chevronRightAriaLabel}
                                onClick={this.handleRightChevronClick}
                            />
                        ) : null}
                    </div>
                </nav>
                <div>
                    {this.state.displayChevrons ? (
                        <>
                            {/* Render mobile view */}
                            {this.props.children.map((tab, i) => {
                                return tab && this.state.selectedIndex === i
                                    ? this.renderTabContent(tab, i)
                                    : null;
                            })}
                        </>
                    ) : (
                        <>
                            {this.props.children.map((tab, i) => {
                                return tab
                                    ? this.renderTabContent(tab, i)
                                    : null;
                            })}
                        </>
                    )}
                </div>
            </div>
        );
    }
}

TabView.propTypes = {
    /** @prop {string} label - Provides an aria label that describes the purpose of the set of tabs. */
    label: PropTypes.string,
    activeTabIndex: PropTypes.number,
    chevronLeftAriaLabel: PropTypes.string,
    chevronRightAriaLabel: PropTypes.string,
    totalMobileTabs: PropTypes.number,
};

TabView.defaultProps = {
    label: '',
    activeTabIndex: 0,
    chevronLeftAriaLabel: '',
    chevronRightAriaLabel: '',
    totalMobileTabs: 3,
};

// TabView child component for housing the content of each tab panel.
function TabViewTab(props) {
    return <div className='tab-view-tab'>{props.children}</div>;
}

// Connecting TabViewTab as a piece of the TabView compound component.
TabView.Tab = TabViewTab;

TabView.Tab.propTypes = {
    /** @prop {string} title - Provides a visible title for the tab button. */
    title: PropTypes.string,

    /** @prop {function} onTabSelect - Provides a function to be invoked upon tab selection. */
    onTabSelect: PropTypes.func,

    /** @prop {function} infoUnavailable - Provides a infoUnavailable status. */
    infoUnavailable: PropTypes.string,
};

TabView.Tab.defaultProps = {
    title: '',
    onTabSelect: () => {},
    infoUnavailable: '',
};
