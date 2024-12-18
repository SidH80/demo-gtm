import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import DropdownSectionSubNav from '../DropdownSectionSubNav';
import './DropdownSectionNav.css';
import '../../styles/global.css';

const isUndefined = require('lodash/isUndefined');

/**
 * @description This class is responsible for rendering a section of items
 * in a dropdown menu. It should be given an array of link obects
 * that will then be rendered into the dropdown menu.
 * The DropdownSection will render a line below it to show that
 * the section is over.
 *
 * The background color of the Dropdown Section items will match the
 * background color of the container that they are placed in.
 */
export default class DropdownSectionNav extends Component {

    constructor(props) {
        super(props)
        this.state = {
            subNavState: this.setSubNavState(this.props.links),
        }
        this.toggleState = this.toggleState.bind(this);
    }
    
    handleClick = () => {
        this.props.clickFunction();
        this.props.inputRef();
    };

    handleSubnavClick = (id) =>{
        let newSubNavLinkList =[];
        this.state.subNavState.map(link=>{
            if(link.id===id){
                link.state=!link.state; 
            }
            else{
                link.state=false; 
            }
            newSubNavLinkList.push(link);
        })
        this.toggleState(newSubNavLinkList);
    }

    toggleState = (subNavList) => {
        this.setState({ subNavState: subNavList });
    };

    setSubNavState = (links) => {
        let subNavLinkList =[];

        links.map(link=>{
            if (link.subNav){
                link.state=false; 
                subNavLinkList.push(link);
            }
        });
        return subNavLinkList;
    } 


    render() {


        return (
            /* role='list' applied to address VoiceOver bug: https://bugs.webkit.org/show_bug.cgi?id=170179 */
            <ul role='list' className='dropdown-section-nav link-list'>
                {this.props.links.map(link => {
                    if (link.subNav) {
                        let subNavLinkState;
                            this.state.subNavState.map(subNavLink=>{
                                if (subNavLink.id === link.id){
                                    subNavLinkState = subNavLink.state;
                                }
                            });    
                        return (
                            <DropdownSectionSubNav
                                onClickFunc={this.handleClick}
                                key={link.id}
                                link={link}
                                linkState={subNavLinkState}
                                clickStateFunction={this.handleSubnavClick}
                            />
                        );
                    }

                    var classes =
                        link.linkDestination === window.location.pathname
                            ? 'dropdown-section-nav__item--selected'
                            : '';
                    const isCurrent =
                        link.linkDestination === window.location.pathname
                            ? [link.linkDisplayText] + ' Current'
                            : null;
                    const destination = link.linkDestination;
                    var icon = isUndefined(link.icon) ? null : link.icon;
                    return (
                        <li key={link.id} className={classes}>
                            <NavLink
                                exact
                                to={link.linkDestination}
                                className='dropdown-link'
                                activeClassName='dropdown-link--selected'
                                aria-label={isCurrent}
                                aria-current={null}
                                onClick={this.handleClick}
                                isActive={(match, location) => {
                                    return !!(
                                        match ||
                                        destination ===
                                            location.pathname
                                                .split('/')
                                                .splice(0, 3)
                                                .join('/')
                                    );
                                }}>
                                {icon}
                                {link.linkDisplayText}
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        );
    }
}

DropdownSectionNav.propTypes = {
    /**@prop {array} links - links that are passed in by the Dropdown class and rendered within the menu */
    links: PropTypes.arrayOf(
        PropTypes.shape({
            /**@prop {string} id - Each link object is made up of a link ID */
            id: PropTypes.string,
            /**@prop {string} linkDescription - The alt text for the link, also used for accessibility purposes */

            linkDescription: PropTypes.string,
            /**@prop {string} linkDestination - An absolute or relative URL that describes where the user will be taken after clicking the link */

            linkDestination: PropTypes.string,
            /**@prop {string} linkDisplayText - The display text of the link */

            linkDisplayText: PropTypes.string,
            /**@prop {element} icon - An icon can be optionally included where provided */

            icon: PropTypes.element,
        })
    ),
    /**@prop {string} linkType - links that are passed in by the Dropdown class and rendered within the menu */
    linkType: PropTypes.string,
    /**@prop {function} linkType - links that are passed in by the Dropdown class and rendered within the menu */
    clickFunction: PropTypes.func,
    inputRef: PropTypes.func,
};

DropdownSectionNav.defaultProps = {
    links: [],
    linkType: 'a',
    clickFunction: null,
    inputRef: null,
};
