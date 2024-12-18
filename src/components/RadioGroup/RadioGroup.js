import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './RadioGroup.css';

export const RadioGroupContext = React.createContext('radioGroup');

export default class RadioGroup extends Component {
    // Store the answer to the selected radio button from within this RadioGroup
    // Default is null, but consumer can specify default button selected
    state = {
        selected: this?.props?.defaultSelection
            ? this.props.defaultSelection
            : null,
    };

    //temporary refactor to add support for className attribute; switch to 3rd party library when component is migrated to IRS-UI
    constructor(props) {
        super(props);
        let classes = ['radio-group'];

        if (typeof props?.className === 'string') {
            classes.push(props.className);
        }

        this.className = classes.join(' ');
    }

    componentDidUpdate(prevProps) {
        // If default selection has changed, set selected to new default selection
        if (prevProps.defaultSelection !== this.props.defaultSelection) {
            this.setState({ selected: this.props.defaultSelection });
        }
    }

    // This function is called whenever a child radio button or radio input changes.
    // It serves two purposes:
    // 1) toggle disabled attribute for input fields connected with radio buttons
    //    (i.e., if a radio button that has an input field is selected, than that input field will be enabled)
    // 2) Communicate the value and name of the changed input field (or radio button) to its parent
    handleChange = evt => {
        const type = evt.target.type;
        const value = evt.target.value;

        // This is used to toggle disabled attribute for input field associated with a Radio Button (if applicable)
        if (type === 'radio') {
            this.setState({
                selected: value,
            });
        }

        // Call the Parent component so that is knows what value changed and can store the
        // value in its local state. This is important because parent needs to know values of the
        // various input fields it renders so it can make a post request to the backend and save the value to the database
        if (this.props.onChange) {
            this.props.onChange(evt, value);
        }
    };

    render() {
        const context = {
            onChange: this.handleChange,
            selected: this.state.selected,
            name: this.props.name,
        };

        return (
            <fieldset className={this.className} data-testid='radio-group'>
                <legend
                    data-testid={'legend'}
                    className={this.props.renderLegend ? '' : 'sr-only'}>
                    {' '}
                    {this.props.legend}{' '}
                </legend>
                <RadioGroupContext.Provider
                    value={context}
                    title={this.props.title}>
                    {this.props.children}
                </RadioGroupContext.Provider>
            </fieldset>
        );
    }
}

RadioGroup.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    legend: PropTypes.string,
    renderLegend: PropTypes.bool,
    children: PropTypes.node.isRequired,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    defaultSelection: PropTypes.string,
};

RadioGroup.defaultProps = {
    name: '',
    title: '',
    legend: '',
    renderLegend: false,
    children: null,
    onChange: null,
    onFocus: null,
    defaultSelection: null,
};
