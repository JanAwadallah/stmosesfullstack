import { useState, useEffect } from "react";
import FormInput from "./FormInput";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const Booking = () => {
  const [arr, setArr] = useState([]);
  const [show, setShow] = useState(false);
  const [liturgyDate, setLiturgyDate] = useState("");
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [date, setDate] = useSearchParams();

  const checkDate = () => {
    if (!date.get("date")) {
      navigate("/");
    } else {
      setLiturgyDate(date.get("date").split("-").reverse().join("/"));
    }
  };
  const getShow = () => {
    if (new Date().getMonth() > new Date(date.get("date")).getMonth()) {
      console.log(show);
    } else if (new Date().getMonth() < new Date(date.get("date")).getMonth()) {
      setShow(true);
    } else {
      if (new Date().getDate() < new Date(date.get("date")).getDate()) {
        setShow(true);
      }
    }
  };

  useEffect(() => {
    checkDate();
    getShow();
  }, []);

  const [values, setValues] = useState({
    fullName: user ? user.firstName + " " + user.lastName : "",
    phone: user ? user.phone : "",
    noOfAttendees: 1,
    attendees: {},
    date: liturgyDate,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://stmosescopts.herokuapp.com/api/liturgy",
        values
      );
      if (res.status === 201) {
        toast.success("Thanks for booking, see you soon");
        setTimeout(() => {
          navigate("/");
        }, 7000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const onChange = (e) => {
    if (e.target.name === "noOfAttendees") {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
      let array = [];
      for (let n = 1; n < e.target.value; n++) {
        array.push(n);
      }
      setArr(array);
    }
    if (e.target.name === "attendees") {
      setValues({
        ...values,
        attendees: {
          ...values.attendees,
          ["Attendee" + (Number(e.target.id) + 1)]: e.target.value,
        },
      });
    } else {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    }
  };
  if (!date.get("date")) {
    return;
  }
  if (!show) {
    navigate("/liturgy");
  }

  return (
    <div className="mt-3 justify-content-center d-flex">
      <form onSubmit={handleSubmit} id="form">
        <div className="d-flex flex-column align-content-center">
          <h1 style={{ fontFamily: "cursive", fontWeight: "700" }}>
            St. Moses the Strong Church
          </h1>
          <p style={{ fontSize: "1.1em" }}>
            Saturday {liturgyDate} Liturgy attending registration
          </p>
        </div>

        <FormInput
          name="fullName"
          value={user ? user.firstName + " " + user.lastName : values.fullName}
          onChange={onChange}
          type="text"
          placeholder="Full Name"
          errorMessage="Full Name should be 3-16 characters, includes your first and last name and shouldn't include any special characters!"
          label="Full Name"
          pattern="^(?=.*[ ])[A-Za-z ]{3,25}"
          required
        />
        <FormInput
          name="phone"
          label="Mobile phone number"
          value={user ? user.phone : values.phone}
          onChange={onChange}
          type="text"
          placeholder="04 xxxx xxxx"
          errorMessage="Mobile phone number is required, please enter a valid mobile phone number"
          pattern="^[0][4][0-9]{8}"
          required
        />
        <FormInput
          name="noOfAttendees"
          label="Number of all family members attending including kids"
          onChange={onChange}
          type="number"
          placeholder="Number of family members attending including kids"
          min={1}
          required
        />

        {values.noOfAttendees && (
          <div>
            {arr.map((input, i) => (
              <>
                <label htmlFor={i}>{`${i + 1}-Attendee's Name`}</label>
                <input
                  style={{ minWidth: "200px", width: "100%" }}
                  name="attendees"
                  id={i}
                  type="text"
                  class="form-control"
                  placeholder={`Family member${i + 2} Name`}
                  required
                  onChange={onChange}
                />
              </>
            ))}
          </div>
        )}
        <button className="btn btn-info p-1 m-1 w-100">Submit</button>
      </form>
    </div>
  );
};

export default Booking;
