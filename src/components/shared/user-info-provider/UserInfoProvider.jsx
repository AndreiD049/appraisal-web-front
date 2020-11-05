import { useEffect } from 'react';
import { useState, useContext } from 'react';
import LoginService from '../../../services/LoginService';
import GlobalContext from '../../../services/GlobalContext';

const UserInfoProvider = ({ctx, setCtx}) => {
  const [verified, setVerified] = useState(false);
  const global = useContext(GlobalContext);

  useEffect(() => {
    async function getUser() {
      if (!global.setContext)
        return setVerified(false);
      if (!global.user && !verified) {
        setVerified(true);
        let user = await LoginService.getCurrentUser();
        if (user) {
          const name = user.displayName || user.username || 'Unknown';
          user.avatar = name.split(/[. ,_-]/).map(n => n[0]).join('').slice(0, 2).toUpperCase();
        }
        global.setContext({...global, user: user, userLoaded: true});
      }
    }
    getUser();
  }, [verified, global]);
  return null;
};

export default UserInfoProvider;