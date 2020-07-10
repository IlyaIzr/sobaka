import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp';

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
  this.fetcher1(); this.fetcher2(); this.fetcher3();
  setTimeout(function rep() {
    if(this.state.isEnabled){
      this.fetcher1();
    };
    setTimeout(rep.bind(this), 16000);
  }.bind(this), 14000);
  setTimeout(function rep() {
    if(this.state.isEnabled){
      this.fetcher2();
    }
    setTimeout(rep.bind(this), 17000);
  }.bind(this), 16000);
  setTimeout(function rep() {
    if(this.state.isEnabled){
      this.fetcher3();
    }
    setTimeout(rep.bind(this), 18000);
  }.bind(this), 15000);
  };

  fetcher1=()=>{
    fetchJsonp('https://api.forismatic.com/api/1.0/?method=getQuote&lang=ru&format=jsonp&key=111&jsonp=cb', {
      jsonpCallbackFunction: 'cb',
      timeout: 20000
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
      const {quoteText} = json
      //console.log(quoteText)
      return quoteText  
    }).then(quoteText => {
        this.setState({text1: quoteText});
        //console.log("Updated state 1")
    }).catch(err=>console.log(err, 'by first guy')          //we got timeout problems sometimes in console. Shouldn't affect UExp
    )
  };  
  fetcher2=()=>{    //different fetches for different calls and 4 dif sources in future development. NOTE callbackFunctions have different names, same for keys
    fetchJsonp('https://api.forismatic.com/api/1.0/?method=getQuote&lang=ru&key=515&format=jsonp&jsonp=callback', {
      jsonpCallbackFunction: 'callback',
      timeout: 20000
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
      const {quoteText} = json
      //console.log(quoteText)
      return quoteText  
    }).then(quoteText => {
        this.setState({text2: quoteText});
        console.log("Updated state 2")
    }).catch(err=>console.log(err, 'by second guy')          
    )        
  };
  fetcher3=()=>{
    fetchJsonp('https://api.forismatic.com/api/1.0/?method=getQuote&lang=ru&key=665544&format=jsonp&jsonp=callbackfunction', {
      jsonpCallbackFunction: 'callbackfunction',
      timeout: 20000
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
      const {quoteText} = json
      //console.log(quoteText)
      return quoteText  
    }).then(quoteText => {
        this.setState({text3: quoteText});
        console.log("Updated state 3")
    }).catch(err=>console.log(err, 'by third guy')          
    )        
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
          <div className="allblack text-light crazy crazy1">{this.state.text1}</div>
          <div className="allblack text-light crazy crazy2">{this.state.text2}</div>
          <div className="allblack text-light crazy crazy3">{this.state.text3}</div>
        </div>
      )
    }
    else {
      return(
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
  
  