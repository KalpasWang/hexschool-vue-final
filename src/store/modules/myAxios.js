import Axios from 'axios';

const token = document.cookie.replace(
  /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
  '$1'
);
console.log('my token', token);
Axios.defaults.headers.common.Authorization = `${token}`;

export default Axios;
