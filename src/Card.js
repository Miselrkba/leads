import React from "react";
import { choice } from "./helpers";

class Card extends React.Component {
  state = {
    isEmailed: false,
    isCalled: false,
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

  render() {
    return (
      <div
        className="box"
        style={{ backgroundColor: this.state.isEmailed || this.state.isCalled ? 'lightgreen' : '#9D9D9D' }}
        onClick={this.handleClick}
      >
        <p>{this.props.name}</p>
        <span>{this.props.email}</span>
        <input
          type="checkbox"
          checked={this.state.isEmailed}
          onChange={this.handleIsEmailedChange}
        />
        emailed
        <br />
        <span>{this.props.phone}</span>
        <input
          type="checkbox"
          checked={this.state.isCalled}
          onChange={this.handleIsCalledChange}
        />
        called
      </div>
    );
  }
}

export default Card;
