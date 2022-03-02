import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import PollChart from "./PollChart";

const Results = ({ chartData, correctAnswer, image }) => {
    const { sessionId } = useParams();
    return (
        <div>
            <div className="result_maindiv">
                <div className="master_result">
                    <div className="question_img">
                        <img src={image} alt='question'></img>
                    </div>
                    <div className="result_chart">
                        <PollChart chartData={chartData}></PollChart>
                    </div>
                </div>
                <div className="answer_div">
                    <h1>Correct Answer Is :<span>{correctAnswer}</span></h1>
                </div>
            </div>
            <div className="footer">
                <Link
                    className="show_res_link"
                    to={`/presentations/${sessionId}`}
                >
                    Back To Presentation
                </Link>
            </div>
        </div>
    )
}

export default Results;