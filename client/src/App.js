import React, { Component } from 'react';
import { getTemp } from './api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    const that = this;
    let index = 0;
    const getData = async () => {
      getTemp(index).then((res) => {
        const data = res.data;
        that.setState({ data })
      })
      index = index + 1;
      setTimeout(getData, 1000)
    };
    getData();
  }
  render() {
    console.log(this.state.data);
    return <p>asd</p>
  }
}

export default App;