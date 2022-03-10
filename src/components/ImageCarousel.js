const ImageCarousel = ({ slides, current }) => {
  return (
    <img
      src={slides[current].slideImageUrl}
      alt="slide"
      className="slide-image"
    ></img>
  );
};

export default ImageCarousel;
