import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CircularLoader from "./CircularLoader";
import { getSlides } from "../utils/api";
import Footer from "./Footer";
import ImageCarousel from "./ImageCarousel";
var QRCode = require('qrcode.react');

const MainSection = ({ socket, responseData, setResponseData, setChartData, setCorrectAnswer, setImage }) => {
    const [slides, setSlides] = useState([]);
    const [slideId, setSlideId] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { sessionId } = useParams();
    const [url, setUrl] = useState('')
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        getSlides(sessionId)
            .then((res) => {
                setSlides(res.slides);
                setUrl(`https://pivot-fe.netlify.app/${sessionId}`)
                setIsLoading(false)
            })
            .catch((err) => {
                alert(err)
            })
    }, []);


    return isLoading ? (
        <CircularLoader></CircularLoader>
    ) : (
        <div>
            <div className="maindiv">
                <div className="slides_div">
                    <ImageCarousel slides={slides} current={current}></ImageCarousel>
                </div>

                <div className="qr_div">
                    <p>{url}</p>
                    <QRCode className='qr_code' value={url} />
                </div>
            </div>
            <Footer
                slideId={slideId}
                setSlideId={setSlideId}
                current={current}
                setCurrent={setCurrent}
                slides={slides}
                socket={socket}
                setResponseData={setResponseData}
                setChartData={setChartData}
                setCorrectAnswer={setCorrectAnswer}
                setImage={setImage}
            ></Footer>
        </div>
    )
}

export default MainSection;

