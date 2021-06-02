import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import LanguageContext from '../context/LanguageContext';
import { words, slova } from './Translations';
import Outcome from './Outcome';

type CardState = { copied: boolean; selectValue: string };

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ion-icon': { name: string };
    }
  }
}

class Card extends React.Component<any, CardState> {
  static contextType = LanguageContext;

  state = {
    copied: false,
    selectValue: '',
  };

  handleCopy = () => {
    this.setState((prevState) => ({
      copied: !prevState.copied,
    }));
    setTimeout(() => {
      this.setState({ copied: false });
    }, 1000);
  };

  handleDropdownChange = (selectValue: string) => {
    this.setState({
      selectValue,
    });
  };

  render() {
    const actionStates = {
      success: `success`,
      fail: `fail`,
      callback: `callback`,
    };

    const { selectValue } = this.state;

    const success = selectValue === actionStates.success;
    const fail = selectValue === actionStates.fail;
    const callback = selectValue === actionStates.callback;

    const boxClassNames = success
      ? 'box success'
      : fail
      ? 'box fail'
      : callback
      ? 'box callback'
      : 'box';

    const { name, company, email, phone } = this.props;
    const { copied } = this.state;

    return (
      <div className={boxClassNames}>
        {/* render outcome box */}
        <Outcome
          selectValue={selectValue}
          handleDropdownChange={this.handleDropdownChange}
        />

        {/* box properties - name company email and number  */}
        <h4>
          <ion-icon name="people-circle-outline" />
          {this.context === 'english' ? `${words.name}` : `${slova.meno}`}:{' '}
          {name}
        </h4>
        <h4>
          <ion-icon name="business-outline" />
          {this.context === 'english'
            ? `${words.company}`
            : `${slova.spolocnost}`}
          : {company}
        </h4>
        <h4>
          <ion-icon name="mail-outline" />
          Email: {'  '}
          <a className="link" href={`mailto:${email}`}>
            {email}
          </a>
          <input className="checkbox" type="checkbox" />
          {this.context === 'english'
            ? `${words.emailed}`
            : `${slova.emailPoslany}`}
        </h4>
        <h4 className="number">
          <ion-icon name="call-outline" />
          {this.context === 'english'
            ? `${words.number}`
            : `${slova.cislo}`}: {phone}
          <input className="checkbox" type="checkbox" />
          {this.context === 'english' ? `${words.called}` : `${slova.zavolane}`}
          <CopyToClipboard text={phone}>
            <button
              type="button"
              className="copy-btn"
              onClick={this.handleCopy}
            >
              {copied
                ? `${
                    this.context === 'english'
                      ? `${words.copied}`
                      : `${slova.skopirovane}`
                  }`
                : `${
                    this.context === 'english'
                      ? `${words.copy}`
                      : `${slova.kopiruj}`
                  }`}
            </button>
          </CopyToClipboard>
        </h4>
      </div>
    );
  }
}

export default Card;
