import {Link} from "react-router-dom";
import "../css/navbar.css";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
            </div>
        </div>
    )
}

export default Navbar;