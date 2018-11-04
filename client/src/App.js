import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { getTemp, reset, setTarget } from './api';
import Banner from './components/Banner';
import Settings from './components/Settings';
import RefreshButton from './components/RefreshButton';
import Beer from './components/Beer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      timeout: 3
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData()
      .catch(err => console.log(err));
  }

  async getData() {
    const that = this;
    getTemp()
      .then(res => that.setState({
        data: res.data
      }));
    setTimeout(this.getData, this.state.timeout * 60000);
  }

  handleResetClick(id) {
    reset(id)
      .then(() => this.getData());
  }

  handleTargetChange(id, target) {
    setTarget(id, target)
      .then(() => this.getData());
  }

  render() {
    const setTimeout = (timeout) => this.setState({
      timeout: timeout < 0.1
        ? 0.1
        : timeout
    });

    return (
      <div>
        <GlobalStyle/>
        <RefreshButton onClick={this.getData}/>
        <Settings
          timeout={this.state.timeout}
          setTimeout={setTimeout}
        />
        <Banner/>
        <BeersWrapper>
        {
          this.state.data
            .sort((a, b) => a.id > b.id ? 1 : -1)
            .map((beer, i) => (
              <Beer
                key={beer.id}
                index={i}
                beer={beer}
                onResetClick={() => this.handleResetClick(beer.id)}
                onTargetChange={(target) => this.handleTargetChange(beer.id, target)}
              />
            ))
        }
        </BeersWrapper>
      </div>
    )
  }
}

const GlobalStyle = createGlobalStyle`
  html {
    font-family: 'Montserrat', sans-serif;
  }
  
  body {
    background-color: #e0e1e0;
    padding: 0;
    margin: 0;
    height: 100%
    min-height: 100vh
  }
  .footer {
    background-color: #1c1b1d;
    color: #dddddd;
    width: 100vw;
    text-align: center;
    height: 50px;
    line-height: 50px;
    position:relative;
    bottom:0;
  }
`;

const BeersWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: calc(100vh - 130px);
  justify-content: center;
`;

export default App;