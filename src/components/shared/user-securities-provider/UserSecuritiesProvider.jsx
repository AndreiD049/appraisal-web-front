import { useEffect, useContext } from 'react';
import AuthorizationService from '../../../services/AuthorizationService';
import GlobalContext from '../../../services/GlobalContext';

const UserSecuritiesProvider = () => {
  const global = useContext(GlobalContext);

  useEffect(() => {
    async function run() {
      if (!global.security && global.user !== null) {
        const result = await AuthorizationService.getSecurities();
        if (result) {
          global.setContext((prev) => ({
            ...prev,
            security: result,
          }));
        }
      }
    }
    run();
  }, [global]);

  return null;
};

export default UserSecuritiesProvider;
