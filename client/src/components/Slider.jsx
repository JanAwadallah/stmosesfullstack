import Carousel from "react-bootstrap/Carousel";

function Slider() {
  const images = [
    {
      id: 1,
      src: "images/slider1.jpeg",
    },
    {
      id: 2,
      src: "images/slider2.jpeg",
    },
    {
      id: 3,
      src: "images/slider3.jpeg",
    },
    {
      id: 4,
      src: "images/slider4.jpeg",
    },
    {
      id: 5,
      src: "images/slider5.jpeg",
    },
  ];
  return (
    <Carousel
      className="slider"
      // style={{ backgroundColor: "#ccc8c8", height: "100vh" }}
    >
      {images.map((image) => (
        <Carousel.Item key={image.id}>
          <img
            className="d-block w-100"
            style={{ maxHeight: "70vh", objectFit: "contain" }}
            src={image.src}
            alt={`slide${image.id}`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Slider;
