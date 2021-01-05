/* eslint-disable */
import React, { Component } from "react";
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai"
import { connect } from 'react-redux';
import mapReduxStoreToProps from '../redux/mapReduxStoreToProps';
import Api from '../api';
import MasterCountdown from "./MasterCountdown";
import { isBlock } from "typescript";

class Countdown extends Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
    timerID: '',
    timerStatus: 0, //0 is off, 1 is starting, 2 is on
    paused: 0,
    checked: false,
    playing: -1, //-1 is initial render
    timeFormat: true,
  };
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.state.checked === true || this.props.store.masterTime.selectAll === true) {
        let { timerTime, timerStart, timerOn, timerStatus } = this.state;

        let clockID = this.props.id;
        let clockIP = this.props.ip;

        var data = this.props.store.countdownTimers;
        var temp;
        if (this.props.store.masterTime.selectAll === true && this.state.checked === false) {
          //this.setState({ checked: true })
          this.state.checked = true;
          //  } else if (this.props.store.masterTime.selectAll === 1 && this.state.checked === true) {
          //    //this.setState({ checked: false })
          //    this.state.checked = false;
          //    this.props.store.masterTime.selectAll = 0;

        }
        for (var i = 0; i < data.length; i++) {
          if (data[i]['ip'] === clockIP) {
            temp = data[i];
          }
        }
        if (temp['paused'] === true && this.state.paused === 0 && this.state.timerTime != 0) {
          // temp['paused'] = false

          this.pauseTimer();
        }
        if (temp['on'] === false && timerStatus === 2 && this.state.checked === true) {
          // this.state.timerStatus = 0; 
          this.stopTimer();
        }
        if (temp['on'] === true && timerStatus === 0) { //this.props.store.masterTime.timerOn === true && data[i]['ip'] === clockIP
          //timerTime = this.props.store.masterTime.timerCount;
          //timerStart = this.props.store.masterTime.timerStart;
          //timerOn = this.props.store.masterTime.timerOn;
          // this.playTimer();

          timerStatus = 1;
          this.state.playing = 0;

          this.setState({
            timerOn: true
          })
          //this.state.paused = 0;
          this.playTimer();
          timerTime = this.props.store.masterTime.timerCount;
          timerStart = this.props.store.masterTime.timerStart;

          //checked = true;
          //}
          //if (this.props.store.masterTime.timerCount && this.props.store.masterTime.timerCount !== 0) { //&& data[i]['on'] === true && data[i]['ip'] === clockIP


        }
        if (this.state.paused === 1 && temp['paused'] === false && this.state.timerStatus === 2) {
          //this.pauseTimer();
          this.state.timerOn = true;
          //this.state.playing =  0
          this.setState({
            paused: 0,

          })
          //this.playTimer();
          Api.pause({
            id: this.props.id,
            ip: this.props.ip,
            webServiceUrl: "http://" + this.props.ip + ":4743/clockwerxWS",//this.props.wsBaseUrl
          })
          this.startTimer();
        }

      }
    }
  }

  playTimer = () => {
    var hours;
    var minutes;
    var seconds;

    if (this.state.timerTime <= 0 && this.state.timerStatus === 0) {
      hours = this.props.inputHours === "" ? 0 : this.props.inputHours;
      minutes = this.props.inputMinutes === "" ? 0 : this.props.inputMinutes;
      seconds = this.props.inputSeconds === "" ? 0 : this.props.inputSeconds;
      this.setState({
        timerTime: (seconds * 1000) + (minutes * 60000) + (hours * 3600000),

      });
    } else {
      hours = Math.floor((this.state.timerTime / 3600000) % 60);
      minutes = Math.floor((this.state.timerTime / 60000) % 60);
      seconds = Math.floor((this.state.timerTime / 1000) % 60);

      this.setState((state) => {
        return {
          timerTime: state.timerTime,
        }
      })
    }

    // this.setState({
    //   timerOn: true,
    // });

    if (this.state.playing === 0) {

      Api.play({
        id: this.props.id,
        ip: this.props.ip,
        webServiceUrl: "http://" + this.props.ip + ":4743/clockwerxWS",
        //id: "Tours",
        //ip: "192.168.8.135",
        //webServiceUrl: "http://192.168.8.135:4743/clockwerxWS",

        hours: hours,
        minutes: minutes,
        seconds: seconds
      })
        // Then is a response to make sure that it was successful to hit api
        .then((response) => {
          if (response) {
            if (response.data === "OK") {
              // this.setState({
              //   timerOn: true,
              // });
              // this.startTimer();
              this.startTimer();
              this.state.timerStatus = 2;
              this.state.playing = 1;
              // this.setState({
              // timerOn: true,
              // timerStatus: 2,
              // playing: 1
              //})
            }
          }
          if (response == null) {
            alert("No response to play command from " + this.props.id);
          }
        })
        // Catch is an error...its just an error
        .catch((error) => {
          console.log("in catch block:" + error)
        });
    } else {
      this.startTimer();

    }

  }

  pauseTimer = () => {


    //this.state.timerTime = Math.floor(this.state.timerTime / 100) * 100
    //this.state.timerStart = this.state.timerTime

    // this.playTimer();

    //   this.setState({
    //     paused: 0
    //   })


    // Setting up post for api call, needs to match endpoint titles and information  
    Api.pause({
      id: this.props.id,
      ip: this.props.ip,
      webServiceUrl: "http://" + this.props.ip + ":4743/clockwerxWS",//this.props.wsBaseUrl
    })
      // Then is a response to make sure that it was successful to hit api
      .then((response) => {
        if (response) {
          if (response.data === "OK") {
            if (this.state.checked) {
              clearInterval(this.timer);
              this.setState((state) => {
                return {
                  timerTime: Math.floor(state.timerTime / 100) * 100,
                  timerOn: false,
                  paused: 1,

                }
              });


            }
            //  clearInterval(this.timer);
            //  this.setState({
            //    timerTime: Math.floor(this.state.timerTime / 100) * 100,
            //    timerOn: false
            //  });
          }
        }
        if (response == null) {
          alert("No response to pause command from " + this.props.id);
        }
      })
      // Catch is an error... its just an error
      .catch((error) => {
        console.log(error);
      });
  }

  stopTimer = () => {
    this.state.timerOn = false;
    // Setting up post for api call, needs to match endpoint titles and information 
    Api.stop({
      id: this.props.id,
      ip: this.props.ip,
      //ip: '192.168.12.135',
      webServiceUrl: "http://" + this.props.ip + ":4743/clockwerxWS"
      //webServiceUrl: "http://192.168.12.164:4743/clockwerxWS"
    })
      // Then is a response to make sure that it was successful to hit api
      .then((response) => {
        if (response) {
          if (response.data === "OK") {
            // clearInterval(this.timer);
            // this.setState({
            //   timerOn: false,
            //   timerTime: 0
            // });
            var clockIP = this.props.ip
            var data = this.props.store.countdownTimers;

            for (var i = 0; i < data.length; i++) {
              if (data[i]['ip'] === clockIP) {
                data[i]['on'] = false
              }
            }
            this.setState({
              timerStatus: 0,
              timerStart: 0,
              timerOn: false,
              timerTime: 0,
              paused: 0,
              playing: -1
            })
          }
        }
        if (response == null) {
          alert("No response to stop command from " + this.props.id);
        }
      })
      // Catch is an error... its just an error
      .catch((error) => {
        console.log(error);
      });

  }

  startTimer = () => {
    // TODO: Use npm install "axios" for ajax call to backend
    // this.setState({
    //   timerStart: this.state.timerTime
    // });

    //  this.state.timerOn = true;
    //  this.state.timerStart = this.state.timerTime;
    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 1000;
      // console.log(newTime)
      if (newTime >= 0) {
        //this.state.timerTime = newTime;
        this.setState({
          timerTime: newTime,
          paused: 0
          //timerOn: true
          //timeRemaining: newTime
        });
      } else {
        clearInterval(this.timer);
        this.setState({
          timerOn: false,

        })
        // this.state.timerOn= false
        // this.state.timerTime= 0
        // this.setState({
        //   timerStatus: 0,
        //   timerOn: false,
        //   timerTime: 0
        // });


        //alert("Countdown for " + this.props.id + " has ended");
        // this.stopTimer();
      }

    }, 1000);
  };

  resetTimer = () => {
    this.setState((state) => {
      return {
        timerTime: state.timerStart
      }
    }, () => {
      // Setting up post for api call, needs to match endpoint titles and information
      Api.postTime({
        ...this.props.store.currentTime,
        id: this.props.id,
        ip: this.props.ip,
        stop: 'false',
        pause: 'false',
      })
        // Then is a response to make sure that it was successful to hit api
        .then((response) => {
          clearInterval(this.timer);
        })
        // Catch is an error... its just an error
        .catch((error) => {
          console.log(error);
        });
    });
  };
  checkClicked = () => {
    var box = document.getElementsByName("check");
    for (var i = 0; i < box.length; i++) {
      if (box[i].id === this.props.ip) {
        if (box[i].checked === false) {
          box[i].checked = true;
          //this.props.store.masterTime.checked = true;
          this.setState({ checked: true })
          if (this.timerOn === true) {
            this.props.store.masterTime.checked = true;
          }
        }
        else {
          box[i].checked = false;
          this.setState({ checked: false })
          this.props.store.masterTime.checked = false;

        }
      }
    }
  }
  dimPlus = () => {
    let value = document.getElementById("dimLevel-" + this.props.id);
    let input = null;
    switch (value.innerHTML) {

      case "7":
        input = "Max";
        break;

      case "6":
        input = "7";
        break;

      case "5":
        input = "6";
        break;

      case "4":
        input = "5";
        break;

      case "3":
        input = "4";
        break;

      case "2":
        input = "3";
        break;

      case "Min":
        input = "2";
        break;

      default:
        input = "Max";
        break;

    }
    value.innerHTML = input;
    Api.postBright({
      id: this.props.id,
      ip: this.props.ip,
      webServiceUrl: "http://" + this.props.ip + ":4743/clockwerxWS",
      level: "+"
    })
  }
  dimMinus = () => {
    let value = document.getElementById("dimLevel-" + this.props.id);
    let input = null;
    switch (value.innerHTML) {
      case "Max":
        input = "7";
        break;

      case "7":
        input = "6";
        break;

      case "6":
        input = "5";
        break;

      case "5":
        input = "4";
        break;

      case "4":
        input = "3";
        break;

      case "3":
        input = "2";
        break;

      case "2":
        input = "Min";
        break;

      default:
        input = "Min";
        break;

    }
    value.innerHTML = input;

    Api.postBright({
      id: this.props.id,
      ip: this.props.ip,
      webServiceUrl: "http://" + this.props.ip + ":4743/clockwerxWS",
      level: "-"
    })
  }
  // if (this.state.checked === false && this.state.timerOn === false) {
  //   this.setState({ checked: true })
  // } else if(this.state.checked === true && this.state.timerOn === true) {
  //   //nothing
  // } else if(this.state.checked === true && this.state.timerOn === false){
  //   this.setState({checked: false})
  // }

  timeFormat = () => {
    if(this.state.timerStatus !== 0){
      return
    }
    Api.postMil({
      webServiceUrl: "http://" + this.props.ip + ":4743/clockwerxWS",
    }).then((response) => {
      if (response) {
        if (response.data === "OK") {
          this.setState(prevState =>({
            timeFormat: !prevState.timeFormat
          }));
        }
      }
    })

  }
  render() {
    let { timerTime, timerStart, timerOn, timerStatus } = this.state;

    let clockID = this.props.id;
    let clockIP = this.props.ip;
    /*
    //let id = this.props;
    //let webServiceBaseURL = this.props.webServiceBaseURL;
    //var test = document.getElementsByName("check");
    var data = this.props.store.countdownTimers;
    var temp;
    // if (this.props.store.masterTime.selectAll === true && this.state.checked === false) {
    //   this.setState({ checked: true })
    // } else if (this.props.store.masterTime.selectAll === false && this.state.checked === true) {
    //   this.setState({ checked: false })

    // }
    for (var i = 0; i < data.length; i++) {
      if (data[i]['ip'] === clockIP) {
        temp = data[i];
      }
    }
    if (temp['paused'] === true && this.state.paused === 0 && this.state.timerTime != 0) {
      // temp['paused'] = false

      this.pauseTimer();
    }
    if (temp['on'] === false && timerStatus === 2 && this.state.checked === true) {
      // this.state.timerStatus = 0; 
      this.stopTimer();
    }
    if (temp['on'] === true && timerStatus === 0) { //this.props.store.masterTime.timerOn === true && data[i]['ip'] === clockIP
      //timerTime = this.props.store.masterTime.timerCount;
      //timerStart = this.props.store.masterTime.timerStart;
      //timerOn = this.props.store.masterTime.timerOn;
      // this.playTimer();
      timerTime = this.props.store.masterTime.timerCount;
      timerStart = this.props.store.masterTime.timerStart;
      timerStatus = 1;
      timerOn = true;
      disableButtons = true;
      //this.state.paused = 0;
      this.playTimer();

      //checked = true;
      //}
      //if (this.props.store.masterTime.timerCount && this.props.store.masterTime.timerCount !== 0) { //&& data[i]['on'] === true && data[i]['ip'] === clockIP
      

    }
    if (this.state.paused === 1 && temp['paused'] === false && this.state.timerStatus === 2) {

      this.playTimer();
      this.setState({
        paused: 0,
      })
    }

*/
    let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
    let minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor((timerTime / 3600000) % 60)).slice(-2);

    /*
    <div className="timer-control">
              {timerOn === false && (
                  <button className="btn btn_start" onClick={this.playTimer} disabled={disableButtons}><span>Play</span></button>
                )}
              {timerOn === true && (
                  <button className="btn btn_hold" onClick={this.pauseTimer} disabled={disableButtons}><span>Pause</span></button>
              )}
              <button className="btn btn_stop" onClick={this.stopTimer} disabled={disableButtons}><span>Stop</span></button>
            </div>
    */
    /*
    <div className="roomClock-hd">
    <fieldset className="fieldset">
            <p className="checkbox" onClick={checkClicked}>
              <input type="checkbox" name="check" id="check" />
              <label htmlFor="check">{clockID}</label>
            </p>
          </fieldset>
        </div>*/

    return (
      <div id={clockID} className="roomClock" >
        <div className="roomClock-hd">
          <fieldset className="fieldset" style={{ margin: -20 }}>
            <p className="checkbox" onClick={this.checkClicked} >
              <input type="checkbox" name="check" id={clockIP} />
              <label htmlFor="check">{clockID}</label>
            </p>
          </fieldset>
        </div>
        <div className={`roomClock-bd ${timerOn ? true : 'roomClock-bd_active'}`}>
          <div className={"timer"}>
            <div className="timer-display">
              {hours} : {minutes} : {seconds}
            </div>
          </div>

        </div>
        <div style={{ marginTop: 8, display: "flex", alignItems: "center" }}>
          <button onClick={this.dimPlus} style={{ width: 25, textAlign: "center", }}>+</button>
          <label id={"dimLevel-" + this.props.id} style={{ paddingLeft: 5, paddingRight: 5, display: "inline-block", width: "40px", textAlign: "center" }}>
            Max
          </label>
          <button onClick={this.dimMinus} style={{ width: 25, textAlign: "center" }}>-</button>
          <div className="onoffswitch" style={{ marginLeft: 40 }}>
            <input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" tabIndex="0" id={"myonoffswitch-" + this.props.id} checked={this.state.timeFormat} onChange={this.timeFormat} />
            <label className="onoffswitch-label" htmlFor={"myonoffswitch-" + this.props.id}>
              <span className="onoffswitch-inner"></span>
              <span className="onoffswitch-switch"></span>
            </label>
          </div>
        </div>

      </div>
    );
  }
}

