import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import LanguageContext from '../context/LanguageContext';
import CircularUnderLoad from './Loader';

export default class Background extends Component<any> {
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
          <div className="top" id="body-container">
            <span className="language">
              <i
                role="button"
                aria-label="gb"
                tabIndex={-1}
                className="flag gb"
                onClick={() => this.onLanguageChange('english')}
                onKeyDown={() => this.onLanguageChange('english')}
              />
              <i
                role="button"
                aria-label="sk"
                tabIndex={-2}
                className="flag sk"
                onClick={() => this.onLanguageChange('slovak')}
                onKeyDown={() => this.onLanguageChange('english')}
              />
            </span>
            {/* title and get new leads button */}
            <h1 className="title">XpressLeads</h1>
            <div className="btn">
              <button type="button" onClick={this.getLeadsButtonClick}>
                {language === 'english' ? 'Get new leads' : 'Ďalšie kontakty'}
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
