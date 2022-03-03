const ImageCarousel = ({ slides, current }) => {
  console.log(slides);
  return (
    <img
      src={slides[current].slideImageUrl}
      alt="slide"
      className="slide-image"
    ></img>
  );
};

export default ImageCarousel;
