import { Link } from "react-router-dom";
import PollChart from "./PollChart";

const Results = ({ presentation_id, responseData }) => {
    console.log(responseData)
    return (
        <div className="result_maindiv">
            <div className="result_chart">
                <PollChart responseData={responseData}></PollChart>
            </div>
            <div className="result_table"></div>
            <div className="footer">
                <Link
                    className="show_res_link"
                    to={`/presentations/${presentation_id}`}
                >
                    Back To Presentation
                </Link>
            </div>
        </div>
    )
}

export default Results;