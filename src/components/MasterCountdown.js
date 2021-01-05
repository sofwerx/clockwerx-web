import React, { Component } from "react";
import { connect } from 'react-redux';
import mapReduxStoreToProps from '../redux/mapReduxStoreToProps';
import Api from '../api';

function testAlert() {
	alert("Master Countdown Ended", false);
}
class MasterCountdown extends Component {
	state = {
		timerOn: false,
		hostIP: "",
		paused: false
	};

	createTimerInterval = () => {
		//var boxChecked = document.getElementsByName("check");
		//for (var i = 0; i < boxChecked.length; i++) {
		//if (boxChecked[i].checked == true) {
		this.timer = setInterval(() => {
			const newTime = this.props.store.masterTime.timerCount - 10;
			this.timerCount = newTime;
			if (newTime >= 0) {
				this.props.dispatch({
					type: 'MASTER_TIMER_COUNT',
					payload: newTime
				});
			} else {
				clearInterval(this.timer);
				this.setState({
					timerOn: true
				});
				this.props.dispatch({
					type: 'MASTER_TIMER_ON',
					payload: true
				});
				this.stopTimer();
				testAlert();

			}
		}, 10);
		//}
		//}
	};

	startTimer = () => {
		var box = document.getElementsByName("check");
		// var hours;
		// var minutes;
		// var seconds;
		
		// if (!this.timerCount || this.timerCount <= 0) {
		// 	hours = this.props.inputHours === "" ? 0 : this.props.inputHours;
		// 	minutes = this.props.inputMinutes === "" ? 0 : this.props.inputMinutes;
		// 	seconds = this.props.inputSeconds === "" ? 0 : this.props.inputSeconds;

		// 	this.timerCount = (this.props.inputSeconds * 1000) + (this.props.inputMinutes * 60000) + (this.props.inputHours * 3600000);
		// } else {
		// 	hours = Math.floor((this.timerCount / 3600000) % 60);
		// 	minutes = Math.floor((this.timerCount / 60000) % 60);
		// 	seconds = Math.floor((this.timerCount / 1000) % 60);
		// }
		// this.props.dispatch({
		// 	type: 'MASTER_TIMER_SET_ALL',
		// 	payload: {
		// 		checked: true,
		// 		timerOn: true,
		// 		//timerCount: this.timerCount,
		// 		//timerStart: this.props.store.currentTime.timerTime
		// 	}
		// });

		//const noResponse = [];
		for (let clock of this.props.clockConfigurations) {

			for (var i = 0; i < box.length; i++) {
				if (box[i].checked === true && box[i].id === clock.ip) {
					this.setState({
						timerOn: true,
						paused: false
					});
					//console.log("BOX IP: " + box[i].id + " CLOCK IP: " + clock.ip)
					var data = this.props.store.countdownTimers
					for (var j = 0; j < data.length; j++) {
						if (data[j]['ip'] === clock.ip) {
							data[j]['on'] = true;
							data[j]['paused'] = false
						}

					}
					console.log(clock.ip)
					/*Api.play({
						id: clock.id,
						ip: clock.ip,
						//id: "Tours",
						//ip: "192.168.12.135",
						webServiceUrl: "http://" + clock.ip + ":4743/clockwerxWS",
						//webServiceUrl: "http://192.168.12.135:4743/clockwerxWS",

						hours: hours,
						minutes: minutes,
						seconds: seconds
					})
						.then((response) => {
							if (response && response.data === "OK") {
								if (!this.state.timerOn) {
									this.createTimerInterval();

									this.setState({
										checked: true,
										timerOn: true,
										timerCount: this.timerCount,
										timerStart: this.props.store.currentTime.timerTime
									});
									//this.startTimer();
								}
							}
							///if(response == null) { 
							//	noResponse.push(clock.id); 
							//}
						})
						.catch((error) => {
							console.log(error)
						});*/
				}
			}
		}
		this.props.dispatch({
			type: 'MASTER_TIMER_SET_ALL',
			payload: {
				checked: true,
				timerOn: true,
				//timerCount: this.timerCount,
				//timerStart: this.props.store.currentTime.timerTime
			}
		});
		//}
		//}
	    /*setTimeout(() => {
		    if(noResponse.length > 0) {
			    var timers = "";
			    for (let id of noResponse) {
				    timers += id + ", "; 
			    }
			    timers = timers.replace(/,\s*$/, " ");
			    alert("Failed to receive response from timers: " + timers);
		    }
	    }, 3000 * this.props.clockConfigurations.length);*/
	};

