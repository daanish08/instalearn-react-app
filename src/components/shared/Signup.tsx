import { useForm } from 'react-hook-form';
import login from  "../../assets/image/login.jpg";
import axios from 'axios';
import { useAuth } from '../../contexts/authContext';

const Signup= ({ userType }) => {
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const response =  axios.post(`http://localhost:8080/instalearn/admin/addAdmin`, data);
    console.log('API Response:', response.data);
    console.log('Signup Form Data:', data);
  };

  const contactNumberValidator = (value) => {
    return /^\d{10}$/.test(value) || 'Contact number must be exactly 10 digits.';
  };

    const accessCodeValidator = (value) => {
      return value === '1234' || 'Enter a valid Access Code';

  }
  

  return (
    <div className="d-flex bg-body-tertiary" style={{ height: '580px' }}>
      <div className="col-md-6 register-image">
      <img src={login} width={600} height={580}/>
      </div>
      <div className="col-md-6 d-flex align-items-center justify-content-center">
        <form className="w-75" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-center mb-1 fw-light">
            Register As <span className="fw-bold text-navy">{userType.toUpperCase()}</span>
          </h2>

          <div className="form-group py-2">
            <label htmlFor="name" className="pb-1">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter name"
              {...register('name', { required: 'Name is required.' })}
            />
            {errors.name && <div className="text-danger">{errors.name.message}</div>}
          </div>

          <div className="form-group py-2">
            <label htmlFor="email" className="pb-1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              {...register('email', {
                required: 'Valid email is required.',
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: 'Please enter a valid email address.',
                }
              })}
            />
            {errors.email && <div className="text-danger">{errors.email.message}</div>}
          </div>

          <div className="form-group py-2">
            <label htmlFor="phone" className="pb-1">Contact No.</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              placeholder="Enter contact No."
              {...register('phone', { validate: contactNumberValidator })}
            />
            {errors.phone && <div className="text-danger">{errors.phone.message}</div>}
          </div>

          <div className="form-group py-1">
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

          {userType === 'admin' && (
            <div className="form-group py-2">
              <label htmlFor="refCode" className="pb-1">Access Code</label>
              <input
                type="text"
                className="form-control"
                id="refCode"
                placeholder="Access Code"
                onChange={accessCodeValidator}
              />
              {errors.refCode && <div className="text-danger">{errors.refCode.message}</div>}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-block my-3 w-100 text-white fw-semibold"
            style={{ backgroundColor: '#1e1357' }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
