import React, { Component } from "react";
import axios from "axios";
import { Card } from "./Card";

export default class Background extends Component {
  state = {
    people: [],
  };

  async componentDidMount() {
    let data = await axios.get(`https://randomuser.me/api/?results=10`);
    this.setState({
      people: data.data.results,
    });
  }

  render() {
    // email={person.email} phone={person.phone}
    // const people = this.personData.map((person) => {
    //   return <p name={person.results.name}></p>;
    // });

    const people = this.state.people.map((person) => {
      return (
        <Card
          key={person.cell}
          name={person.name.last}
          email={person.email}
          phone={person.phone}
        />
      );
    });

    console.log(this.state.people);
    console.log(people);
    return <>{people}</>;
  }
}
