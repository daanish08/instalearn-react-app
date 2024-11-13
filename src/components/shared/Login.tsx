import { useForm } from "react-hook-form";
import loginImg from "../../assets/image/login.jpg";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { Helmet } from "react-helmet-async";

interface ICredentials {
  email: string;
  password: string;
}

interface LoginComponentProps {
  userType: string;
}

const LoginComponent = ({ userType }: LoginComponentProps) => {
  const capitalizedUserType =
    userType.charAt(0).toUpperCase() + userType.slice(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICredentials>();
  const { login } = useAuth();

  const onSubmit = (data: ICredentials) => {
    console.log(`${userType} Form Data:`, data);
    login(data);
  };

  return (
    <div
      className="login-page d-flex bg-body-tertiary"
      style={{ height: "580px" }}
    >
      <Helmet>
        <title>{capitalizedUserType} Login</title>
      </Helmet>
      <div className="col-md-6 login-image">
        <img src={loginImg} width={600} height={580} />
      </div>
      <div className="col-md-6 d-flex py-5 justify-content-center">
        <div className="card w-75 py-5 px-3 ">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="text-center text-black mb-1 fw-light">
                Login As{" "}
                <span className="fw-bold text-navy">
                  {userType.toUpperCase()}
                </span>
              </h2>
              <div className="form-group text-navy py-4">
                <label htmlFor="email" className="pb-1">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  {...register("email", {
                    required: "Email is required.",
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      message: "Please enter a valid email address.",
                    },
                  })}
                />
                {errors.email && (
                  <div className="text-danger">{errors.email.message}</div>
                )}
              </div>
              <div className="form-group py-1 text-navy">
                <label htmlFor="password" className="pb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required.",
                  })}
                />
                {errors.password && (
                  <div className="text-danger">{errors.password.message}</div>
                )}
              </div>
              <button
                type="submit"
                className="btn  text-white btn-block my-3 w-100"
                style={{ backgroundColor: "#1e1357" }}
              >
                Login
              </button>

              <div className="text-center mt-2">
                <p className="text-body">
                  Don't have an account?
                  <Link
                    to={`/${userType}/signup`}
                    className="text-decoration-none text-navy border-bottom fw-semibold"
                  >
                    Register here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
