import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import HelptipGroup from "./components/HelptipGroup";
import AccordionRow from "./components/AccordionRow";

function App() {
  const [isHelptTipOpen, setIsHelptTipOpen] = useState(true);
  const [isAccordionRowOpen, setIsAccordionRowOpen] = useState(false);
  const content = (
    <p className="test">
      This is a helptip. Helptips display additional information regarding a
      topic.
    </p>
  );
  const info = (
    <ul>
      <li>Test 1</li>
    </ul>
  );
  return (
    <div className="center">

      <div className="help-tip-group">
        <HelptipGroup
          open={isHelptTipOpen}
          toggle={() => setIsHelptTipOpen(!isHelptTipOpen)}
          content={content}
          index={1}
        />
      </div>
      <div>
      <div className="accordion-row">
        <AccordionRow
          content="Test data"
          headerLevel={4}
          onClick={() => setIsAccordionRowOpen(!isAccordionRowOpen)}
          open={isAccordionRowOpen}
          ariaLabel="Test data"
          expandedContent={info}
          contentStyles={{
            marginTop: "0px",
            marginRight: "32px",
            marginBottom: "24px",
            marginLeft: "32px",
          }}
          bounded
        />
      </div>
      </div>
    </div>
  );
}

export default App;
