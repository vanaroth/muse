import axios from 'axios';
import { useHistory } from 'react-router-dom';

export function askConnect({ data, setAuthorisation, history }) {
  axios
    .post(`api.php/`, data)
    .then((res) => {
      console.log('askConnect', res);
      handleLoggin(res.isConnect, setAuthorisation, history);
    })
    .catch((err) => console.log('askConnect ERROR', err));
}

export function TestAskConnect() {
  axios
    .post(`api.php/`, { conexion: { key: 'C455845646Af545' } })
    .then((res) => {
      console.log('TestAskConnect', res);
    })
    .catch((err) => console.log('TestAskConnect ERROR', err));
}

export function handleLoggin(value, setAuthorisation, history) {
  setAuthorisation(value);
  setTimeout(() => history.push('/'), 100);
}
