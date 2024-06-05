import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Correct usage of useNavigate

  const proceedLogin = (e) => {
    e.preventDefault();

    // Validate username and password
    if (!validate()) {
      return;
    }

    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username, password }),
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then((resp) => {
      if (resp.user) {
        toast.success('Login Success');
        // Store user data in local storage upon successful login
        localStorage.setItem('userData', JSON.stringify(resp.user));
        navigate('/');
      } else {
        toast.error(resp.result || 'Login failed');
      }
    })
    .catch((err) => {
      console.error('Error during login:', err);
      toast.error('Login Failed. Please try again later.');
    });
  };

  const validate = () => {
    if (!username.trim()) {
      toast.warning('Please Enter Username');
      return false;
    }
    if (!password.trim()) {
      toast.warning('Please Enter Password');
      return false;
    }
    return true;
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
          <form onSubmit={proceedLogin} className="container">
            <div className="card">
              <div className="card-header">
                <h2>User Login</h2>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label>User Name</label>
                  <input 
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                    className="form-control" 
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    className="form-control" 
                  />
                </div>
              </div>
              <div className="card-footer">
                <button type="submit" className="btn btn-primary">Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
