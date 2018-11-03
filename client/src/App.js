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
      getTemp(index).then((res) => {
        const data = res.data;
        that.setState({ data })
      });
      index = index + 1;
      setTimeout(getData, 1000)
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
            <Beer beer={beer}/>
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
  min-height: calc(100vh - 130px);
  display: flex;
  justify-content: center;
`;

export default App;