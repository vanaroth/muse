import React, { useState } from 'react';
import { Redirect, useHistory, useLocation, Link } from 'react-router-dom';
import axios from 'axios';

import './LoginForm.css';
import { LoginForm } from './LoginForm';

export const Login = (props) => {
  const { authorisation, setAuthorisation } = props;
  //testServerConnexion();
  return <LoginForm {...props} />;
};

const testServerConnexion = (setAuthorisation) => {
  axios
    .get('/api/')
    .then(
      (r) =>
        r.data.isLogin &&
        setAuthorisation((p) => ({ ...p, isAuthenticated: true }))
    );
};
