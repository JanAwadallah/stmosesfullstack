import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ArticleCard from "../components/ArticleCard";
import Slider from "../components/Slider";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const [welcome, setWelcome] = useState("");

  const { user } = useSelector((state) => state.auth);

  const greating = (user) => {
    if (user) {
      setWelcome(`Welcome ${user.firstName}, it is good to see you`);
      setTimeout(() => {
        setWelcome("");
      }, 7000);
    }
  };

  useEffect(() => {
    greating(user);
  }, [user]);

  return (
    <div
      className="container mt-3"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div id="welcome" className="fs-4">
        {welcome}
      </div>
      <Slider />
      <div
        className="my-5 cards"
        style={{ display: "flex", justifyContent: "center", width: "90%" }}
      >
        <ArticleCard
          title="Joy which comes from the Holy Resurrection "
          text="As we continue to celebrate the Joy of the Resurrection..."
          img="https://www.learnreligions.com/thmb/gqnnNippeVaqvj6hkX6WvVt0qn0=/395x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-165467328-56cb36583df78cfb379b56c1.jpg"
        />
        <ArticleCard
          title="Article-2"
          text="Some abstract text from the database"
          img="http://becomeorthodox.org/wp-content/uploads/2016/06/img_3338-2-1200x800.jpg"
        />
        <ArticleCard
          title="Article-3"
          text="Some abstract text from the database"
          img="https://i.swncdn.com/media/1200w/via/22176-repent-ccomjpeg.jpg"
        />
      </div>
      <div id="our-Church" className="container">
        <div className="drop-color">
          <div className="card" id="our-aim">
            <p
              className="card-title text-center"
              style={{
                fontWeight: "900",
                fontSize: "xx-large",
              }}
            >
              Our Aim which you can help to achieve
            </p>
            <p
              className="card-body"
              style={{ textAlign: "justify", fontWeight: "700" }}
            >
              At the moment we have a monthly liturgy at St.Paul's Lutheran
              Church every first Saturday of the month. We are aiming, with
              Lord's grace, to have our own church in Geelong as soon as
              possible. So all prayers and financial support are needed. With
              your prayer and your support we can achieve our goal sooner than
              later.{" "}
            </p>
            <div className="don-btn">
              <Button
                onClick={(e) => navigate("/donate")}
                size="sm"
                variant="outline-success"
              >
                Donate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
