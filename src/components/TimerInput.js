import React, { Component } from "react";
import { connect } from 'react-redux';
import mapReduxStoreToProps from '../redux/mapReduxStoreToProps';

class TimerInput extends Component {

  constructor(props) {
    super(props);
    this.handleInputHoursChange = this.handleInputHoursChange.bind(this);
    this.handleInputMinutesChange = this.handleInputMinutesChange.bind(this);
    this.handleInputSecondsChange = this.handleInputSecondsChange.bind(this);
  }

  handleInputHoursChange(e) {
    if(e.target.value > 23) {
	  e.target.value = 23;
    } else if (e.target.value < 0) {
	    e.target.value = 0;
    }
    this.props.onInputHoursChange(e.target.value);
  }

  handleInputMinutesChange(e) {
    if(e.target.value > 59) {
	  e.target.value = 59;
    } else if (e.target.value < 0) {
	    e.target.value = 0;
    }
    this.props.onInputMinutesChange(e.target.value);
  }

  handleInputSecondsChange(e) {
    if(e.target.value > 59) {
	  e.target.value = 59;
    } else if (e.target.value < 0) {
	    e.target.value = 0;
    }
    this.props.onInputSecondsChange(e.target.value);
  }

  changeInputTime = (event, timeKey) => {
    const newState = this.state;
    newState[timeKey] = parseInt(event.target.value);
    this.setState(newState);

    this.props.dispatch({
      type: `CURRENT_TIME_${timeKey.toUpperCase()}`,
      payload: event.target.value,
    })
    
  };
    
  render() {
    return (
      <div className="field">
        <input
          type="number"
	  min="0"
	  max="23"
          value={this.props.inputHours}
          onChange={this.handleInputHoursChange}
          className="field-item field-item_hrs"
          placeholder="00"
          required
        /> 
        <input
          type="number"
	  min="0"
	  max="59"
          value={this.props.inputMinutes}
          onChange={this.handleInputMinutesChange}
          className="field-item field-item_min"
          placeholder="00"
          required
        />
        <input
          type="number"
	  min="0"
	  max="59"
          value={this.props.inputSeconds}
          onChange={this.handleInputSecondsChange}
          className="field-item field-item_sec"
          placeholder="00"
          required
        />
      </div>
    );
  }
}

export default connect(mapReduxStoreToProps)(TimerInput);
