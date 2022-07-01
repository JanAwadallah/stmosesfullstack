import React, { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";

const Liturgy = () => {
  const [show, setShow] = useState(false);
  const liturgyInfo = {
    where: "St. Paul's Lutheran church, 303-307 Torquay Rd,Grovdale 3216",
    when: "2022-08-06",
    time: "08:30-10:30 am",
  };
  const dateFixed = liturgyInfo.when.split("-").reverse().join("/");
  const getShow = () => {
    if (new Date().getMonth() > new Date(liturgyInfo.when).getMonth()) {
      console.log(show);
    } else if (new Date().getMonth() < new Date(liturgyInfo.when).getMonth()) {
      setShow(true);
    } else {
      if (new Date().getDate() < new Date(liturgyInfo.when).getDate()) {
        setShow(true);
      }
    }
  };
  useEffect(() => {
    getShow();
  }, []);
  return (
    <div className="container mt-3 ">
      <div className="row row-cols-1">
        <div className="col">
          <p className="title">Liturgy</p>
          <p className="body-text">
            Our Liturgy is every first Saturday of the month, and for the
            purpose of Aghapy preparation after Mass, we appreciat if you could
            let us know that you are coming.
          </p>
          {show ? (
            <div>
              <p style={{ fontWeight: "700", textAlign: "center" }}>
                Our nexy liturgy will be on{" "}
                <span
                  style={{
                    fontFamily: "serif",
                    fontSize: "1.2rem",
                    color: "blue",
                  }}
                >
                  Saturday {dateFixed}
                </span>
              </p>
              <p style={{ fontWeight: "700", textAlign: "center" }}>
                {" "}
                at{" "}
                <span
                  style={{
                    fontFamily: "serif",
                    fontSize: "1.2rem",
                    color: "blue",
                  }}
                >
                  {liturgyInfo.where}
                </span>
              </p>
              <p style={{ fontWeight: "700", textAlign: "center" }}>
                {" "}
                from{" "}
                <span
                  style={{
                    fontFamily: "serif",
                    fontSize: "1.2rem",
                    color: "blue",
                  }}
                >
                  {liturgyInfo.time}
                </span>
              </p>
              <div style={{ justifyContent: "center", display: "flex" }}>
                <Button
                  href={`/liturgy-booking?date=${liturgyInfo.when}`}
                  variant="secondary"
                  className="mb-3"
                >
                  Coming! let us know
                </Button>
              </div>
            </div>
          ) : (
            <p
              style={{
                fontWeight: "700",
                textAlign: "center",
                fontSize: "1.2rem",
                color: "blue",
              }}
            >
              Our next Liturgy information coming soon
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Liturgy;
