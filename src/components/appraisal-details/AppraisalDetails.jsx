import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AppraisalDetailsInfo from './components/appraisal-info';
import AppraisalDetailsDisplay from './components/appraisal-details-display';


const AppraisalDetails = ({context, ...props}) => {
	const [periodDetails, setPeriodDetails] = useState(null);
  const periodId = useParams()['id'];
  

  return (
    <>
			{periodDetails === null ?
				<AppraisalDetailsInfo periodId={periodId} setPeriodDetails={setPeriodDetails}/> :
				<AppraisalDetailsDisplay context={context} details={periodDetails} />
			}	
    </>
  );
};

export default AppraisalDetails;