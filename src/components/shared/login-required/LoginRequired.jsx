import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom'
import GlobalContext from '../../../services/GlobalContext';

const LoginRequired = () => {
  const [redirect, setRedirect] = useState(false);
  const global = useContext(GlobalContext);

  useEffect(() => {
    async function getUser() {
      // const user = await LoginService.getCurrentUser();

      if (!global.context.userLoaded)
        return;
      // There is no user anymore, probably logged out, so we need to remove it from the state
      if (global.context.user === null) {
        setRedirect(true);
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