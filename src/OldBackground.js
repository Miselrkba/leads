import React, { Component } from "react";
import axios from "axios";
import Card from "./Card";

export default class Background extends Component {
  state = {
    people: [],
    isEmailed: false,
    isCalled: false,
  };

  async componentDidMount() {
    let data = await axios.get(`https://randomuser.me/api/?results=9`);
    this.setState({
      people: data.data.results,
    });
  }

  handleIsEmailed = (isEmailed) => {
    this.setState({ isEmailed: isEmailed });
  };

  handleIsCalled = (isCalled) => {
    this.setState({ isCalled: isCalled });
  };

  render() {
    const people = this.state.people.map((person) => {
      return (
        <Card
          key={person.cell}
          name={`${person.name.first}  ${person.name.last}`}
          email={person.email}
          phone={person.phone}
          handleIsEmailed={this.handleIsEmailed}
          handleIsCalled={this.handleIsCalled}
          isEmailed={this.state.isEmailed}
          isCalled={this.state.isCalled}
        />
      );
    });

    console.log(people);
    return (
      <>
        <h1>Leads</h1>
        <button>get new leads</button>
        <div className="container">{people}</div>
      </>
    );
  }
}
