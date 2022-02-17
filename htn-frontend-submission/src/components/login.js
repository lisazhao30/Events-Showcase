import { useRef, useState, useEffect, useContext } from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from '../authorization/axios';
import AuthContext from "../authorization/authprovider";
import "../css/login.css";

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errorRef = useRef();

    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false); 

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrorMsg('');
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/tasks',
                JSON.stringify({ username, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            setAuth({ username, password });
            setUser('');
            setPassword('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrorMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrorMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrorMsg('Unauthorized');
            } else {
                setErrorMsg('Login Failed');
            }
            errorRef.current.focus();
        } 
    }

    const usernameSubmit = ({ target }) => {
        setUser(target.value);
    }

    const passwordSubmit = ({ target }) => {
        setPassword(target.value);
    }

    const history = useNavigate();

    return ( 
        <div className="container">
             <>
            {success ? ( history("/events")
            ) : (
                <div className="form">
                    <p ref={errorRef} className={errorMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errorMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="username"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={usernameSubmit}
                            value={username}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={passwordSubmit}
                            value={password}
                            required
                        />
                        <button>Sign In</button>
                        <div className="signUp">
                            <p>
                                Need an Account?<br />
                                <span className="line">
                                    <Link to="/register">Sign Up</Link>
                                </span>
                            </p>
                        </div>
                    </form>
                </div>
            )}
        </>
        </div>
    )
}

export default Login