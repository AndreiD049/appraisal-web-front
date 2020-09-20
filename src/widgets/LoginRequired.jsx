import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Redirect } from 'react-router-dom'
import LoginService from '../services/LoginService';

const LoginRequired = ({ctx, setCtx}) => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    async function getUser() {
      const user = await LoginService.getCurrentUser(ctx);

      if (user === null) {
        setRedirect(true);
        if (ctx.user) {
          let ctxCopy = {...ctx};
          delete ctxCopy.user;
          setCtx(ctxCopy);
        }
      } else if (!ctx.user || ctx.user.oid !== user.oid) {
        setCtx({...ctx, user: user});
      }
    }
    getUser();
  }, [ctx, setCtx])

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