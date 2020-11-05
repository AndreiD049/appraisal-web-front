import React, { useContext, useState, useEffect } from 'react'
import GlobalContext from '../../../services/GlobalContext';
import NotificationService from '../../../services/NotificationService';
import { Redirect } from 'react-router-dom';

const AuthorizationRedirectComponent = ({ code, grant, to, failureNotification, ...props }) => {
  const global = useContext(GlobalContext);
  const [access, setAccess] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [notified, setNotified] = useState(false);

  useEffect(() => {
    const isAuthorized = global.Authorize(code, grant);
    setAccess(isAuthorized);
    if (global.security) {
      setRedirect(!isAuthorized);
      if (failureNotification && !isAuthorized && !notified) {
        NotificationService.notify(failureNotification);
        setNotified(true);
      }
    }
  }, [global, code, grant, failureNotification, notified]);

  let result = null;
  
  if (access) {
    result = props.children;
  }

  if (redirect) {

    result = ( <Redirect to={to ? to : '/'} /> );
  }

  return result;
};

export default AuthorizationRedirectComponent