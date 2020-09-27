import { useEffect } from 'react';
import UserService from '../../../../services/UserService';

const DialogInfo = ({setOrganizations}) => {
  // Fetch organizations
  useEffect(() => {
    async function getInfo() {
      setOrganizations(await UserService.getUserOrganizations());
    }
    getInfo();
  }, [setOrganizations])

  return null;
};

export default DialogInfo;