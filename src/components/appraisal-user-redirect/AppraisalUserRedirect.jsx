import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import TeamMatesAutocomplete from '../shared/team-mates-autocomplete';
import { useCallback } from 'react';

const AppraisalUserRedirect = ({defaultValue}) => {
  const id = useParams()['id'];
  const history = useHistory();

  const handleSelect = useCallback((user) => {
    if (user)
      return history.push(`/appraisals/${id}/user/${user.id}`);
  }, [history, id])

  return (
    <>
      <TeamMatesAutocomplete 
        defValue={defaultValue}
        onUserSelect={(user) => handleSelect(user)}
        // renderOption={(option, state) => <Link color='textPrimary' underline='hover' component={MuiLink} style={{width: '100%'}} to={`/appraisals/${id}/user/${option.id}`}>{option.id}</Link>}
      />
    </>
  );
};

export default AppraisalUserRedirect;