import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CircularLoader from "./CircularLoader";
import { getSlides } from "../utils/api";
import Footer from "./Footer";
import ImageCarousel from "./ImageCarousel";
var QRCode = require('qrcode.react');

const MainSection = ({ socket, setPresentationId, setResponseData }) => {
    const [slides, setSlides] = useState([]);
    const [slide_id, setSlideId] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [session, setSession] = useState('');
    const { presentation_id } = useParams();
    const [url, setUrl] = useState('')
    const [current, setCurrent] = useState(0);


    useEffect(() => {
        let currentTime = Date.now();
        const slideImgs = [
            {
                slide_image_url: "https://image.shutterstock.com/image-photo/large-drop-water-reflects-environment-260nw-1917029711.jpg",
                slide_id: "1"
            },
            {
                slide_image_url: "https://media.istockphoto.com/photos/renewable-energy-and-sustainable-development-picture-id1186330948?k=20&m=1186330948&s=612x612&w=0&h=5aNPCcQ8FcZraX44PEhb2mqcHkow2xMITJMHdh28xNg=",
                slide_id: "2"
            },
            {
                slide_image_url: "https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014__340.jpg",
                slide_id: "3"
            }
        ]
        setPresentationId(presentation_id)
        setSlides(slideImgs);
        setSlideId(slideImgs[0].slide_id);
        setSession(`${presentation_id}-${slideImgs[0].slide_id}-${currentTime}`)
        setUrl(`https://pivot-fe.netlify.app/${presentation_id}-${slideImgs[0].slide_id}-${currentTime}`)
        setIsLoading(false);
        socket.emit('current_session', `${presentation_id}-${slideImgs[0].slide_id}-${currentTime}`);

        // getSlides(presentation_id)
        // .then((res) => {
        //     setSlides(res);
        //     setIsLoading(false)
        // })
        // .catch((err) => {
        //     alert(err)
        // })
    }, [presentation_id]);

    //console.log(session)

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
                presentation_id={presentation_id}
                setSlideId={setSlideId}
                current={current}
                setCurrent={setCurrent}
                slides={slides}
                slide_id={slide_id}
                setSession={setSession}
                setUrl={setUrl}
                socket={socket}
                setResponseData={setResponseData}
            ></Footer>
        </div>
    )
}

export default MainSection;