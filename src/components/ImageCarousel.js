import React, { useState } from "react";
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'


const ImageCarousel = ({ slides, current }) => {
    // const [current, setCurrent] = useState(0);
    // const length = slides.length;

    // function prevSlide() {
    //     setCurrent(current === 0 ? length - 1 : current - 1)
    // }
    // function nextSlide() {
    //     setCurrent(current === length - 1 ? 0 : current + 1)
    // }

    // //console.log(current)

    // if (!Array.isArray(slides) || slides.length <= 0) {
    //     return null;
    // }

    return (
        <section className="slider">
            {/* <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide}></FaArrowAltCircleLeft>
            <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide}></FaArrowAltCircleRight> */}

            {/* <ArrowBackIosIcon className="left-arrow" onClick={prevSlide}></ArrowBackIosIcon>
            <ArrowForwardIosIcon className="right-arrow" onClick={nextSlide}></ArrowForwardIosIcon> */}

            {slides.map((slide, index) => {
                return (
                    <div className={index === current ? 'slide active' : 'slide'} key={index}>
                        {index === current && (
                            <img src={slide.slide_image_url} alt='slide' className='image'></img>
                        )}

                    </div>
                )
            })}
        </section>
    )
}

export default ImageCarousel;