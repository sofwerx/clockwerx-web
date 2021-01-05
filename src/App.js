import React, { Component } from "react";
import Countdown from "./components/Countdown";
import MasterCountdown from "./components/MasterCountdown";
import TimerInput from "./components/TimerInput";
import { connect } from 'react-redux';
import mapReduxStoreToProps from './redux/mapReduxStoreToProps';
import axios from 'axios';
import * as check from "../node_modules/custom-checkbox-radio-scss/custom-checkbox-radio.scss";
class App extends React.Component {

  async getHostIP() {
    console.log('Entering getHostIP');
    //var hostIP = "";
    var hostPort = "";
    try {
      var response = await fetch("/echo.json", {
        method: "get",
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      var url = response.url;
      console.log('url = ' + url);
      this.state.hostIP = url.split('/')[2].split(':')[0];
      hostPort = url.split('/')[2].split(':')[1];

      console.log("hostIP=" + this.state.hostIP + " hostPort=" + hostPort);
    }
    catch (error) {
      console.log(error);
    }

    console.log('Exiting getHostIP');
    console.log("host ip: " + this.state.hostIP);
    return this.state.hostIP;
  };

  async getClockConfigurations(webServiceUrl) {
    console.log('Entering getClockConfigurations : webServiceUrl = ' + webServiceUrl);

    var data;
    try {
      var url = webServiceUrl + "/configurations/";

      var response = await axios.get(url, {
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      data = response.data["clockDefinitions"];
    }
    catch (error) {
      console.log(error);
    }

    console.log('Exiting getClockConfigurations');
    return data;
  }

  async initClockDefinitions() {
    // get the configurations of the clocks
    console.log('Entering initClockDefinitions()');

    const REACT_APP_ENV = process.env.REACT_APP_ENV;
    console.log('REACT_APP_ENV = ' + REACT_APP_ENV);

    var webServiceUrl = "";
    if (process.env.REACT_APP_ENV === 'production') {
      var hostIP = await this.getHostIP();
      webServiceUrl = 'http://' + hostIP + ':4743/clockwerxWS'
    }
    else {
      webServiceUrl = process.env.REACT_APP_API_URL;
    }

    this.state.webServiceBaseURL = webServiceUrl;
    console.log("webServiceBaseURL = " + this.state.webServiceBaseURL);

    var clockConfigs = await this.getClockConfigurations(webServiceUrl);
    var test = [{"id":"Marathon","ip":"192.168.12.137","time":"0"},{"id":"Tours","ip":"192.168.12.135","time":"0"}]
    //var test = [{"id":"Marathon","ip":"192.168.8.164","time":"0"},{"id":"Tours","ip":"192.168.8.135","time":"0"}]

    //this.setState({ clockConfigurations: clockConfigs });
    this.setState({clockConfigurations: test})
    console.log("clockConfigurations = " + JSON.stringify(this.state.clockConfigurations));

    console.log('Exiting initClockDefinitions()');
  }

  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props);

    this.handleInputHoursChange = this.handleInputHoursChange.bind(this);
    this.handleInputMinutesChange = this.handleInputMinutesChange.bind(this);
    this.handleInputSecondsChange = this.handleInputSecondsChange.bind(this);

    this.state = {
      indvTimer: 0,
      allTimers: 0,
      currentTime: 0,
      masterStart: false,
      resetMaster: false,
      webServiceBaseURL: "",
      clockConfigurations: [],
      inputHours: 0,
      inputMinutes: 0,
      inputSeconds: 0,
      hostIP: ""
    };

    this.initClockDefinitions();

  };

  handleInputHoursChange(newValue) {
    this.setState({ inputHours: newValue });
  };

  handleInputMinutesChange(newValue) {
    this.setState({ inputMinutes: newValue });
  };

  handleInputSecondsChange(newValue) {
    this.setState({ inputSeconds: newValue });
  };

  // setTimer = timeObj => {
  //   this.setState({
  //     indvTimer: `${timeObj.inputHrs}:${timeObj.inputMin}:${timeObj.inputSec}`,
  //     currentTime: timeObj
  //   });
  // };

  startAll = timeObj => {
    this.setState({
      allTimers: `${timeObj.inputHrs}:${timeObj.inputMin}:${timeObj.inputSec}`,
      masterStart: true
    });
  };

  startIndvCountdown = (countdownIndex, timeConv) => {
    const timersArray = [...this.state.timers];
    timersArray[countdownIndex] = timeConv;
    this.setState({ timers: timersArray });
  };

  resetMaster = () => {
    this.setState({
      masterStart: false
    })
  }

  render() {
    const { masterStart, resetMaster, clockConfigurations, webServiceBaseURL,
      inputHours, inputMinutes, inputSeconds } = this.state;

    /*
    const rmClocks = store.countdownTimers.map((timers, index) => {
      return (
        <Countdown
          id={timers.id}
          ip={timers.ip}
          masterStart={this.state.masterStart}
          resetMasterCallback={this.resetMaster}
          key={index}
          index={index} 
        />
      );
    });
    */
    // var inputs = document.querySelectorAll('input[type="checkbox"]');
    // for (var i = 0; i < inputs.length; i++) {
    //   console.log(inputs[i].id)
    //   inputs[i].addEventListener('change', function () {
    //     console.log(i);
    //   });
    // }

    return (
      <div className="appBody">
        <div className="appBody-hd">
          <h1 className="hdg hdg_max">ClockWerx</h1>
          <h2 className="hdg hdg_3">Events clock timer control</h2>
        </div>
        <div className="appBody-bd appBody-bd_split">
          <div className="grid">
            <div className="grid-col grid-col_6of12">
              <div className="clockList">
                {!clockConfigurations || !clockConfigurations.length > 0 ? 
                <h1>Loading ...</h1>
                  :
                  clockConfigurations.map((clockConfiguration, index) =>
                    <Countdown
                      clockConfigurations={this.state.clockConfigurations}
                      id={clockConfiguration.id}
                      ip={clockConfiguration.ip}
                      masterStart={masterStart}
                      resetMasterCallback={resetMaster}
                      key={index}
                      index={index}
                      wsBaseUrl={webServiceBaseURL}
                      inputHours={inputHours}
                      inputMinutes={inputMinutes}
                      inputSeconds={inputSeconds}
                      
                    />
                  )
                }
              </div>
              
            </div>
            <div className="grid-col grid-col_6of12">
              <div className="">
                <TimerInput
                  inputHours={this.state.inputHours}
                  onInputHoursChange={this.handleInputHoursChange}
                  inputMinutes={this.state.inputMinutes}
                  onInputMinutesChange={this.handleInputMinutesChange}
                  inputSeconds={this.state.inputSeconds}
                  onInputSecondsChange={this.handleInputSecondsChange}
                />
                { <MasterCountdown
                  clockConfigurations={this.state.clockConfigurations}
                  activeClock={this.state.activeClocks}
                  inputHours={this.state.inputHours}
                  inputMinutes={this.state.inputMinutes}
                  inputSeconds={this.state.inputSeconds}
                  hostIP={this.state.hostIP}
                />  
               }
                
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapReduxStoreToProps)(App);
