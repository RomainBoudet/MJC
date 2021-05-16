import axios from 'axios';
/*
export default axios.create({
  baseURL: 'http://lesgardiensdelalegende.fr:3000/v1/',
  timeout: 10000,
});
*/

export default axios.create({
  baseURL: 'https://localhost:3000/v1/',
  timeout: 10000,
  withCredentials: true,
});

