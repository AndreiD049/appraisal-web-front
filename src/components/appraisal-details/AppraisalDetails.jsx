import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppraisalDetailsInfo from './components/appraisal-info';
import AppraisalDetailsDisplay from './components/appraisal-details-display';
import AppraisalUserInfo from './components/appraisal-user-info';
import AppraisalUserDetails from './components/appraisal-user-details-display';

const AppraisalDetails = ({ context }) => {
  const [periodDetails, setPeriodDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const periodId = useParams().id;
  const { userId } = useParams();

  useEffect(() => {
    setPeriodDetails(null);
    setUserDetails(null);
  }, [userId]);

  let display;
  if (!userId) {
    display = (
      <>
        {
          periodDetails === null
            ? <AppraisalDetailsInfo periodId={periodId} setPeriodDetails={setPeriodDetails} />
            : <AppraisalDetailsDisplay context={context} periodDetails={periodDetails} />
        }
      </>
    );
  } else {
    display = (
      <>
        {
          periodDetails === null || userDetails === null
            ? (
              <AppraisalUserInfo
                periodId={periodId}
                userId={userId}
                setUserDetails={setUserDetails}
                setPeriodDetails={setPeriodDetails}
              />
            )
            : (
              <AppraisalUserDetails
                context={context}
                periodDetails={periodDetails}
                userDetails={userDetails}
              />
            )
}
      </>
    );
  }

  return display;
};

export default AppraisalDetails;
