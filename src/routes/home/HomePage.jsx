import React from 'react';
import UserInfoProvider from '../../widgets/UserInfoProvider';

const HomePage = ({ctx, setCtx, ...props}) => {
  return (
    <>
      <UserInfoProvider ctx={ctx} setCtx={setCtx}/>
      <h1 style={{textAlign: 'center'}}>HomePage</h1>
    </>
  );
};

export default HomePage;