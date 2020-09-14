import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import LanguageContext from "./context/LanguageContext";
import { words, slova } from "./components/Translations";

class Card extends React.Component {
  static contextType = LanguageContext;

  state = {
    copied: false,
    selectValue: "",
  };

  handleCopy = () => {
    this.setState({
      copied: !this.state.copied,
    });
    setTimeout(() => {
      this.setState({ copied: false });
    }, 1000);
  };

  handleDropdownChange = (e) => {
    this.setState({
      selectValue: e.target.value,
    });

    this.recalculateCounts();
  };

  recalculateCounts() {
    // spocita kazdu categoriu
    // ulozi to do variables (success....)
    // call this function on every state change
    // spocital vsetky actionTalen = success . count()
    // array DropdownActionsTakenState
    //  actionsTaken = [];
    //  actionsTaken.forEach(() => {
    // lblOpen = card.count(); //14
    // lblNotOpen =
    //   lblSuccess = selectValue.success.count(); // on click, add +1 to success
    //   lblfail = selectValue.fail.count();
    //  })
  }

  render() {
    //put all const into separate file, and import
    const actionStates = {
      success: `success`,
      fail: `fail`,
      callback: `callback`,
    };

    const success = this.state.selectValue === actionStates.success; // "success"; // remove magic strings e.g. statesValues.success
    const fail = this.state.selectValue === actionStates.fail;
    const callback = this.state.selectValue === actionStates.callback;

    const text = this.context === "english" ? "Outcome" : "Výsledok";

    return (
      <div
        className={
          success
            ? "box success"
            : fail
            ? "box fail"
            : callback
            ? "box callback"
            : "box"
        }
      >
        <div className="outcome">
          <ion-icon name="podium-outline"></ion-icon>
          <label htmlFor="outcome">
            {/* create class with padding instead of space - padding-right: 10px; */}
            {text} {"  "}
          </label>
          <select name="outcome" onChange={this.handleDropdownChange}>
            <option value="open">
              {this.context === "english"
                ? `${words.open}`
                : `${slova.otvorene}`}
            </option>
            <option value="success">
              {this.context === "english"
                ? `${words.success}`
                : `${slova.uzatvorene}`}
            </option>
            <option value="fail">
              {this.context === "english"
                ? `${words.fail}`
                : `${slova.neuzatvorene}`}
            </option>
            <option value="callback">
              {this.context === "english"
                ? `${words.callback}`
                : `${slova.zavolat}`}{" "}
            </option>
          </select>
        </div>

        <h4>
          <ion-icon name="people-circle-outline"></ion-icon>
          {this.context === "english" ? `${words.name}` : `${slova.meno}`}:{" "}
          {this.props.name}
        </h4>
        <h4>
          <ion-icon name="business-outline"></ion-icon>
          {this.context === "english"
            ? `${words.company}`
            : `${slova.spolocnost}`}
          : {this.props.company}
        </h4>
        <h4>
          <ion-icon name="mail-outline"></ion-icon>
          Email: {"  "}
          <a className="link" href={`mailto:${this.props.email}`}>
            {this.props.email}
          </a>
          <input className="checkbox" type="checkbox" />
          {this.context === "english"
            ? `${words.emailed}`
            : `${slova.emailPoslany}`}
        </h4>

        <h4 className="number">
          <ion-icon name="call-outline"></ion-icon>
          {this.context === "english"
            ? `${words.number}`
            : `${slova.cislo}`}: {this.props.phone}
          <input className="checkbox" type="checkbox" />
          {this.context === "english" ? `${words.called}` : `${slova.zavolane}`}
          <CopyToClipboard text={this.props.phone}>
            <button className="copy-btn" onClick={this.handleCopy}>
              {this.state.copied
                ? `${
                    this.context === "english"
                      ? `${words.copied}`
                      : `${slova.skopirovane}`
                  }`
                : `${
                    this.context === "english"
                      ? `${words.copy}`
                      : `${slova.kopiruj}`
                  }`}
            </button>
          </CopyToClipboard>
        </h4>
      </div>
    );
  }
}

export default Card;
