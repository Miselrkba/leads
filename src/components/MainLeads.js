import React, { Component } from "react";
import axios from "axios";
import Card from "./Card";
import LanguageContext from "../context/LanguageContext";

export default class Background extends Component {
  state = {
    people: [],
    language: "english",
  };


  //fetch data from API and push into state
  async getLeadsData() {
    await axios
      .get(
        `https://randomuser.me/api/?results=9`
      )
      .then((response) => {
        this.setState({
          people: response.data.results,
        });
      })
      .catch((error) => {
        alert("Error ========> Fetching Failed - reloading page", error);
        console.log(error);
        window.location.reload();
      });
  }

  componentDidMount() {
    this.getLeadsData();
  }

  getLeadsButtonClick = () => {
    this.getLeadsData();
  };

  onLanguageChange = (language) => {
    this.setState({ language });
  };

  render() {
    //map over state and render cards
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

    return (
      <>
      {/* wrap all components in Context for language change Sk/En */}
        <LanguageContext.Provider value={this.state.language}>
          <div className="top">
            <span className="language">
              <i
                className="flag gb"
                onClick={() => this.onLanguageChange("english")}
              ></i>
              <i
                className="flag sk"
                onClick={() => this.onLanguageChange("slovak")}
              ></i>
            </span>
            {/* title and get bew leads button */}
            <h1 className="title">XpressLeads</h1>
            <div className="btn">
              <button onClick={this.getLeadsButtonClick}>
                {this.state.language === "english"
                  ? "Get new leads"
                  : "Dalšie kontakty"}
              </button>
            </div>
          </div>
          <div className="container">{people}</div>
        </LanguageContext.Provider>
      </>
    );
  }
}
