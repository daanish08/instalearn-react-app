import axios from "axios";
import { useForm, FieldError } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SignupImg from "../../assets/image/signup.jpg";
import { toast } from "react-toastify";

type SignupProps = {
  userType: string;
};

type FormData = {
  name?: string;
  userName?: string;
  email: string;
  phone: string;
  password: string;
  refCode?: string;
};

const Signup = ({ userType }: SignupProps) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const url =
      userType === "admin"
        ? `http://localhost:8080/instalearn/admin/addAdmin`
        : `http://localhost:8080/instalearn/user/add`;

    axios
      .post(url, data)
      .then((response) => {
        navigate(`/${userType}/login`);
        toast(`${userType} registered successfully`);
      })
      .catch((err) => {
        toast.error("Registration failed!");
        console.error(err);
      });
  };

  const contactNumberValidator = (value: string) => {
    return (
      /^\d{10}$/.test(value) || "Contact number must be exactly 10 digits."
    );
  };

  const accessCodeValidator = (value: string) => {
    return value === "1234" || "Enter a valid Access Code";
  };

  const getErrorMessage = (error: FieldError | undefined) =>
    error ? error.message : "";

  return (
    <div className="d-flex bg-body-tertiary pt-3" style={{ height: "580px" }}>
      <div className="col-md-6 register-image">
        <img src={SignupImg} width={600} height={580} alt="Login" />
      </div>
      <div className="col-md-6 d-flex align-items-center justify-content-center">
        <form className="w-75" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-center mb-1 fw-light">
            Register As{" "}
            <span className="fw-bold text-navy">{userType.toUpperCase()}</span>
          </h2>

          <div className="form-group py-2">
            <label htmlFor="name" className="pb-1">
              {userType === "admin" ? "Name" : "Username"}
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder={
                userType === "admin" ? "Enter name" : "Enter username"
              }
              {...register(userType === "admin" ? "name" : "userName", {
                required:
                  userType === "admin"
                    ? "Name is required."
                    : "Username is required.",
              })}
            />
            {errors[userType === "admin" ? "name" : "userName"] && (
              <div className="text-danger">
                {getErrorMessage(
                  errors[userType === "admin" ? "name" : "userName"]
                )}
              </div>
            )}
          </div>

          <div className="form-group py-2">
            <label htmlFor="email" className="pb-1">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              {...register("email", {
                required: "Valid email is required.",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Please enter a valid email address.",
                },
              })}
            />
            {errors.email && (
              <div className="text-danger">{getErrorMessage(errors.email)}</div>
            )}
          </div>

          <div className="form-group py-2">
            <label htmlFor="phone" className="pb-1">
              Contact No.
            </label>
            <input
              type="text"
              className="form-control"
              id="phone"
              placeholder="Enter contact No."
              {...register("phone", { validate: contactNumberValidator })}
            />
            {errors.phone && (
              <div className="text-danger">{getErrorMessage(errors.phone)}</div>
            )}
          </div>

          <div className="form-group py-1">
            <label htmlFor="password" className="pb-1">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              {...register("password", { required: "Password is required." })}
            />
            {errors.password && (
              <div className="text-danger">
                {getErrorMessage(errors.password)}
              </div>
            )}
          </div>

          {userType === "admin" && (
            <div className="form-group py-2">
              <label htmlFor="refCode" className="pb-1">
                Access Code
              </label>
              <input
                type="text"
                className="form-control"
                id="refCode"
                placeholder="Access Code"
                onChange={(e) => accessCodeValidator(e.target.value)}
              />
              {errors.refCode && (
                <div className="text-danger">
                  {getErrorMessage(errors.refCode)}
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-block my-3 w-100 text-white fw-semibold"
            style={{ backgroundColor: "#1e1357" }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
