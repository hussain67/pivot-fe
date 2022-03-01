import React, { useEffect } from "react";
import Responses from "./Responses";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Footer = ({
    presentationId,
    sessionId,
    slideId,
    setSlideId,
    current,
    setCurrent,
    slides,
    socket,
    setResponseData
}) => {

    const length = slides.length;

    // useEffect(() => {
    //     let resdata = ["B", 12]
    //     socket.on('current_slide_responses', (resdata) => {
    //         //console.log(resdata);
    //         setResponseData((currData) => {
    //             return [...currData, resdata]
    //             //return resdata;
    //         })
    //     })
    // }, [slideId]);

    function prevSlide() {
        let newSlide_id = current === 0 ? slides[length - 1].slideId : slides[current - 1].slideId;
        setCurrent(current === 0 ? length - 1 : current - 1)
        setSlideId(newSlide_id);
    }

    function nextSlide() {
        let newSlide_id = current === length - 1 ? slides[0].slideId : slides[current + 1].slideId;
        setCurrent(current === length - 1 ? 0 : current + 1)
        setSlideId(newSlide_id);
    }

    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }

    function handleStartClick() {
        socket.emit('teacher_current_slide', slideId);
    }

    function handleStopClick() {
        socket.emit('teacher_slide_stop', slideId);
    }



    return (
        <div className="footer">
            <div>
                <ArrowBackIosIcon onClick={prevSlide}></ArrowBackIosIcon>
                <p id="footer_span">{current + 1}</p>
                <ArrowForwardIosIcon onClick={nextSlide}></ArrowForwardIosIcon>

            </div>
            <Responses
                socket={socket}
                setResponseData={setResponseData}
            // presentationId={presentationId}
            // slideId={slideId}
            // sessionId={sessionId}
            >
            </Responses>
            <button onClick={handleStartClick}>Start</button>
            <button onClick={handleStopClick}>Stop</button>
            <Link
                className="show_res_link"
                to={`/presentations/${sessionId}/responses/${slideId}`}
            >
                Show Responses
            </Link>
        </div>
    )
}

export default Footer;

// const Footer = ({
//     presentation_id,
//     slide_id,
//     setSlideId,
//     current,
//     setCurrent,
//     slides,
//     socket,
//     setSession,
//     setUrl,
//     setResponseData
// }) => {

//     const length = slides.length;
//     function prevSlide() {
//         let currentTime = Date.now();
//         let newSlide_id = current === 0 ? slides[length - 1].slide_id : slides[current - 1].slide_id;
//         setCurrent(current === 0 ? length - 1 : current - 1)
//         setSlideId(newSlide_id);
//         setSession(`${presentation_id}-${newSlide_id}-${currentTime}`)
//         setUrl(`https://pivot-fe.netlify.app/${presentation_id}-${newSlide_id}-${currentTime}`)
//         socket.emit('current_session', `${presentation_id}-${newSlide_id}-${currentTime}`);
//     }
//     function nextSlide() {
//         let newSlide_id = current === length - 1 ? slides[0].slide_id : slides[current + 1].slide_id;
//         let currentTime = Date.now();
//         setCurrent(current === length - 1 ? 0 : current + 1)
//         setSlideId(newSlide_id);
//         setSession(`${presentation_id}-${newSlide_id}-${currentTime}`)
//         setUrl(`https://pivot-fe.netlify.app/${presentation_id}-${newSlide_id}-${currentTime}`)
//         socket.emit('current_session', `${presentation_id}-${newSlide_id}-${currentTime}`);
//     }

//     if (!Array.isArray(slides) || slides.length <= 0) {
//         return null;
//     }

//     return (
//         <div className="footer">
//             <div>
//                 <ArrowBackIosIcon onClick={prevSlide}></ArrowBackIosIcon>
//                 <p id="footer_span">{current + 1}</p>
//                 <ArrowForwardIosIcon onClick={nextSlide}></ArrowForwardIosIcon>

//             </div>
//             <Responses
//                 socket={socket}
//                 presentation_id={presentation_id}
//                 slide_id={slide_id}
//                 setResponseData={setResponseData}>
//             </Responses>
//             <Link
//                 className="show_res_link"
//                 to={`/presentations/${presentation_id}/responses`}
//             >
//                 Show Responses
//             </Link>
//         </div>
//     )
// }

// export default Footer;