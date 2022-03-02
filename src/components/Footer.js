import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useParams } from "react-router-dom";

const Footer = ({
    slideId,
    setSlideId,
    current,
    setCurrent,
    slides,
    socket,
    setResponseData,
    setChartData,
    setCorrectAnswer,
    setImage
}) => {

    const [noOfRes, setNoOfResponses] = useState(0);
    const [pollActive, setPollActive] = useState(false);
    const [hasQuestion, setHasQuestion] = useState(false);
    const { sessionId } = useParams();

    useEffect(() => {
        setImage(slides[0].slideImageUrl)
        setSlideId(slides[0].slideId);
        setHasQuestion(slides[0].question.hasQuestion);
        if (slides[0].question.hasQuestion) {
            setResponseData((curr) => {
                return []
            })
            setChartData((curr) => {
                const newChartData = [["Options", "Response"]]
                const possibleAnswers = slides[0].question.numAnswers;
                const possibleOptions = ['A', 'B', 'C', 'D', 'E']
                for (let j = 0; j < possibleAnswers; j++) {
                    let newData = [possibleOptions[j], 0]
                    newChartData.push(newData);
                }
                return newChartData;
            })
        }
    }, [])

    const length = slides.length;


    function prevSlide() {
        let newSlide_id = current === 0 ? slides[length - 1].slideId : slides[current - 1].slideId;
        setCurrent(current === 0 ? length - 1 : current - 1)
        setSlideId(newSlide_id);
        const currSlide = slides.filter((slide) => {
            return (slide.slideId === newSlide_id)
        })
        setHasQuestion(currSlide[0].question.hasQuestion);
        setImage(currSlide[0].slideImageUrl)
        if (currSlide[0].question.hasQuestion) {
            setCorrectAnswer(currSlide[0].question.correctAnswer);
            setNoOfResponses(0);
            setPollActive(false);
            setResponseData((curr) => {
                return []
            })
            setChartData((curr) => {
                const newChartData = [['Options', "Responses"]]
                const possibleAnswers = currSlide[0].question.numAnswers;
                const possibleOptions = ['A', 'B', 'C', 'D', 'E']
                for (let j = 0; j < possibleAnswers; j++) {
                    let newData = [possibleOptions[j], 0]
                    newChartData.push(newData);
                }
                return newChartData;
            })
        }
    }

    function nextSlide() {
        let newSlide_id = current === length - 1 ? slides[0].slideId : slides[current + 1].slideId;
        setCurrent(current === length - 1 ? 0 : current + 1)
        setSlideId(newSlide_id);
        const currSlide = slides.filter((slide) => {
            return (slide.slideId === newSlide_id)
        })
        setHasQuestion(currSlide[0].question.hasQuestion);
        setImage(currSlide[0].slideImageUrl)
        if (currSlide[0].question.hasQuestion) {
            setCorrectAnswer(currSlide[0].question.correctAnswer)
            setNoOfResponses(0);
            setPollActive(false)
            setResponseData((curr) => {
                return []
            })
            setChartData((curr) => {
                const newChartData = [['Options', "Responses"]];
                const possibleAnswers = currSlide[0].question.numAnswers;
                const possibleOptions = ['A', 'B', 'C', 'D', 'E']
                for (let j = 0; j < possibleAnswers; j++) {
                    let newData = [possibleOptions[j], 0]
                    newChartData.push(newData);
                }
                return newChartData;
            })
        }
    }

    useEffect(() => {
        socket.on('new_response', (resdata) => {
            console.log(resdata, '<<new submission from student');
            setResponseData((currData) => {
                const newRes = currData.map((studentRes) => {
                    return { ...studentRes }
                })
                newRes.push(resdata)
                return newRes;
            })
            setNoOfResponses((curr) => {
                return curr + 1;
            })
            setChartData((curr) => {
                const newChartData = curr.map((data) => [...data])
                const answer = resdata.userAnswer;
                for (let j = 0; j < newChartData.length; j++) {
                    if (newChartData[j][0] === answer) {
                        let currCount = newChartData[j][1];
                        console.log(currCount, '<<currcount')
                        currCount = currCount + 1;
                        newChartData[j] = [answer, currCount];
                        break;
                    }
                }
                return newChartData;
            })
        })
    }, [socket]);

    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }

    function handleStartClick() {
        socket.emit('teacher_current_slide', slideId);
        setPollActive(true)
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
            <div>
                {(hasQuestion && pollActive) &&
                    <h5>Responses<span>{` ( ${noOfRes} ) `}</span></h5>
                }
            </div>
            {(hasQuestion) &&
                <button onClick={handleStartClick}>Start</button>
            }
            {(hasQuestion) &&
                <button onClick={handleStopClick}>Stop</button>
            }

            {(hasQuestion && pollActive) &&
                <Link
                    className="show_res_link"
                    to={`/presentations/${sessionId}/responses/${slideId}`}
                >
                    Show Responses
                </Link>
            }
        </div>
    )
}

export default Footer;

