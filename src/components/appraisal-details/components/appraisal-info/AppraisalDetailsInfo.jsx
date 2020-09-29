import { useEffect } from "react";
import AppraisalService from '../../../../services/AppraisalService';


const AppraisalDetailsInfo = ({ periodId, setPeriodDetails }) => {
    useEffect(() => {
        async function run() {
            const data = await AppraisalService.getItems(periodId);
            setPeriodDetails(data);
        }
        run();
    }, [periodId, setPeriodDetails]);

    return null;
};

export default AppraisalDetailsInfo;