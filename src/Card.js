import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import LanguageContext from "./context/LanguageContext";

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
  };

  render() {
    const success = this.state.selectValue === "success";
    const fail = this.state.selectValue === "fail";
    const callback = this.state.selectValue === "callback";
    const text = this.context === "english" ? "Outcome" : "Výsledok";
    const words = {
      name: "Name",
      company: "Company",
      email: "Email",
      emailed: "emailed",
      called: "called",
      number: "Number",
      open: "open",
      success: "close successful",
      fail: "close unsuccessful",
      callback: "callback",
    };

    const slova = {
      meno: "Meno",
      spolocnost: "Spoločnosť",
      email: "Email",
      emailPoslany: "email poslaný",
      zavolane: "zavolané",
      cislo: "Tel. číslo",
      otvorene: "otvorené",
      uzatvorene: "uzatvorené úspešne",
      neuzatvorene: "uzatvorené neúspešne",
      zavolat: "kontaktovať znova",
    };

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
              {this.state.copied ? "copied" : "copy"}
            </button>
          </CopyToClipboard>
        </h4>
      </div>
    );
  }
}

export default Card;
