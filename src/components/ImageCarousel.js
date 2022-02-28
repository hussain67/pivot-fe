const ImageCarousel = ({ slides, current }) => {

    return (
        <section className="slider">
            {slides.map((slide, index) => {
                return (
                    <div className={index === current ? 'slide active' : 'slide'} key={index}>
                        {index === current && (
                            <img src={slide.slideImageUrl} alt='slide' className='image'></img>
                        )}

                    </div>
                )
            })}
        </section>
    )
}

export default ImageCarousel;