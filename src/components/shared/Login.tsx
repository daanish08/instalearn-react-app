import { useForm } from 'react-hook-form';
import login from  "../../assets/image/login.jpg";
import { Link } from 'react-router-dom';


const LoginComponent = ({ userType }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(`${userType} Form Data:`, data);
    // You can implement different login logic based on userType here
    if (userType === 'admin') {
      // Admin-specific logic
    } else {
      // User-specific logic
    }
  };

  return (
    <div className="login-page d-flex bg-body-tertiary" style={{ height: '580px' }}>
    <div className="col-md-6 login-image">
      <img src={login} width={600} height={580}/>
    </div>
    <div className="col-md-6 d-flex py-5 justify-content-center">
    <div className="card w-75 py-5 px-3 "  >
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-center text-black mb-1 fw-light">
            Login As <span className="fw-bold text-navy">{userType.toUpperCase()}</span>
          </h2>
          <div className="form-group text-navy py-4">
            <label htmlFor="email" className="pb-1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              {...register('email', {
                required: 'Email is required.',
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: 'Please enter a valid email address.',
                },
              })}
            />
            {errors.email && <div className="text-danger">{errors.email.message}</div>}
          </div>
          <div className="form-group py-1 text-navy">
            <label htmlFor="password" className="pb-1">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              {...register('password', { required: 'Password is required.' })}
            />
            {errors.password && <div className="text-danger">{errors.password.message}</div>}
          </div>
          <button type="submit" className="btn  text-white btn-block my-3 w-100" style={{backgroundColor:"#1e1357"}}>
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