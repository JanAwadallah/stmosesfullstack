import { useState, useEffect } from "react";
import FormInput from "./FormInput";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaUserAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "./Spinner";

const RegisterForm = () => {
  const [familyData, setFamilyData] = useState({
    isMarried: false,
    spouseDOB: "",
    children: {
      No: "",
    },
  });
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    password: "",
    confirmPassword: "",
    geelongLocal: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const arr = [];
  for (let n = 0; n < familyData.children.No; n++) {
    arr.push(`child${n}`);
  }

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  const inputsFamily = [
    {
      id: 1,
      name: "spouseName",
      type: "text",
      placeholder: "Spouse Full Name",
      errorMessage: "Spouse full name is requird",
      label: "Spouse Full Name",
      pattern: "^(?=.*[ ])[A-Za-z ]{3,25}",
      required: true,
    },
    {
      id: 2,
      name: "spouseDOB",
      type: "date",
      placeholder: "Spouse date of birth",
      errorMessage: "Spouse date of birth is requird",
      label: "Spouse date of birth",
      required: true,
    },
    {
      id: 3,
      name: "No",
      label: "Number of children",
      type: "number",
      min: 0,
      placeholder: 0,
      required: true,
    },
  ];
  const inputs = [
    {
      id: 1,
      name: "firstName",
      type: "text",
      placeholder: "First Name",
      errorMessage:
        "First Name should be 3-16 characters and shouldn't include any special character!",
      label: "First Name",
      pattern: "^[A-Za-z]{3,16}",
      required: true,
    },
    {
      id: 2,
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
      errorMessage:
        "Last Name should be 3-16 characters and shouldn't include any special character!",
      label: "Last Name",
      pattern: "^[A-Za-z]{3,16}",
      required: true,
    },
    {
      id: 3,
      name: "dateOfBirth",
      type: "date",
      placeholder: "dd/mm/yyyy",
      errorMessage: "Please enter your date of birth on 'dd/mm/yyy' format",
      label: "Date of Birth",
      required: true,
    },
    {
      id: 4,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },

    {
      id: 5,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      errorMessage:
        "Password has to be 8-20 characters long with at least one letter and one digit - (Special characters are allowed)!",
      required: true,
    },
    {
      id: 6,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fixedValues = {
      ...values,
      dateOfBirth: values.dateOfBirth.split("-").reverse().join("-"),
      family: {
        ...familyData,
        spouseDOB: familyData.spouseDOB.split("-").reverse().join("-"),
      },
    };

    dispatch(register(fixedValues));
  };
  useEffect(() => {
    if (isError) {
      setValues({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        email: "",
        password: "",
        confirmPassword: "",
        geelongLocal: false,
      });
      setFamilyData({
        isMarried: false,
        spouseDOB: "",
        children: {
          No: "",
        },
      });
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [isError, isLoading, message, dispatch, navigate, isSuccess, user]);
  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const onChangeFamily = (e) => {
    setFamilyData({
      ...familyData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "No") {
      setFamilyData({
        ...familyData,
        children: {
          ...familyData.children,
          No: e.target.value,
        },
      });
    }
    if (e.target.name === "childName") {
      setFamilyData({
        ...familyData,
        children: {
          ...familyData.children,
          [`child${Number(e.target.id) + 1}`]: {
            ...familyData.children[`child${Number(e.target.id) + 1}`],
            name: e.target.value,
          },
        },
      });
    }
    if (e.target.name === "dateOfBirth") {
      let child = `child${Number(e.target.id) + 1}`;
      const childData = familyData.children[`child${Number(e.target.id) + 1}`];
      setFamilyData({
        ...familyData,
        children: {
          ...familyData.children,
          [child]: {
            ...childData,
            dateOfBirth: e.target.value.split("-").reverse().join("-"),
          },
        },
      });
    }
  };
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mt-3" style={{ minWidth: "50%" }}>
      <form onSubmit={handleSubmit} id="form">
        <h1 style={{ fontFamily: "cursive", fontWeight: "700" }}>
          <FaUserAlt /> Register
        </h1>
        <p style={{ textAlign: "center" }}>
          Already registered{" "}
          {
            <Link to="/login" style={{ textDecoration: "none" }}>
              <FaSignInAlt /> Log in
            </Link>
          }
        </p>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}

        <div className="form-check">
          <input
            onChange={() => {
              setValues({
                ...values,
                geelongLocal: !values.geelongLocal,
              });
            }}
            className="form-check-input"
            type="checkbox"
            value={values.geelongLocal}
            name="geelongLable"
            id="geelongLocal"
          />
          <label className="form-check-label" htmlFor="geelongLocal">
            St.Moses community member
          </label>
        </div>
        {values.geelongLocal && (
          <>
            <FormInput
              name="phone"
              label="Phone Number"
              type="text"
              class="form-control"
              id="phone"
              placeholder="04 xxxx xxxx"
              required
              errorMessage="Mobile phone number is required"
              pattern="^[0][4][0-9]{8}"
              value={familyData["phone"]}
              onChange={onChangeFamily}
            />
            <FormInput
              name="address"
              label="Postal Address"
              type="text"
              class="form-control"
              id="address"
              placeholder="Address"
              required
              errorMessage="Postal address is required"
              pattern="^(?=.*[ ])[A-Za-z 0-9,-]{3,300}"
              value={familyData["address"]}
              onChange={onChangeFamily}
            />

            <div className="form-check">
              <input
                onChange={() => {
                  setFamilyData({
                    ...familyData,
                    isMarried: !familyData.isMarried,
                  });
                }}
                className="form-check-input"
                type="checkbox"
                value={familyData.isMarried}
                name="isMarried"
                id="isMarried"
              />
              <label className="form-check-label" htmlFor="isMarried">
                Married
              </label>
            </div>
            {familyData.isMarried && (
              <div>
                {inputsFamily.map((input) => (
                  <FormInput
                    key={input.id}
                    {...input}
                    value={familyData[input.name]}
                    onChange={onChangeFamily}
                  />
                ))}
              </div>
            )}
          </>
        )}
        <div id="family">
          {arr.map((item, i) => (
            <div
              class="input-group mb-3"
              style={{ display: "flex", flexDirection: "column" }}
              key={i}
            >
              <span style={{ minWidth: "200px" }} class="input-group-text">
                Child Name
              </span>
              <input
                style={{ minWidth: "200px", width: "100%" }}
                name="childName"
                id={i}
                type="text"
                class="form-control"
                placeholder={`Child${i + 1} Name`}
                aria-label="childName"
                required
                onChange={onChangeFamily}
              />
              <span class="input-group-text mt-2">Date of Birth</span>
              <input
                style={{ minWidth: "200px", width: "100%" }}
                name="dateOfBirth"
                id={i}
                type="date"
                class="form-control"
                placeholder="Date of Birth"
                aria-label="dateOfBirth"
                required
                onChange={onChangeFamily}
              />
            </div>
          ))}
        </div>

        <button className="btn btn-info p-1 m-1 w-100">Submit</button>
      </form>
    </div>
  );
};

export default RegisterForm;
