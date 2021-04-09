import React, { Component } from "react";
import "./style.css"

export class CalculateTransformer extends Component {


  render() {
    return (
      <div>
        <div>
            <h3>Community Information: </h3>
          <div className="comm-info">
            <h4>
              Summer Demand: {this.props.summer_demand} kW
            </h4>
            <h4>
              Winter Demand: {this.props.winter_demand} kW
            </h4>

              <h4>
              Number of Homes: {this.props.numHomes}
              </h4>
              <h4>
              Transformer Size 1: {this.props.transformer_size} kVA
              </h4>
              <h4>
              Transformer Size 2: {this.props.transformer_size2} kVA
              </h4>
              <h4>
              Price: ${this.props.price}
            </h4>
          </div>
          <button onClick={this.props.calculateTransformer}>Calculate</button>
        </div>
        <div>
        <h5>Please modify parameters for homes:</h5>
        <button onClick={this.props.clearAll}>Clear All</button>
        </div>
        <div className="calc-trans">
          <form onSubmit={this.props.handleSubmit} className="search-form">
            {this.props.homes.map((home) => (
              <div>
                <label>Home {home.homeID} SQFT</label>
                <input
                  type="text"
                  id={home.homeID}
                  name="sqft"
                  value={home.sqft}
                  onChange={this.props.handleChangeSQFT}
                ></input>
                <label>Heating Type</label>
                <select
                  id={home.homeID}
                  name="heating"
                  onChange={this.props.handleChangeHeating}
                  value={home.heating}
                >
                  <option value="electric">Electric</option>
                  <option value="gas">Gas</option>
                </select>
                <label>EV Charging</label>
                <select
                    style={{"marginRight":"10px"}}
                  id={home.homeID}
                  name="EV"
                  onChange={this.props.handleChangeEV}
                  value={home.EV}
                >
                  <option value="none">None</option>
                  <option value="tier1">Tier 1 (120 VAC)</option>
                  <option value="tier2">Tier 2 (240 VAC)</option>
                </select>
                <button id={home.homeID} className="del-btn" onClick={this.props.removeHome}>Remove Home</button>
              </div>
            ))}
          </form>
        </div>
      </div>
    );
  }
}

export default CalculateTransformer;
