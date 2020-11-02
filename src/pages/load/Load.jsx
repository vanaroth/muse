import React from 'react';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Loader } from '../../components/Loader';

export const Load = ({ authorisation, setAuthorisation }) => {
  //TestAskConnect();
  const history = useHistory();
  const location = useLocation();
  console.log('Load', location);
  axios
    .get('/api/')
    .then((res) => {
      console.log('Log server Success response', res);
      if (res.data.isLogin) {
        setAuthorisation((p) => ({ ...p, isAuthenticated: true }));
        setTimeout(() => history.replace(location.state.from.pathname), 100);
      } else {
        setAuthorisation((p) => ({ ...p, isAuthenticated: false }));
      }
    })
    .catch((err) => {
      console.log('Log server Error response', err);
      setAuthorisation((p) => ({ ...p, isAuthenticated: false }));
    });
  return authorisation.isAuthenticated === null ? (
    <Loader />
  ) : (
    <Redirect to={{ pathname: '/login', state: location.state }} />
  );
};
