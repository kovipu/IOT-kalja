import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { getTemp } from './api';
import Banner from './components/Banner';
import Settings from './components/Settings';
import Beer from './components/Beer';

class App extends Component {
  state = {
    data: [],
    timeout: 3
  };

  componentDidMount() {
    const that = this;
    const getData = async () => {
      console.log('fetching');
      getTemp().then((res) => {
        const data = res.data;
        that.setState({ data })
      });
      setTimeout(getData, this.state.timeout * 60000)
    };
    getData();
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
        <Settings
          timeout={this.state.timeout}
          setTimeout={setTimeout}
        />
        <Banner/>
        <BeersWrapper>
        {
          this.state.data.map(beer => (
            <Beer key={beer.id} beer={beer}/>
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