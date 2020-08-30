import React from 'react';
import {
    useParams
} from 'react-router-dom';

const AppraisalDetails = (props) => {
    const {id} = useParams();
    return (
    <h1>Details {id}</h1>
    );
};

export default AppraisalDetails;