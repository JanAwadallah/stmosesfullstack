import React from "react";
import { FaCross } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ServiceCard from "../components/ServiceCard";

const Services = () => {
  const navigate = useNavigate();
  const cards = [
    {
      id: 1,
      title: "Liturgies",
      desc: "We have a monthly Liturgy to be held on the first Saturday of the week",
      img: "/images/stMosesChurch.jpeg",
      link: "/liturgy",
    },
    {
      id: 2,
      title: "Sunday School",
      desc: "We have a weekly Sunday school, every Friday night 7:00-8:30pm",
      img: "/images/FB_IMG_2.jpeg",
      link: "/sunday-school",
    },
    {
      id: 3,
      title: "Deaconship",
      desc: "We have a weekly Scool of Deaconship, every Friday night 7:00-8:30pm",
      img: "/images/hymns2.jpeg",
      link: "/deaconship",
    },
    {
      id: 4,
      title: "Bible Study",
      desc: "We have our Bible Study every third Thursday of the month 7:30-8:30pm",
      img: "/images/bible-study.jpeg",
      link: "/bible-study",
    },
  ];

  return (
    <>
      <p
        style={{ letterSpacing: "5px", fontFamily: "cursive" }}
        className="title mt-3"
      >
        <FaCross /> Our Services <FaCross />
      </p>
      <div className="container card-container">
        {cards.map((card) => (
          <ServiceCard
            key={card.id}
            link={card.link}
            onClick={navigate}
            title={card.title}
            desc={card.desc}
            img={card.img}
          />
        ))}
      </div>
    </>
  );
};

export default Services;
