import React, { useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';
import { Loader } from '../../components/Loader';

export const Signout = ({ setAuthorisation }) => {
  const history = useHistory();

  useEffect(() => {
    setAuthorisation((p) => ({ ...p, isAuthenticated: false }));

    axios
      .get('/api/signout')
      .then((r) => {
        !r.data.isLogin
          ? message.success(' Déconnexion Réussi')
          : message.error('Erreur de déconnexion 1');

        !r.data.isLogin ? history.push('/login') : history.push('/load');
      })
      .catch((e) => {
        message.error(' Une erreur est survenu lors de la déconnexion');
        history.push('/load');
      });
  }, [history, setAuthorisation]);

  return <Loader />;
};
