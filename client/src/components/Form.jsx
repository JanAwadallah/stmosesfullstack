import { useState } from "react";
import FormInput from "./FormInput";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { FaEnvelopeOpenText } from "react-icons/fa";

const Form = () => {
  let navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    subject: "",
    message: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Full Name",
      errorMessage:
        "Full Name should be 3-16 characters and shouldn't include any special character!",
      label: "Full Name",
      pattern: "^[A-Za-z ]{3,16}",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "subject",
      type: "text",
      placeholder: "Subject",
      label: "subject",
      errorMessage: "Please tell us what this message about!",
      required: true,
    },
    {
      id: 4,
      name: "message",
      type: "textArea",
      placeholder: "message",
      errorMessage: "message should be 8-300 characters !",
      label: "message",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,300}$`,
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send("service_9818zou", "template_sb3hrip", values, "9QW4uDWlXZHsWmY2s")
      .then(
        (result) => {
          if (result.status === 200) {
            toast.success(
              "Thank you for your message, we will respond as soon as possible",
              {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
          }
        },
        (error) => {
          console.log(error.text);
        }
      );
    const goHome = () => {
      navigate("/");
    };
    setTimeout(goHome, 7000);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit} id="form">
        <h1 style={{ fontFamily: "cursive", fontWeight: "700" }}>
          <FaEnvelopeOpenText /> Contact Us
        </h1>
        <p style={{ textAlign: "center" }}>
          You can reach us out by sending an email to
          <p className="m-0">
            <strong> "contact@stmosescopts.org.au"</strong>
          </p>{" "}
          <strong>or</strong> simply fill out the form below and we will contact
          you back as soon as possible{" "}
        </p>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button className="btn btn-info p-1 m-1 w-100">Submit</button>
      </form>
    </div>
  );
};

export default Form;
