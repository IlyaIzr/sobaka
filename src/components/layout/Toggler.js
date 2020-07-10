import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp';
import { fetchQuote } from './fetchQuote';

class Toggler extends Component {
  state = {
    isEnabled: false,
    text1: 'хм... ',
    text2: 'сейчас что-нибудь придумаем... ',
    text3: 'что ж... '
  };

  handleClick = async () => {
    await this.setState({
      isEnabled: !this.state.isEnabled
    });
    this.fetcher(1); this.fetcher(2); this.fetcher(3);
    setTimeout(function rep() {
      if (this.state.isEnabled) {
        this.fetcher1();
      };
      setTimeout(rep.bind(this), 16000);
    }.bind(this), 14000);
    setTimeout(function rep() {
      if (this.state.isEnabled) {
        this.fetcher2();
      }
      setTimeout(rep.bind(this), 17000);
    }.bind(this), 16000);
    setTimeout(function rep() {
      if (this.state.isEnabled) {
        this.fetcher3();
      }
      setTimeout(rep.bind(this), 18000);
    }.bind(this), 15000);
  };

  fetcher = async numba => {
    const response = await fetchQuote('dummy' + numba);
    if (response.status === "OK") {
      this.setState({ ['text' + numba]: response.quoteText });
    } else if (response.status === "ERR") {
      console.log(response.error)
    }
  }

  render() {
    if (this.state.isEnabled) {
      return (
        <div className="navbar-nav ml-auto mr-2" id="toggler">
          <ul className="navbar-nav ml-auto mr-2">
            <li className="nav-item" onClick={this.handleClick}>
              <button type="button" className="btn btn-outline-light btn-sm">Успокоиться</button>
            </li>
          </ul>
          <div className="allblack text-light crazy crazy1">{this.state.text1}</div>
          <div className="allblack text-light crazy crazy2">{this.state.text2}</div>
          <div className="allblack text-light crazy crazy3">{this.state.text3}</div>
        </div>
      )
    }
    else {
      return (
        <div className="navbar-nav ml-auto mr-2">
          <ul className="navbar-nav ml-auto mr-2">
            <button type="button ml-auto mr-4 " className="btn btn-outline-warning btn-sm text-dark " data-toggle="tooltip" onClick={this.handleClick}
              data-placement="bottom" title="прочитать чужие мысли">Вдохновиться</button>
          </ul>
        </div>)
    };
  };
};

export default Toggler;

