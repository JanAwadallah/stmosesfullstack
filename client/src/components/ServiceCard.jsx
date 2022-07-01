import { motion } from "framer-motion";
import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const ServiceCard = ({ title, img, desc, link, onClick }) => {
  return (
    <Card style={{ width: "18rem", minHeight: "450px" }} className="mt-3">
      <Card.Img
        variant="top"
        src={img}
        style={{
          width: "100%",
          height: "auto",
          maxHeight: "250px",
          objectFit: "cover",
          padding: "5px",
        }}
      />
      <Card.Body style={{ position: "relative" }}>
        <Card.Title
          style={{
            width: "100%",
            fontSize: "2rem",
            textAlign: "center",
            fontWeight: "900",
          }}
        >
          {title}
        </Card.Title>
        <div>
          <Card.Text>{desc}</Card.Text>
          <div
            className="d-grid gap-2"
            style={{
              position: "absolute",
              bottom: "10px",
              marginTop: "3px",
              width: "70%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <motion.button
              whileHover={{ scale: 1.1, fontWeight: "700" }}
              onClick={(e) => onClick(link)}
              className="btn btn-primary"
              style={{ width: "100%" }}
            >
              Open
            </motion.button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ServiceCard;
