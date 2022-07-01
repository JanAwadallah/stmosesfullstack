import { motion } from "framer-motion";

const ChildSafety = () => {
  return (
    <div className="container mt-3">
      <h1 className="heading title">Child Safety</h1>
      <p
        style={{
          fontWeight: "bolder",
          fontSize: "1.5rem",
          fontFamily: "-moz-initial",
          margin: "5px",
          textAlign: "center",
        }}
      >
        Our Statement of Commitment
      </p>
      <div
        style={{
          width: "auto",
          height: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src="/images/ChildSafty-StMoses.png"
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
  );
};

export default ChildSafety;
