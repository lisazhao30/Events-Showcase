import { useRef, useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import "../css/login.css";

const USER_REGEX = /^[A-z][A-z0-9-_]{4,50}$/;
const password_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,50}$/;

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setpassword] = useState('');
    const [validpassword, setValidpassword] = useState(false);
    const [passwordFocus, setpasswordFocus] = useState(false);

    const [matchpassword, setMatchpassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(username));
    }, [username])

    useEffect(() => {
        setValidpassword(password_REGEX.test(password));
        setValidMatch(password === matchpassword);
    }, [password, matchpassword])

    useEffect(() => {
        setErrMsg('');
    }, [username, password, matchpassword])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(username);
        const v2 = password_REGEX.test(password);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/tasks',
                JSON.stringify({ username, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            setSuccess(true);
            setUser('');
            setpassword('');
            setMatchpassword('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    const history = useNavigate();

    return (
        <>
            {success ? ( history("/login")
            ) : (
                <div className="container">
                    <div className="form">
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h1>Register</h1>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="username">
                                Username:

                            </label>
                            <input
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={username}
                                required
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            <p id="uidnote" className={userFocus && username && !validName ? "instructions" : "offscreen"}>
                                Username must be greater than 3 characters and start with a letter.<br />
                            </p>


                            <label htmlFor="password">
                                Password:
                                
                            </label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setpassword(e.target.value)}
                                value={password}
                                required
                                aria-invalid={validpassword ? "false" : "true"}
                                aria-describedby="passwordnote"
                                onFocus={() => setpasswordFocus(true)}
                                onBlur={() => setpasswordFocus(false)}
                            />
                            <p id="passwordnote" className={passwordFocus && !validpassword ? "instructions" : "offscreen"}>
                        
                                8 to 24 characters.<br />
                                Must include uppercase and lowercase letters and a number.<br />
                            
                            </p>


                            <label htmlFor="confirm_password">
                                Confirm Password:
                
                            </label>
                            <input
                                type="password"
                                id="confirm_password"
                                onChange={(e) => setMatchpassword(e.target.value)}
                                value={matchpassword}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />

                            <button disabled={!validName || !validpassword || !validMatch ? true : false}>Sign Up</button>
                        </form>
                        <div className="login">
                            <p>
                                Already registered?<br />
                                <Link to="/login">Sign In</Link>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Register