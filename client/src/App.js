import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { getTemp } from './api';
import Banner from './components/Banner';
import Beer from './components/Beer';
import Footer from './components/Footer';

class App extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    const that = this;
    let index = 0;
    const getData = async () => {
      getTemp().then((res) => {
        const data = res.data;
        that.setState({ data })
      });
      index = index + 1;
      setTimeout(getData, 5000)
    };
    getData();
  }

  render() {
    return (
      <div>
        <GlobalStyle/>
        <Banner/>
        <BeersWrapper>
        {
          this.state.data.map(beer => (
            <Beer key={beer.id} beer={beer}/>
          ))
        }
        </BeersWrapper>
        <Footer/>
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
  }
`;

const BeersWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export default App;