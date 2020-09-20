import { useEffect } from 'react';
import { useState } from 'react';
import LoginService from '../services/LoginService';

const UserInfoProvider = ({ctx, setCtx}) => {
  const [verified, setVerified] = useState(false);
  useEffect(() => {
    async function getUser() {
      if (!ctx.user && !verified) {
        let user = await LoginService.getCurrentUser(ctx)
        setCtx({...ctx, user: user});
        setVerified(true);
      }
    }
    getUser();
  }, [verified, ctx, setCtx]);
  return null;
};

export default UserInfoProvider;