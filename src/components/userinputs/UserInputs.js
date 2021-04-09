import React, { Component } from "react";
import * as ReactBootStrap from "react-bootstrap";
import "./style.css";
import HomeItem from "../homeitem/HomeItem";
import PrintHomes from "../printhomes/PrintHomes";

export class Navbar extends Component {
  state = {
    homes: [
      { homeID: "1", sqft: "0", heating: "electric", EV: "none" },
      { homeID: "2", sqft: "0", heating: "electric", EV: "none" },
      { homeID: "3", sqft: "0", heating: "electric", EV: "none" },
      { homeID: "4", sqft: "0", heating: "electric", EV: "none" },
      { homeID: "5", sqft: "0", heating: "electric", EV: "none" },
      { homeID: "6", sqft: "0", heating: "electric", EV: "none" },
      { homeID: "7", sqft: "0", heating: "electric", EV: "none" },
      { homeID: "8", sqft: "0", heating: "electric", EV: "none" },
      { homeID: "9", sqft: "0", heating: "electric", EV: "none" },
      { homeID: "10", sqft: "0", heating: "electric", EV: "none" },
      { homeID: "11", sqft: "0", heating: "electric", EV: "none" },
      { homeID: "12", sqft: "0", heating: "electric", EV: "none" },
      { homeID: "13", sqft: "0", heating: "electric", EV: "none" },
      { homeID: "14", sqft: "0", heating: "electric", EV: "none" },
      { homeID: "15", sqft: "0", heating: "electric", EV: "none" },
      { homeID: "16", sqft: "0", heating: "electric", EV: "none" },
      { homeID: "17", sqft: "0", heating: "electric", EV: "none" },
      { homeID: "18", sqft: "0", heating: "electric", EV: "none" },
      { homeID: "19", sqft: "0", heating: "electric", EV: "none" },
      { homeID: "20", sqft: "0", heating: "electric", EV: "none" },
    ],
    divFactor: [
      1,
      0.9,
      0.75,
      0.65,
      0.63,
      0.62,
      0.61,
      0.61,
      0.61,
      0.61,
      0.6,
      0.59,
      0.58,
      0.58,
      0.57,
      0.57,
      0.56,
      0.54,
      0.54,
      0.54,
    ],
    transformer_size: "0",
    transformer_size2: "0",
    price: "0",
    numHomes: "0",
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name[1]]: event.target.value });
    console.log(this.state);
  };

  handleChangeSQFT = (event) => {
    let value = event.target.value;
    let id = event.target.id - 1;
    let name = event.target.name;
    let newArr = [...this.state.homes];
    newArr[id].sqft = value;
    event.preventDefault();
    this.setState({ newArr }, function () {
      {
        console.log("Hello");
        console.log(this.state);
      }
    });
  };

  handleChangeHeating = (event) => {
    let value = event.target.value;
    let id = event.target.id - 1;
    let name = event.target.name;
    let newArr = [...this.state.homes];
    newArr[id].heating = value;
    event.preventDefault();
    this.setState({ newArr }, function () {
      {
        console.log("Hello");
        console.log(this.state);
      }
    });
  };

  handleChangeEV = (event) => {
    let value = event.target.value;
    let id = event.target.id - 1;
    let name = event.target.name;
    let newArr = [...this.state.homes];
    newArr[id].EV = value;
    event.preventDefault();
    this.setState({ newArr }, function () {
      {
        console.log("Hello");
        console.log(this.state);
      }
    });
  };

  calculateTransformer = () => {
    let divFactor = [
      1,
      0.9,
      0.75,
      0.65,
      0.63,
      0.62,
      0.61,
      0.61,
      0.61,
      0.61,
      0.6,
      0.59,
      0.58,
      0.58,
      0.57,
      0.57,
      0.56,
      0.54,
      0.54,
      0.54,
    ];
    let i;
    let num_electric = 0;
    let num_gas = 0;
    let summer_electric = 0;
    let summer_gas = 0;
    let winter_electric = 0;
    let winter_gas = 0;
    let avg_sqft = 0;
    let totalSQFT = 0;
    let numHomes = 0;
    let num_tier1 = 0;
    let num_tier2 = 0;
    let summer_demand = 0;
    let winter_demand = 0;
    let transformer_size = 0;
    let transformer_size2 = 0;
    let price = 0;

    for (i = 0; i < this.state.homes.length; i++) {
      if (this.state.homes[i].sqft != 0) numHomes = Number(numHomes) + 1;
      totalSQFT = totalSQFT + Number(this.state.homes[i].sqft);
    }
    for (i = 0; i < this.state.homes.length; i++) {
      if (
        this.state.homes[i].sqft != 0 &&
        this.state.homes[i].heating == "electric"
      ) {
        num_electric = Number(num_electric) + 1;
      } else if (
        this.state.homes[i].sqft != 0 &&
        this.state.homes[i].heating == "gas"
      )
        num_gas = Number(num_gas) + 1;
    }
    for (i = 0; i < this.state.homes.length; i++) {
      if (this.state.homes[i].sqft != 0 && this.state.homes[i].EV == "tier1")
        num_tier1 = Number(num_tier1) + 1;
      else if (
        this.state.homes[i].sqft != 0 &&
        this.state.homes[i].EV == "tier2"
      ) {
        num_tier2 = Number(num_tier2) + 1;
      }
    }

    avg_sqft = totalSQFT / numHomes;

    if (1200 >= avg_sqft) {
      summer_electric = 13;
      winter_electric = 15;
      summer_gas = 8;
      winter_gas = 8;
    } else if (1200 < avg_sqft && avg_sqft <= 1500) {
      summer_electric = 15;
      winter_electric = 18;
      summer_gas = 10;
      winter_gas = 10;
    } else if (1500 < avg_sqft && avg_sqft <= 1800) {
      summer_electric = 16;
      winter_electric = 20;
      summer_gas = 11;
      winter_gas = 11;
    } else if (1800 < avg_sqft && avg_sqft <= 2400) {
      summer_electric = 18;
      winter_electric = 21;
      summer_gas = 12;
      winter_gas = 11;
    } else if (2400 < avg_sqft) {
      summer_electric = 21;
      winter_electric = 26;
      summer_gas = 14;
      winter_gas = 11;
    }

    summer_demand =
      (summer_electric * num_electric +
        summer_gas * num_gas +
        num_tier1 * 1.8 +
        num_tier2 * 7.2) *
      divFactor[numHomes - 1];
    winter_demand =
      (winter_electric * num_electric +
        winter_gas * num_gas +
        num_tier1 * 1.8 +
        num_tier2 * 7.2) *
      divFactor[numHomes - 1];

    if (summer_demand > 200 || winter_demand > 220) {
      summer_demand = summer_demand % 200;
      winter_demand = winter_demand % 200;
      transformer_size2 = 167;
      price = 4500;
    }

    if (
      (summer_demand > 140 && summer_demand < 200) ||
      (winter_demand > 160 && winter_demand < 220)
    ) {
      transformer_size = 167;
      price = price + 4500;
    } else if (summer_demand > 105 || winter_demand > 120) {
      transformer_size = 100;
      price = price + 4000;
    } else if (summer_demand > 70 || winter_demand > 80) {
      transformer_size = 75;
      price = price + 3500;
    } else if (summer_demand > 53 || winter_demand > 60) {
      transformer_size = 50;
      price = price + 3000;
    } else if (summer_demand > 35 || winter_demand > 40) {
      transformer_size = 37.5;
      price = price + 2500;
    } else if (summer_demand > 21 || winter_demand > 24) {
      transformer_size = 25;
      price = price + 2000;
    } else if (summer_demand > 14 || winter_demand > 16) {
      transformer_size = 15;
      price = price + 1500;
    } else {
      transformer_size = 10;
      price = price + 1000;
    }

    this.setState({
      transformer_size: transformer_size,
      transformer_size2: transformer_size2,
      numHomes: numHomes,
      price: price  
    })

    console.log("Transformer size is " + this.state.transformer_size);

    console.log(totalSQFT);
    console.log(totalSQFT / numHomes);
    console.log("there are " + num_tier1 + " homes");
  };

  render() {
    return (
      <div>
        <div>
          <div>
            <h4>
              Number of Homes: {this.state.numHomes}
              <br/>
              Transformer Size 1: {this.state.transformer_size} kVA
              <br/>
              Transformer Size 2: {this.state.transformer_size2} kVA
              <br/>
              Price: ${this.state.price}
            </h4>
          </div>
          <button onClick={this.calculateTransformer}>Calculate</button>
        </div>
        <h5>Please modify parameters for homes:</h5>
        <div>
          <form
            onSubmit={this.handleSubmit}
            className="search-form"
          >
            {this.state.homes.map((home) => (
              <div>
                <label>Home {home.homeID} SQFT</label>
                <input
                  type="text"
                  id={home.homeID}
                  name="sqft"
                  onChange={this.handleChangeSQFT}
                ></input>
                <label>Heating Type</label>
                <select
                  id={home.homeID}
                  name="heating"
                  onChange={this.handleChangeHeating}
                >
                  <option value="electric">Electric</option>
                  <option value="gas">Gas</option>
                </select>
                <label>EV Charging</label>
                <select
                  id={home.homeID}
                  name="EV"
                  onChange={this.handleChangeEV}
                >
                  <option value="none">None</option>
                  <option value="tier1">Tier 1 (120 VAC)</option>
                  <option value="tier2">Tier 2 (240 VAC)</option>
                </select>
              </div>
            ))}
          </form>
        </div>
      </div>
    );
  }
}

export default Navbar;
