import Responses from "./Responses";
import { Link } from "react-router-dom";

const Footer = ({ presentation_id, slide_id }) => {
    return (
        <div className="footer">
            <Responses></Responses>
            <p>Presenting Slide {slide_id}</p>
            <Link
                className="show_res_link"
                to={`/presentations/${presentation_id}/responses`}
            >
                Show Responses
            </Link>
        </div>
    )
}

export default Footer;