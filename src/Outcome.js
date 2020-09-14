import React, { Component } from "react";
import LanguageContext from "./context/LanguageContext";
import { words, slova } from "./components/Translations";

export default class Outcome extends Component {
  static contextType = LanguageContext;

  handleDropdownChange = (e) => {
    this.props.handleDropdownChange(e.target.value);
  };

  render() {
    return (
      <React.Fragment>
        <div className="outcome">
          <ion-icon name="podium-outline"></ion-icon>
          <label className="outcome-label" htmlFor="outcome">
            {this.context === "english"
              ? `${words.outcome}`
              : `${slova.vysledok}`}
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
      </React.Fragment>
    );
  }
}
