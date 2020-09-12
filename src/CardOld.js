import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

class Card extends React.Component {
  state = {
    isEmailed: false,
    isCalled: false,
    copied: false,
    selectValue: "",
  };

  handleIsEmailedChange = () => {
    this.setState({
      isEmailed: !this.state.isEmailed,
    });
  };

  handleIsCalledChange = () => {
    this.setState({
      isCalled: !this.state.isCalled,
    });
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
    this.setState({ selectValue: e.target.value });
  };

  handleCount = () => {
    const success = this.state.selectValue === "success";
    const fail = this.state.selectValue === "fail";
    const callback = this.state.selectValue === "callback";

    if (success) {
      return <p>success</p>;
    }
    if (fail) {
      return <p>fail</p>;
    }
    if (callback) {
      return <p>callback</p>;
    }
  };

  render() {
    const success = this.state.selectValue === "success";
    const fail = this.state.selectValue === "fail";
    const callback = this.state.selectValue === "callback";

    console.log(this.state.totalSuccess);
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
          <label htmlFor="outcome">Outcome {"  "}</label>
          <select name="outcome" onChange={this.handleDropdownChange}>
            <option value="open">open</option>
            <option value="success">close successful</option>
            <option value="fail">close unsuccessful</option>
            <option value="callback">callback </option>
          </select>
        </div>

        {this.handleCount()}

        <h4>
          <ion-icon name="people-circle-outline"></ion-icon>Name:{" "}
          {this.props.name}
        </h4>
        <h4>
          <ion-icon name="business-outline"></ion-icon>
          Company: {this.props.company}
        </h4>
        <h4>
          <ion-icon name="mail-outline"></ion-icon>
          Email: {"  "}
          <a className="link" href={`mailto:${this.props.email}`}>
            {this.props.email}
          </a>
          <input
            type="checkbox"
            checked={this.state.isEmailed}
            onChange={this.handleIsEmailedChange}
          />
          emailed
        </h4>

        <h4 className="number">
          <ion-icon name="call-outline"></ion-icon>Number: {this.props.phone}
          <input
            type="checkbox"
            checked={this.state.isCalled}
            onChange={this.handleIsCalledChange}
          />
          called
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
