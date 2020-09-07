import React, { Component } from "react";
import axios from "axios";
import Card from "./Card";

export default class Background extends Component {
  state = {
    people: [],
  };

  async componentDidMount() {
    let data = await axios
      .get(`https://randomuser.me/api/?results=9`)
      .catch((error) => {
        alert("Error ========> Fetching Failed", error);
      });
    this.setState({
      people: data.data.results,
    });
  }

  render() {
    const people = this.state.people.map((person) => {
      return (
        <Card
          key={person.cell}
          name={`${person.name.first}  ${person.name.last}`}
          email={person.email}
          phone={person.phone}
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
