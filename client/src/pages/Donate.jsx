import React from "react";
import { motion } from "framer-motion";
import { FaCross } from "react-icons/fa";
import { Link } from "react-router-dom";
import { saveAs } from "file-saver";
import Axios from "axios";
import fileDownload from "js-file-download";
const Donate = () => {
  var OS = navigator.platform;
  // alert(OS);

  function download(url, fileName) {
    Axios.get(url, {
      responseType: "blob",
    }).then((res) => {
      fileDownload(res.data, fileName);
    });
  }

  return (
    <div className="container mt-3">
      <div className="w-100 d-flex justify-content-center align-items-center flex-column">
        <div>
          <FaCross
            style={{ fontSize: "2rem", color: "#9e4962", marginBottom: "3px" }}
          />
        </div>

        <p className="verse">
          "I have shown you in every way, by laboring like this, that you must
          support the weak. And remember the words of the Lord Jesus, that He
          said, ‘It is more blessed to give than to receive.’ ”(Acts 20:35)
        </p>
      </div>
      <p
        style={{
          fontWeight: "bolder",
          fontSize: "1.2rem",
          fontFamily: "-moz-initial",
          margin: "5px",
          textAlign: "justify",
        }}
      >
        You can share the blessing and donate for{" "}
        <strong>St.Moses coptic Orthodox Church</strong>, eather by downloading
        and completing the direct depit request(DDR) form below and give it to
        the Church's Treasurer, Or by making Money Transfer to the following
        St.Moses church's account:
        <p style={{ textAlign: "center" }}>
          <br /> Account Name :{" "}
          <strong style={{ textDecoration: "underline" }}>
            St Moses Geelong
          </strong>
          <br />
          BSB : <strong style={{ textDecoration: "underline" }}>083-004</strong>
          <br />
          Account#:{" "}
          <strong style={{ textDecoration: "underline" }}>37-123-8069</strong>
        </p>
      </p>
      <div className="row row-cols-2 g-4">
        <div className="col-md-6 col-12">
          {" "}
          <div
            style={{
              width: "auto",
              height: "auto",
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: "0px",
                left: "0px",
                zIndex: "10",
                backgroundColor: "rgba(0,0,0,0.3",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                paddingTop: "30%",
              }}
            >
              <motion.button
                whileHover={{ scale: 1.3 }}
                className="btn btn-lg btn-primary"
                onClick={() => {
                  download("/file-download/DDSA-StMoses.pdf", "Agreement.pdf");
                }}
              >
                Download
              </motion.button>
            </div>
            <img
              src="/images/DDA-StMoses.png"
              alt="statement"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                overflow: "hidden",
              }}
            />
          </div>
        </div>
        <div className="col-md-6 col-12">
          {" "}
          <div
            style={{
              width: "auto",
              height: "auto",
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: "0px",
                left: "0px",
                zIndex: "10",
                backgroundColor: "rgba(0,0,0,0.3",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                paddingTop: "30%",
              }}
            >
              {OS === "Linux aarch64" || OS === "iPhone" ? (
                <a href="docs/DDR-StMoses.pdf">
                  <motion.button
                    whileHover={{ scale: 1.3 }}
                    className="btn btn-lg btn-primary"
                  >
                    Download
                  </motion.button>
                </a>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.3 }}
                  className="btn btn-lg btn-primary"
                  onClick={() => {
                    download("/file-download/DDSA-StMoses.pdf", "Form.pdf");
                  }}
                >
                  Download
                </motion.button>
              )}
            </div>
            <img
              src="/images/DDR-StMoses.png"
              alt="statement"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                overflow: "hidden",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
