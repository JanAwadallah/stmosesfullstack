import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {FaHome} from "react-icons/fa"

const NotFound = () => {
  const navigate = useNavigate();

  const redirect = (e) => {
    e.preventDefault();
    toast.error("You will be redirected to the home page");
    setTimeout(() => {
      navigate("/");
    }, 7000);
  };
  useEffect(() => {}, []);
  return (
    <div className="container m-5">
      <p style={{ fontSize: "1.3rem", fontWeight: "900", textAlign: "center" }}>
        Opps! This page dose not exist please check the URL address and try
        again
      </p>

      <div className="d-flex justify-content-center">
        <motion.button
          whileHover={{ scale: 1.3 }}
          className="btn btn-lg btn-outline-dark"
          onClick={redirect}
        >
          <FaHome /> Home
        </motion.button>
      </div>
    </div>
  );
};

export default NotFound;
