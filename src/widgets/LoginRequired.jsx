import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom'
import LoginService from '../services/LoginService';
import GlobalContext from '../services/GlobalContext';

const LoginRequired = () => {
  const [redirect, setRedirect] = useState(false);
  const global = useContext(GlobalContext);

  useEffect(() => {
    async function getUser() {
      const user = await LoginService.getCurrentUser(global.context);

      let ctxCopy = {...global.context};
      // There is no user anymore, probably logged out, so we need to remove it from the state
      if (user === null) {
        setRedirect(true);
        if (global.context.user) {
          ctxCopy.user = {};
          global.setContext(ctxCopy);
        }
      } else if (!global.context.user || global.context.user.oid !== user.oid) {
        global.setContext({...global.context, user: user});
      }
    }
    getUser();
  }, [global])

  return (
    <>
      {redirect ?
        <Redirect to='/login'/> :
        null
      }
    </>
  );
}

export default LoginRequired;