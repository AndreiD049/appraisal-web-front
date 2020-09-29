import { useEffect } from 'react';
import AppraisalService from '../../../../services/AppraisalService';
import UserService from '../../../../services/UserService';

const AppraisalUserInfo = ({periodId, userId, setUserDetails, setPeriodDetails}) => {
  useEffect(() => {
    async function run() {
      /*
        I try to get user's info and set it
        Then i try to get periodInfo and set it
        If i fail, i throw an error
      */
      const userData = await UserService.getUser(userId);
      setUserDetails(userData);
      const periodData = await AppraisalService.getUserItems(periodId, userId);
      setPeriodDetails(periodData);
    }
    run();
  }, [periodId, userId, setPeriodDetails, setUserDetails]) 
  return null;
};

export default AppraisalUserInfo;