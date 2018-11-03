import axios from 'axios';

export function getTemp() {
  return axios.get('/states/')
}

export function reset(id) {
  return axios.post('/reset/', id, {
    headers: { 'Content-Type': 'text/plain' }
  });
}