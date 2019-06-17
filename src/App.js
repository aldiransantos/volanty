import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      marks: [],
      models: [],
      ages: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.getMark = this.getMark.bind(this);
    this.getModel = this.getModel.bind(this);
    this.getAge = this.getAge.bind(this);
  }

  componentDidMount() {
    this.getMarkData();
    this.getModelData();
    this.getAgeData();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.getMark(event);
    this.getModel(event);
    this.getAge(event);
    alert('test');
  }

  getMark(event) {
    // this.getModel(event);
    this.getMarkData(this.refs.markRef.value)
    this.setState({ markValue: event.target.value });
  }

  getModel(event) {
    'use restrict'
    this.getModelData(this.refs.modelRef.value)
    this.setState({ modelValue: event.target.value });
  }

  getAge(event) {
    this.getAgeData(this.refs.ageRef.value)
    this.setState({ ageValue: event.target.value });
  }

  getMarkData() {
    const url = `http://fipeapi.appspot.com/api/1/carros/marcas.json`;
    fetch(url)
      .then(data => data.json())
      .then(data => this.setState({ marks: data }));
  }

  getModelData(markValue = '1') {
    const url = `http://fipeapi.appspot.com/api/1/carros/veiculos/${markValue}.json`;
    fetch(url)
      .then(data => data.json())
      .then(data => this.setState({ models: data }));
  }

  getAgeData(markValue = '1', modelValue = '1') {
    const url = `http://fipeapi.appspot.com/api/1/carros/veiculo/${markValue}/${modelValue}.json`;
    fetch(url)
      .then(data => data.json())
      .then(data => this.setState({ ages: data }));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Some legend</legend>

            <select onClick={(e) => this.getMark(e)}>
              {this.state.marks.map(function (mark, index) {
                return (
                  <option
                    ref="markRef"
                    key={index}
                    value={mark.name}>
                    {mark.name}
                  </option>
                )
              }
              )}
            </select>

            <select onChange={(e) => this.getModel(e)}>
              {this.state.models.map(function (model, index) {
                return (
                  <option
                    ref="modelRef"
                    key={index}
                    value={model.id}>
                    {model.name}
                  </option>
                )
              }
              )}
            </select>

            <select onClick={(e) => this.getAge(e)}>
              {this.state.ages.map(function (age, index) {
                return (
                  <option
                    ref="ageRef"
                    key={index}
                    value={age.name}>
                    {age.name}
                  </option>
                )
              }
              )}
            </select>
          </fieldset>

          <button type="submit">Show data</button>
        </form>

        <div className="result">
          <h3>Mark</h3>
          <div>
            {this.state.markValue}
          </div>

          <h3>Model</h3>
          <div>
            <p>{this.state.modelValue}</p>
          </div>

          <h3>Age</h3>
          <div>
            <p>{this.state.ageValue}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;