import { useEffect } from 'react';
import { useState, useContext } from 'react';
import LoginService from '../services/LoginService';
import GlobalContext from '../services/GlobalContext';

const UserInfoProvider = ({ctx, setCtx}) => {
  const [verified, setVerified] = useState(false);
  const global = useContext(GlobalContext);

  useEffect(() => {
    async function getUser() {
      if (!global.context.user && !verified) {
        let user = await LoginService.getCurrentUser()
        global.setContext({...global.context, user: user !== null ? user : {}});
        setVerified(true);
      }
    }
    getUser();
  }, [verified, global]);
  return null;
};

export default UserInfoProvider;