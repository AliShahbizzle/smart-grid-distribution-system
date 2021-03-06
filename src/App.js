import logo from "./logo.svg";
import Navbar from "./components/navbar/Navbar.js";
import UserInputs from "./components/userinputs/UserInputs.js";
import PrintHomes from "./components/printhomes/PrintHomes";
import HomePage from "./components/homepage/HomePage";
import Results from "./components/results/Results";
import CalculateTransformer from "./components/calculatetransformer/CalculateTransformer";
import { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

class App extends Component {
  state = {
    homes: [{ homeID: 1, sqft: 0, heating: "electric", EV: "none" }],
    divFactor: 0, 
    transformer_size: "0",
    transformer_size2: "0",
    price: "0",
    numHomes: "0",
    summer_demand: 0,
    winter_demand: 0,
    connectedPeakSummer: 0,
    connectedPeakWinter: 0,
    EVDemand1: 0,
    EVDemand2: 0,
    numTransformers: 0,
    transformers: [
      {
        size: 10,
        summer140: 14,
        winter160: 16,
        price: 1000,
      },
      {
        size: 15,
        summer140: 21,
        winter160: 24,
        price: 1500,
      },
      {
        size: 25,
        summer140: 35,
        winter160: 40,
        price: 2500,
      },
      {
        size: 37.5,
        summer140: 53,
        winter160: 60,
        price: 3750,
      },
      {
        size: 50,
        summer140: 70,
        winter160: 80,
        price: 5000,
      },
      {
        size: 75,
        summer140: 105,
        winter160: 120,
        price: 7500,
      },
      {
        size: 100,
        summer140: 140,
        winter160: 160,
        price: 10000,
      },
      {
        size: 167,
        summer140: 234,
        winter160: 267,
        price: 16700,
      },
    ],
  };

  addHomes = (newHomes) => {
    console.log(newHomes.numHomes);
    let currentID = 0;
    if (this.state.homes.length != 0) {
      currentID = this.state.homes[this.state.homes.length - 1].homeID;
    }
    let numNewHomes = newHomes.numHomes;
    let sqftNewHomes = newHomes.sqft;
    let i;
    let data = [];
    console.log(currentID);
    for (i = 0; i < Number(numNewHomes); i++) {
      currentID = Number(currentID) + 1;
      data[i] = {
        homeID: currentID,
        sqft: sqftNewHomes,
        heating: newHomes.heating,
        EV: newHomes.evCharging,
      };
    }
    let newData = this.state.homes.concat(data);
    this.setState({ homes: newData });
  };

  removeHome = (e) => {
    e.preventDefault();
    let homeID = Number(e.target.id);
    this.setState({
      homes: [...this.state.homes.filter((home) => home.homeID !== homeID)],
    });
    console.log("removed but not really");
    console.log(homeID + homeID);
    console.log(this.state.homes);
  };

  clearAll = (e) => {
    e.preventDefault();
    this.setState({
      homes: []
    });
  }

  changePrice = (event) => {
    event.preventDefault();
    let value = Number(event.target.value);
    let id = event.target.id
    let name = event.target.name;
    let newArr = [...this.state.transformers];
    newArr[id].price = value;
    this.setState({ newArr }, function () {
      {
        console.log("Hello");
        console.log(this.state);
      }
    });
  }

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
    let divFactors = [
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
    let EVDemand1;
    let EVDemand2;
    let numTransformers = 0
    let connectedPeakSummer = 0;
    let connectedPeakWinter = 0;
    let calculatedDivFactor;
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
    let num_transformers = 0;
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

    if (numHomes > 20){
      calculatedDivFactor = 0.54
    } 
    else {
      calculatedDivFactor = divFactors[numHomes - 1]
    }

    connectedPeakSummer=
      (summer_electric * num_electric +
        summer_gas * num_gas +
        num_tier1 * 1.8 +
        num_tier2 * 7.2)

    connectedPeakWinter =
      (winter_electric * num_electric +
        winter_gas * num_gas +
        num_tier1 * 1.8 +
        num_tier2 * 7.2)

    EVDemand1 = num_tier1 * 1.8
    EVDemand2 = num_tier2 * 7.2
    summer_demand = connectedPeakSummer * calculatedDivFactor
    winter_demand = connectedPeakWinter * calculatedDivFactor



    this.setState({
      EVDemand1: EVDemand1,
      EVDemand2: EVDemand2,
      divFactor: calculatedDivFactor,
      connectedPeakSummer: connectedPeakSummer.toFixed(2),
      connectedPeakWinter: connectedPeakWinter.toFixed(2),
      summer_demand: summer_demand.toFixed(2),
      winter_demand: winter_demand.toFixed(2),
    });
    
    console.log(this.state.transformers.map((transformer) => {
      console.log(transformer.summer140 - summer_demand)
      if (((transformer.summer140 - summer_demand) >= 0) && (transformer.winter160 - winter_demand >= 0)){
          return 1

      }
      else if ((transformer.summer140 - summer_demand) <= (transformer.winter160 - winter_demand)){
        return Math.ceil(summer_demand/transformer.summer140)
      }
      else if ((transformer.summer140 - summer_demand) > (transformer.winter160 - winter_demand)){
        return Math.ceil(winter_demand/transformer.winter160)
      }
    }))
    let j;
    let newNumTransformers = []
    for (j=0; j < numTransformers.length; j++){
      newNumTransformers[j] = numTransformers[j]
    }


    if (summer_demand > 234 || winter_demand > 267) {
      if (Math.ceil(summer_demand / 234) > Math.ceil(winter_demand / 267)) {
        num_transformers = Math.ceil(summer_demand / 234);
      } else {
        num_transformers = Math.ceil(winter_demand / 267);
      }
    } else if (summer_demand > 140 || winter_demand > 160) {
      transformer_size = 167;
      price = price + this.state.transformers[7].price;
    } else if (summer_demand > 105 || winter_demand > 120) {
      transformer_size = 100;
      price = price + this.state.transformers[6].price;
    } else if (summer_demand > 70 || winter_demand > 80) {
      transformer_size = 75;
      price = price + this.state.transformers[5].price;
    } else if (summer_demand > 53 || winter_demand > 60) {
      transformer_size = 50;
      price = price + this.state.transformers[4].price;
    } else if (summer_demand > 35 || winter_demand > 40) {
      transformer_size = 37.5;
      price = price + this.state.transformers[3].price;
    } else if (summer_demand > 21 || winter_demand > 24) {
      transformer_size = 25;
      price = price + this.state.transformers[2].price;
    } else if (summer_demand > 14 || winter_demand > 16) {
      transformer_size = 15;
      price = price + this.state.transformers[1].price;
    } else {
      transformer_size = 10;
      price = price + this.state.transformers[0].price;
    }
    console.log(newNumTransformers)
    this.setState({
      numTransformers: newNumTransformers,
      transformer_size: transformer_size,
      transformer_size2: transformer_size2,
      numHomes: numHomes,
      price: price,
    });

    console.log("Transformer size is " + this.state.transformer_size);
    console.log(this.state.numTransformers)

    console.log(this.state.transformers);
    console.log(totalSQFT / numHomes);
    console.log("there are " + num_tier1 + " homes");
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/transformer">
              <PrintHomes 
              addHomes={this.addHomes}
              transformers={this.state.transformers}
              changePrice={this.changePrice}
              />
              <CalculateTransformer
                EVDemand1={this.state.EVDemand1}
                EVDemand2={this.state.EVDemand2}
                homes={this.state.homes}
                divFactor={this.state.divFactor}
                connectedPeakSummer={this.state.connectedPeakSummer}
                connectedPeakWinter={this.state.connectedPeakWinter}
                summer_demand={this.state.summer_demand}
                winter_demand={this.state.winter_demand}
                numHomes={this.state.numHomes}
                transformer_size={this.state.transformer_size}
                transformer_size2={this.state.transformer_size2}
                price={this.state.price}
                calculateTransformer={this.calculateTransformer}
                handleSubmit={this.handleSubmit}
                handleChangeSQFT={this.handleChangeSQFT}
                handleChangeHeating={this.handleChangeHeating}
                handleChangeEV={this.handleChangeEV}
                removeHome={this.removeHome}
                clearAll={this.clearAll}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
