import axios from 'axios';

export function getTemp() {
  return axios.get('/states/')
}

export function reset(id) {

}