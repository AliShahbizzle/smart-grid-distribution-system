import React, { Component } from "react";
import HomeItem from "../homeitem/HomeItem";
import "./style.css"
import { PropTypes } from 'react'

export class PrintHomes extends Component {
  state = {
    numHomes: 0,
    sqft: 0, 
    heating: 'gas', 
    evCharging: 'none' 
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    console.log(this.state)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addHomes(this.state);

    console.log(this.state)
  }

  handleClick = (e) => {
    e.preventDefault();
    this.setState({ numHomes: 0, sqft: 0, heating: 'gas', evCharging: 'none'})
  }

  render() {
    return (
      <div>
        <h3>Add Homes:</h3>
      <div className="print-homes-div">
        <form className="print-homes-form" onSubmit={this.handleSubmit}>
          <div className="home-details">
            <label>Number of Homes:</label>
            <input
              type="text"
              name="numHomes"
              value={this.state.numHomes}
              onChange={this.handleChange}
            ></input>
          </div>
          <div className="home-details">
            <label>Enter Square Footage of Homes:</label>
            <input name= "sqft" type="text" value={this.state.sqft} onChange={this.handleChange}/>
          </div>
          <div className="home-details">
            <label>Enter Heating of Homes:</label>
            <select name="heating" value={this.state.heating} onChange={this.handleChange}>
              <option value="gas">Gas</option>
              <option value="electric">Electric</option>
            </select>
          </div>
          <div className="home-details">
            <label>Enter EV Charging Type of Homes:</label>
            <select name="evCharging" value={this.state.evCharging} onChange={this.handleChange}>
              <option value="none">No EV Charging</option>
              <option value="tier1">Tier 1 (1.8 kW)</option>
              <option value="tier2">Tier 2 (7.2 kW)</option>
            </select>
          </div>
          <input type="submit" value="Submit"/>
          <button onClick={this.handleClick}>Reset</button>
        </form>
      </div>
      </div>
    );
  }
}

export default PrintHomes;
