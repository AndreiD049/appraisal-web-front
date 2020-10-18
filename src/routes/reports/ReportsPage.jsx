import React from 'react';
import LoginRequired from '../../components/shared/login-required';

const ReportsPage = ({ctx, setCtx, ...props}) => {
  return (
    <>
      <LoginRequired ctx={ctx} setCtx={setCtx} />
      <h1 style={{textAlign: 'center'}}>Reports</h1>
    </>
  );
};

export default ReportsPage;