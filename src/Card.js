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

  render() {
    const copied = <span>Phone number copied to clipboard</span>;
    const success = this.state.selectValue === "success";
    const fail = this.state.selectValue === "fail";
    const callback = this.state.selectValue === "callback";
    // const open = this.state.selectValue === 'open';

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
        onClick={this.handleClick}
      >
        <div className="outcome">
          <label htmlFor="outcome">Outcome {"  "}</label>
          <select name="outcome" onChange={this.handleDropdownChange}>
            <option value="open">open</option>
            <option value="success">close successful</option>
            <option value="fail">close unsuccessful</option>
            <option value="callback">callback </option>
          </select>
        </div>
        <p>Name: {this.props.name}</p>
        <span>
          Email: {"  "}
          <a href={`mailto:${this.props.email}`}>{this.props.email}</a>
        </span>
        <input
          type="checkbox"
          checked={this.state.isEmailed}
          onChange={this.handleIsEmailedChange}
        />
        emailed
        <br />
        <span>Number: {this.props.phone}</span>
        <CopyToClipboard text={this.props.phone}>
          <button onClick={this.handleCopy}>
            {this.state.copied ? "copied" : "copy"}
          </button>
        </CopyToClipboard>
        <input
          type="checkbox"
          checked={this.state.isCalled}
          onChange={this.handleIsCalledChange}
        />
        called
        <p className="alert">{this.state.copied ? copied : null}</p>
      </div>
    );
  }
}

export default Card;