	holdTimer = () => {
		var box = document.getElementsByName("check");
	
		for (let clock of this.props.clockConfigurations) {
			for (var i = 0; i < box.length; i++) {
				if (box[i].checked === true && box[i].id === clock.ip) {
					var data = this.props.store.countdownTimers
					for (var j = 0; j < data.length; j++) {
						if (data[j]['ip'] === clock.ip) {

							data[j]['paused'] = true;
							this.setState({
								timerOn: false
							})
							this.props.dispatch({
								type: 'MASTER_TIMER_SET_ALL',
								payload: {
									// timerOn: false,
									// timerCount: this.timerCount,
									// timerStart: this.props.store.currentTime.timerTime
								}
							});
						}

					}
				}
			}
		}
				// clearInterval(this.timer);
				// this.setState({
				// 	timerOn: false,
				// 	timerCount: Math.floor(this.timerCount / 100) * 100
				// });
				// this.props.dispatch({
				// 	type: 'MASTER_TIMER_SET_ALL',
				// 	payload: {
				// 		// timerOn: false,
				// 		// timerCount: this.timerCount,
				// 		// timerStart: this.props.store.currentTime.timerTime
				// 	}
				// });
				//const noResponse = [];
				/*for (let clock of this.props.clockConfigurations) {
					Api.pause({
						id: clock.id,
						ip: clock.ip,
						webServiceUrl: "http://" + clock.ip + ":4743/clockwerxWS"
					})
						.then((response) => {
							//if(response == null) {
								//noResponse.push(clock.id); 
							
						})
						.catch((error) => {
							console.log(error)
						});
				}*/
				/*setTimeout(() => {
					if(noResponse.length > 0) {
						var timers = "";
						for (let id of noResponse) {
							timers += id + ", "; 
						}
						timers = timers.replace(/,\s*$/, " ");
						alert("Failed to receive response from timers: " + timers);
					}
				}, 3000 * this.props.clockConfigurations.length);*/
			};

			stopTimer = () => {
				var box = document.getElementsByName("check");
				// clearInterval(this.time);
				// this.props.store.masterTime.timerCount = 0;
				// this.setState({
				// 	timerOn: false,
				// 	timerCount: 0
				// });

				//const noResponse = [];
				for (let clock of this.props.clockConfigurations) {
					for (var i = 0; i < box.length; i++) {
						if (box[i].checked === true && box[i].id === clock.ip) {
							var data = this.props.store.countdownTimers
							for (var j = 0; j < data.length; j++) {
								if (data[j]['ip'] === clock.ip) {
									data[j]['on'] = false;
									this.setState({ timerOn: false })
									this.props.dispatch({
										type: 'MASTER_TIMER_ON',
										payload: false
									});
								}

							}
							/*Api.stop({
								id: clock.id,
								ip: clock.ip,
								webServiceUrl: "http://" + clock.ip + ":4743/clockwerxWS"
								//id: "Tours",
								//ip: "192.168.8.135",
								//webServiceUrl: "http://192.168.8.135:4743/clockwerxWS",
				
							})
								.then((response) => {
									//if(response == null) {
									//	noResponse.push(clock.id); 
									
								})
								.catch((error) => {
									console.log(error)
								});*/
						}
					}
				}

				/*setTimeout(() => {
					if(noResponse.length > 0) {
						var timers = "";
						for (let id of noResponse) {
							timers += id + ", "; 
						}
						timers = timers.replace(/,\s*$/, " ");
						alert("Failed to receive response from timers: " + timers);
					}
				}, 3000 * this.props.clockConfigurations.length);*/

			};

