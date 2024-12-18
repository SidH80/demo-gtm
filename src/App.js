import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import HelptipGroup from "./components/HelptipGroup";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const content = (
    <p className="test">
      This is a helptip. Helptips display additional information regarding a
      topic.
    </p>
  );
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button
          id="help-tip-button"
          data-gtm="Account Balance"
          name="Account Balance"
          className="help-tip-button"
        >
          Account Balance
        </button>
        <button
          id="accordion"
          name="Account Balance"
          className="accordion-button"
        >
          Accordion
        </button>
        <div className="help-tip-group">
          <HelptipGroup
            data-gtm="Account Balance"
            open={isOpen}
            toggle={() => setIsOpen(!isOpen)}
            content={content}
            index={1}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
