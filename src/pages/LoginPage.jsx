
import React from 'react';

const LoginPage = ({ctx, setCtx, ...props}) => {
  return (
    <>
      <h1 style={{textAlign: 'center'}}>Login</h1>
      <a href="/api/login">Login</a>
    </>
  );
};

export default LoginPage;