			resetTimer = () => {
				this.props.dispatch({
					type: 'MASTER_TIMER_COUNT',
					payload: this.props.store.masterTime.timerStart
				});
			};

			resumeTimer = () => {
				this.props.dispatch({
					type: 'MASTER_TIMER_ON',
					payload: true
				});
				//this.createTimerInterval();
			}

			powerCycleClocks = () => {
				for (let clock of this.props.clockConfigurations) {
					console.log("host ip" + this.props.hostIP)
					console.log("ip: " + clock.ip)
					if (clock.ip === "192.168.12.137") {
						console.log("calling power cycle")
						Api.powerCycleClock({
							// id: clock.id,
							// ip: clock.ip,
							id: 'Marathon',
							ip: '192.168.12.137',
							webServiceUrl: "http://" + clock.ip + ":4743/clockwerxWS",
							//webServiceUrl: "http://192.168.12.137:4743/clockwerxWS"
						})
							.catch((error) => {
								console.log(error)
							}); console.log("called power cycle")
					}
				}
			}

			check = () => {
				
				var doc = document.getElementsByName("check");
				var selectAllCheckBox = document.getElementById("checkall");

				if (selectAllCheckBox.checked === false) {
					selectAllCheckBox.checked = true;
					for (var i = 0; i < doc.length; i++) {
						doc[i].checked = true;
						this.props.store.masterTime.checked = true;
						this.props.store.masterTime.selectAll = true;
						this.props.store.countdownTimers[i]['checked'] = true;
						
					}
				} else {
					selectAllCheckBox.checked = false;
					for (var j = 0; j < doc.length; j++) {
						doc[j].checked = false;
						this.props.store.masterTime.checked = false;
						this.props.store.masterTime.selectAll = false;
						this.props.store.countdownTimers[j]['checked'] = false;
						


					}
				}
				this.props.dispatch({
					type: 'MASTER_TIMER_ON',
					// payload: true
				});
			}

			render() {
				let { timerOn } = this.state;
				var boxesChecked = this.props.store.masterTime.checked;
				// var boxesChecked = false;
				// for(var i = 0; i < box.length; i++){
				// 	if(box[i].checked === true)
				// 	{
				// 		boxesChecked = true;
				// 	}
				// }

				return (
					<div align="center">
						{(timerOn === false || (timerOn === true && boxesChecked === false)) && (
							<button className="btn btn_start" onClick={this.startTimer}><span>Start</span></button>
						)}
						{timerOn === true && boxesChecked === true && (
							<button className="btn btn_hold" onClick={this.holdTimer}><span>Pause</span></button>
						)}
						<button className="btn btn_stop" onClick={this.stopTimer}><span>Stop</span></button>
						<button className="btn btn_switch" onClick={this.powerCycleClocks}><span>Power</span></button>
						<fieldset className="fieldset" align="center" style={{ margin: "auto", textAlign: "center" }}>
							<p className="checkbox" style={{ marginLeft: "38%", marginTop: 5 }} onClick={this.check}>
								<input type="checkbox" name="checkall" id="checkall" />
								<label htmlFor="checkall">Select All</label>
							</p>
						</fieldset>
					</div>

				);
			}

			/*render (){
				return (
					<div>
					<button onClick={this.startTimer} className="btn btn_start mix-btn_lg"><span>Start</span></button>
					<button onClick={this.stopTimer} className="btn btn_stop mix-btn_lg"><span>Stop</span></button>
				</div>
				);
			} */


			/*render (){
				return (
					<div>
						<button onClick={this.startTimer} className="btn btn_start mix-btn_lg"><span>Start</span></button>
						<button onClick={this.holdTimer} className="btn btn_hold mix-btn_lg"><span>Hold</span></button>
						<button onClick={this.stopTimer} className="btn btn_stop mix-btn_lg"><span>Stop</span></button>
						<button onClick={this.startTimer} className="btn btn_start mix-btn_lg"><span>Resume</span></button>
						<button onClick={this.resetTimer} className="btn btn_reset mix-btn_lg"><span>Reset</span></button>
					</div>
				);
			}*/

		}

		export default connect(mapReduxStoreToProps)(MasterCountdown);
