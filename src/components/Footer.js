import Responses from "./Responses";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Footer = ({ presentation_id, slide_id, setSlideId, current, setCurrent, slides, socket, setSession, setUrl }) => {
    const length = slides.length;
    function prevSlide() {
        let currentTime = Date.now();
        let newSlide_id = current === 0 ? slides[length - 1].slide_id : slides[current - 1].slide_id;
        setCurrent(current === 0 ? length - 1 : current - 1)
        setSlideId(newSlide_id);
        setSession(`${presentation_id}-${newSlide_id}-${currentTime}`)
        setUrl(`https://pivot-fe.netlify.app/${presentation_id}-${newSlide_id}-${currentTime}`)
        socket.emit('current_session', `${presentation_id}-${newSlide_id}-${currentTime}`);
    }
    function nextSlide() {
        let newSlide_id = current === length - 1 ? slides[0].slide_id : slides[current + 1].slide_id;
        let currentTime = Date.now();
        setCurrent(current === length - 1 ? 0 : current + 1)
        setSlideId(newSlide_id);
        setSession(`${presentation_id}-${newSlide_id}-${currentTime}`)
        setUrl(`https://pivot-fe.netlify.app/${presentation_id}-${newSlide_id}-${currentTime}`)
        socket.emit('current_session', `${presentation_id}-${newSlide_id}-${currentTime}`);
    }

    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }

    return (
        <div className="footer">
            <div>
                <ArrowBackIosIcon onClick={prevSlide}></ArrowBackIosIcon>
                <p id="footer_span">{current + 1}</p>
                <ArrowForwardIosIcon onClick={nextSlide}></ArrowForwardIosIcon>

            </div>
            <Responses socket={socket} presentation_id={presentation_id} slide_id={slide_id}></Responses>
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