import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import LanguageContext from '../context/LanguageContext';
import CircularUnderLoad from './Loader';

export default class Background extends Component {
  state = {
    people: [],
    language: 'english',
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.getLeadsData();
  }

  // fetch data from API and push into state
  async getLeadsData() {
    await axios
      .get(
        `https://mysterious-inlet-41182.herokuapp.com/https://randomuser.me/api/?results=9`
      )
      .then((response) => {
        this.setState({
          people: response.data.results,
          isLoading: false,
        });
      })
      .catch((error) => {
        alert('Error ========> Fetching Failed - reloading page', error);
        console.log(error);
        window.location.reload();
      });
  }

  getLeadsButtonClick = () => {
    this.getLeadsData();
  };

  onLanguageChange = (language) => {
    this.setState({ language });
  };

  render() {
    const { people, language, isLoading } = this.state;

    // map over state and render cards
    const renderPeople = people.map((person) => (
      <Card
        key={person.cell}
        name={`${person.name.first}  ${person.name.last}`}
        email={person.email}
        phone={person.phone}
        company={person.location.city}
      />
    ));

    return (
      <>
        <LanguageContext.Provider value={language}>
          <div className="top">
            <span className="language">
              <i
                className="flag gb"
                onClick={() => this.onLanguageChange('english')}
              />
              <i
                className="flag sk"
                onClick={() => this.onLanguageChange('slovak')}
              />
            </span>
            {/* title and get new leads button */}
            <h1 className="title">XpressLeads</h1>
            <div className="btn">
              <button type="button" onClick={this.getLeadsButtonClick}>
                {language === 'english' ? 'Get new leads' : 'Dalšie kontakty'}
              </button>
            </div>
          </div>
          {isLoading ? (
            <div className="loader">
              <CircularUnderLoad />
            </div>
          ) : (
            <div className="container">{renderPeople}</div>
          )}
        </LanguageContext.Provider>
      </>
    );
  }
}
