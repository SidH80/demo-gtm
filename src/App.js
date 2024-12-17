import logo from "./logo.svg";
import "./App.css";

function App() {
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
        <button id="help-tip-button" name="Account Balance" className="help-tip-button">
          Account Balance
        </button>
        <button id="accordion" name="Account Balance" className="accordion-button">
          Accordion
        </button>
      </header>
    </div>
  );
}

export default App;
