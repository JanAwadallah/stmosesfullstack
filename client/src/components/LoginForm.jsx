import { useEffect, useState } from "react";
import FormInput from "./FormInput";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "./Spinner";

const LoginForm = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.auth
  );
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,20}$`,

      errorMessage:
        "Password has to be 8-20 characters long with at least one letter and one digit - (Special characters are allowed)!",
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(values));
  };
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [isError, isLoading, message, dispatch, navigate, isSuccess, user]);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="container mt-3" style={{ maxWidth: "700px" }}>
      <form onSubmit={handleSubmit} id="form">
        <h1 style={{ fontFamily: "cursive", fontWeight: "700" }}>
          <FaSignInAlt /> Log In
        </h1>
        <p style={{ textAlign: "center" }}>
          Please login. Not a member yet! No problem, just{" "}
          {<Link to="/register">Register</Link>}
        </p>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button className="btn btn-info p-1 m-1 w-100">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