/*

<div>
<input type="button" onClick={this.timeFormat} id={"timeFormat-"+this.props.id} value="24Hr" style={{ marginLeft: 10,}}></input>
        <h6 class="text-center">Unit(s)</h6>
<div class="input-group input-number-group">
  <div class="input-group-button">
    <span class="input-number-decrement">-</span>
  </div>
  <input class="input-number" type="number" value="1" min="0" max="1000"></input>
  <div class="input-group-button">
    <span class="input-number-increment">+</span>
  </div>
</div>
</div>


           <div className="timer-control">
              {timerOn === false &&
                (timerStart === 0 || timerTime === timerStart) && (
                  <button className="btn btn_start" onClick={this.play} disabled={disableButtons}><span>Play</span></button>
                )}
              {timerOn === true && timerTime >= 1000 && (
                <button className="btn btn_stop" onClick={this.stopTimer} disabled={disableButtons}><span>Stop</span></button>
              )}
              {timerOn === false &&
                (timerStart !== 0 && timerStart !== timerTime && timerTime !== 0) && (
                  <button className="btn btn_start" onClick={this.startTimer} disabled={disableButtons}><span>Resume</span></button>
                )}
              {(timerOn === false || timerTime < 1000) && (
                <button className="btn btn_reset" onClick={this.resetTimer} disabled={disableButtons}><span>Reset</span></button>
              )}
            </div>

 */

export default connect(mapReduxStoreToProps)(Countdown);
