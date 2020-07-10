import React, { Component } from 'react';
import Quote from './Quote';

class Toggler extends Component {
  state = {
    isEnabled: false
  };

  handleClick = () => {
     this.setState({
      isEnabled: !this.state.isEnabled
    });    
  };


  render() {
    if (this.state.isEnabled) {
      return (
        <div className="navbar-nav ml-auto mr-2" id="toggler">
          <ul className="navbar-nav ml-auto mr-2">
            <li className="nav-item" onClick={this.handleClick}>
              <button type="button" className="btn btn-outline-light btn-sm">Успокоиться</button>
            </li>
          </ul>
          <Quote number={1} initialText={'хм... '} timeout={14000}/>
          <Quote number={2} initialText={'сейчас что-нибудь придумаем...'} timeout={15000}/>
          <Quote number={3} initialText={'что ж... '} timeout={16000}/>
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

