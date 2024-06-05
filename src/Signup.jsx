import React, { useState } from 'react';
import { IoHome } from "react-icons/io5";
import { Link} from "react-router-dom";
import { toast } from 'react-toastify';
import './Signup.css'
function Signup() {
    // const [id, setId] = useState ('');
    const [name, setName] = useState('');

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password,setPassword]=useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        const regObj = { name, email, phone,password};
        console.log(regObj);

        // Perform validation here if needed

        fetch("http://localhost:5000/register", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(regObj)
        })
            .then((res) => {
                if (res.ok) {
                    toast.success('Registered successfully.');

                    setName('');
                    setEmail('');
                    setPhone('');
                    setPassword('')
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch((err) => {
                toast.error('Failed: ' + err.message);
            });

    };

    return (
        
        <div>
         <Link to="/" className="home-link "><IoHome /></Link>
            <div className="offset-lg-3 col-lg-6">
                <div className="card">
                    <div className="card-header">
                        <h1>SIGNUP</h1>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label>Name</label>
                            <input value={name} onChange={e => setName(e.target.value)} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Phone no.</label>
                            <input value={phone} onChange={e => setPhone(e.target.value)} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" />
                        </div>
                    </div>
                    <div className="card-footer">
                        <button onClick={handleSubmit} className="btn btn-primary">Register</button>
                       
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
