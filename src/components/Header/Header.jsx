import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiPower } from "react-icons/fi";
import "./Header.css";

function Header() {

    const navigate = useNavigate();

    let logout = async (e) => {
		e.preventDefault();
		try {
			localStorage.removeItem("accessToken");
			localStorage.removeItem("resultData");
			navigate('/login', { replace: true });

		} catch (err) {
			console.log(err);
		}
	};

    return (
        <header className="header">
            <NavLink to="/logout" className="logout" onClick={logout}>
                <span className="icon-text">
                    <FiPower />
                    خروج
                </span></NavLink>
            <NavLink to="#">تماس با ما</NavLink>
            <NavLink to="#">پنل کاربری</NavLink>
            <NavLink end to="/home">خانه</NavLink>
        </header>
    );
}

export default Header;
