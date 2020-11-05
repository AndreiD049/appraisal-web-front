import { useEffect } from 'react';
import { useState, useContext } from 'react';
import LoginService from '../../../services/LoginService';
import GlobalContext from '../../../services/GlobalContext';

const UserInfoProvider = ({ctx, setCtx}) => {
  const [verified, setVerified] = useState(false);
  const global = useContext(GlobalContext);

  useEffect(() => {
    async function getUser() {
      if (!global.context.user && !verified) {
        let user = await LoginService.getCurrentUser();
        if (user) {
          const name = user.displayName || user.username || 'Unknown';
          user.avatar = name.split(/[. ,_-]/).map(n => n[0]).join('').slice(0, 2).toUpperCase();
        }
        global.setContext({...global.context, user: user, userLoaded: true});
        setVerified(true);
      }
    }
    getUser();
  }, [verified, global]);
  return null;
};

export default UserInfoProvider;