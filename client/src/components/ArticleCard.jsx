import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import LoginForm from "./LoginForm";
import { Articles } from "../data/Articles";

function ArticleCard({ title, text, img }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Card
        style={{
          width: "18rem",
          backgroundColor: "rgba(110,209,209,0.05)",
          margin: "5px",
        }}
      >
        <Card.Img
          variant="top"
          src={img}
          style={{
            width: "100%",
            height: "50%",
            objectFit: "cover",
            padding: "5px",
          }}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{text}</Card.Text>
          <Button variant="primary" onClick={handleShow}>
            Read More
          </Button>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose} fullscreen={true} centered={true}>
        <Modal.Header closeButton>
          <Modal.Title>{Articles[0].titel}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{Articles[0].body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ArticleCard;
