import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import CircularLoader from "./CircularLoader";
import { getSlides } from "../utils/api";
import Footer from "./Footer";
var QRCode = require('qrcode.react');

const MainSection = () => {
    const [slides, setSlides] = useState([]);
    const [slide_id, setSlideId] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { presentation_id } = useParams();

    useEffect(() => {
        console.log(presentation_id)
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
        setSlides(slideImgs);
        setSlideId(slideImgs[0].slide_id)
        setIsLoading(false);

        // getSlides(presentation_id)
        // .then((res) => {
        //     setSlides(res);
        //     setIsLoading(false)
        // })
        // .catch((err) => {
        //     alert(err)
        // })
    }, [presentation_id]);

    return isLoading ? (
        <CircularLoader></CircularLoader>
    ) : (
        <div>
            <div className="maindiv">
                <div className="slides_div">
                    <Carousel>
                        {slides.map((slide) => {
                            return (
                                <div key={slide.slide_id}>
                                    <img alt="" src={slide.slide_image_url} />
                                </div>
                            )
                        })}
                    </Carousel>
                </div>

                <div className="qr_div">
                    <p>https://pivot-fe.netlify.app/</p>
                    <QRCode className='qr_code' value="https://pivot-fe.netlify.app/" />
                </div>
            </div>
            <Footer presentation_id={presentation_id} slide_id={slide_id}></Footer>
            {/* <Footer></Footer> */}
        </div>
    )
}

export default MainSection;