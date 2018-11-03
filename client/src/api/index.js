import axios from 'axios';

export function getTemp(index) {
  const response = {data: [{
    id: 0,
    temp: 27-index/10,
    time: Math.floor(new Date().getTime() / 1000),
    delta: 0.1
  }]};
  return new Promise((resolve, reject) => {
    resolve(response);
  })
}

export function reset(id) {

}