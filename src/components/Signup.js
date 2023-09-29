
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name: '',email: '',password: '',confirmpassword: '',});
let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmpassword } = credentials;

    // Check if passwords match
    if (password !== confirmpassword) {
      props.showAlert('Passwords do not match', 'danger');
      return;
    }

    const response = await fetch('http://localhost:5000/api/auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      navigate('/');
      props.showAlert('Account created successfully', 'success');
    } else {
      props.showAlert('User already exists', 'danger');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3"><label htmlFor="name" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="name" name="name" value={credentials.name}
            onChange={onChange}/>
              </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp"
            value={credentials.email} onChange={onChange}/>
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password"
            value={credentials.password}onChange={onChange} required minLength={5}/>
        </div>
        <div className="mb-3">
          <label htmlFor="confirmpassword" className="form-label"> Confirm Password </label>
          <input type="password" className="form-control" id="confirmpassword" name="confirmpassword"
            value={credentials.confirmpassword} onChange={onChange} required minLength={5}/>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;

