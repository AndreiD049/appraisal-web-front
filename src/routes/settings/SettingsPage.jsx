import React from 'react';
import LoginRequired from '../../widgets/LoginRequired';

const SettingsPage = ({ctx, setCtx, ...props}) => {
  return (
    <>
      <LoginRequired ctx={ctx} setCtx={setCtx} />
      <h1 style={{textAlign: 'center'}}>Settings</h1>
    </>
  );
};

export default SettingsPage;