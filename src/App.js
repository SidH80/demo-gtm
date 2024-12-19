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
      <div className="center">
        {/* <button
          id="help-tip-button"
          data-gtm="Account Balance"
          name="Account Balance"
          className="help-tip-button"
        >
          Account Balance
        </button>
        <button
          id="accordion"
          data-gtm="Accordion"
          name="Accordion"
          className="help-tip-button"
        >
          Accordion
        </button> */}
        <div className="help-tip-group">
          <HelptipGroup
            open={isOpen}
            toggle={() => setIsOpen(!isOpen)}
            content={content}
            index={1}
          />
        </div>
      </div>
  );
}

export default App;
