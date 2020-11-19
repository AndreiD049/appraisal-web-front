import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import AppraisalDetailsInfo from './components/appraisal-info';
import AppraisalDetailsDisplay from './components/appraisal-details-display';
import AppraisalUserInfo from './components/appraisal-user-info';
import AppraisalUserDetails from './components/appraisal-user-details-display';
import AppraisalService from '../../services/AppraisalService';

const AppraisalDetails = ({ context }) => {
  const [periodDetails, setPeriodDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const periodId = useParams().id;
  const { userId } = useParams();

  useEffect(() => {
    setPeriodDetails(null);
    setUserDetails(null);
  }, [userId]);

  /**
   * Handle locking button for user period
   */
  const handleLockButton = async () => {
    if (userId) {
      const result = await AppraisalService.toggleLockPeriod(periodDetails.id, userId);
      setPeriodDetails((prev) => {
        if (prev) {
          return {
            ...prev,
            users: result.users.slice(),
          };
        }
        return prev;
      });
    }
  };

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
                handleLockButton={handleLockButton}
              />
            )
}
      </>
    );
  }

  return (
    <DocumentTitle title={periodDetails && periodDetails.name}>
      {display}
    </DocumentTitle>
  );
};

AppraisalDetails.propTypes = {
  context: PropTypes.shape({}).isRequired,
};

export default AppraisalDetails;
