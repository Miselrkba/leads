import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import LanguageContext from "../context/LanguageContext";
import { words, slova } from "./Translations";
import Outcome from "./Outcome";

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

  handleDropdownChange = (selectValue) => {
    this.setState({
      selectValue: selectValue,
    });
  };

  render() {
    const actionStates = {
      success: `success`,
      fail: `fail`,
      callback: `callback`,
    };

    const success = this.state.selectValue === actionStates.success;
    const fail = this.state.selectValue === actionStates.fail;
    const callback = this.state.selectValue === actionStates.callback;

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
        {/* render outcome box */}
        <Outcome selectValue={this.state.selectValue} handleDropdownChange={this.handleDropdownChange}/>
        
        {/* box properties - name company email and number  */}
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

// testing