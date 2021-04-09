import React, { Component } from "react";
import HomeItem from "../homeitem/HomeItem";
import "./style.css";
import { PropTypes } from "react";

export class PrintHomes extends Component {
  state = {
    numHomes: 0,
    sqft: 0,
    heating: "gas",
    evCharging: "none",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addHomes(this.state);

    console.log(this.state);
  };

  handleClick = (e) => {
    e.preventDefault();
    this.setState({ numHomes: 0, sqft: 0, heating: "gas", evCharging: "none" });
  };

  render() {
    return (
      <div className="print-homes-container">
        <div className="print-homes-div">
          <h3>Add Homes:</h3>
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
              <input
                name="sqft"
                type="text"
                value={this.state.sqft}
                onChange={this.handleChange}
              />
            </div>
            <div className="home-details">
              <label>Enter Heating of Homes:</label>
              <select
                name="heating"
                value={this.state.heating}
                onChange={this.handleChange}
              >
                <option value="gas">Gas</option>
                <option value="electric">Electric</option>
              </select>
            </div>
            <div className="home-details">
              <label>Enter EV Charging Type of Homes:</label>
              <select
                name="evCharging"
                value={this.state.evCharging}
                onChange={this.handleChange}
              >
                <option value="none">No EV Charging</option>
                <option value="tier1">Tier 1 (1.8 kW)</option>
                <option value="tier2">Tier 2 (7.2 kW)</option>
              </select>
            </div>
            <input className="primary-btn" type="submit" value="Submit" />
            <button className="del-btn" onClick={this.handleClick}>Reset</button>
          </form>
        </div>
        <div className="print-homes-div">
          <h3>Adjust Price</h3>
          <form onSubmit={this.props.changePrice}>
          <div className="cost">
            <div>
              <label>Adjust Price of 10 kVA Transformer ($)</label>
              <input
                name="transformers"
                id={0}
                value={this.props.transformers[0].price}
                onChange={this.props.changePrice}
              />
            </div>
            <div>
              <label>Adjust Price of 15 kVA Transformer ($)</label>
              <input
                id={1}
                value={this.props.transformers[1].price}
                onChange={this.props.changePrice}
              />
            </div>
            <div>
              <label>Adjust Price of 25 kVA Transformer ($)</label>
              <input
                name="transformers"
                id={2}
                value={this.props.transformers[2].price}
                onChange={this.props.changePrice}
              />
            </div>
            <div>
              <label>Adjust Price of 37.5 kVA Transformer ($)</label>
              <input
                name="transformers"
                id={3}
                value={this.props.transformers[3].price}
                onChange={this.props.changePrice}
              />
            </div>
            <div>
              <label>Adjust Price of 50 kVA Transformer ($)</label>
              <input
                name="transformers"
                id={4}
                value={this.props.transformers[4].price}
                onChange={this.props.changePrice}
              />
            </div>
            <div>
              <label>Adjust Price of 75 kVA Transformer ($)</label>
              <input
                name="transformers"
                id={5}
                value={this.props.transformers[5].price}
                onChange={this.props.changePrice}
              />
            </div>
            <div>
              <label>Adjust Price of 100 kVA Transformer ($)</label>
              <input
                name="transformers"
                id={6}
                value={this.props.transformers[6].price}
                onChange={this.props.changePrice}
              />
            </div>
            <div>
              <label>Adjust Price of 167 kVA Transformer ($)</label>
              <input
                name="transformers"
                id={7}
                value={this.props.transformers[7].price}
                onChange={this.props.ChangePrice}
              />
            </div>
          </div>
          <input className="primary-btn" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default PrintHomes;
