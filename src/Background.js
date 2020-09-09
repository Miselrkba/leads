import React, { Component } from "react";
import axios from "axios";
import Card from "./Card";

export default class Background extends Component {
  constructor(props) {
    super(props);

    this.state = {
      people: [],
    };
    this.handleRerender = this.handleRerender.bind(this);
  }

  async handleRerender() {
    let data = await axios
      .get(`https://randomuser.me/api/?results=9`)
      .catch((error) => {
        alert("Error ========> Fetching Failed Please reload page", error);
        this.handleRerender();
      });

    this.setState({
      people: data.data.results,
    });
  }

  async componentDidMount() {
    let data = await axios
      .get(`https://randomuser.me/api/?results=9`)
      .catch((error) => {
        alert("Error ========> Fetching Failed", error);
        this.handleRerender();
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
          company={person.location.city}
        />
      );
    });

    console.log(this.state.people);
    return (
      <>
        <div className='top'>
          <h1 className="title">XpressLeads</h1>
          <div className="btn">
            <button onClick={this.handleRerender}>Get new leads</button>
          </div>
        </div>
        <div className="container">{people}</div>
      </>
    );
  }
}
