import { useEffect } from 'react';
import './Errors.css';
import { Link } from 'react-router-dom';

const Error404 = () => {
    useEffect(() => {
        document.title = "Error";
    }, []);

    return (
        <div id="error_box">
            <div class="error_content">
                <div class="error_status_code">
                    <h1>404</h1>
                </div>
                <h2>Oops! Page not found</h2>
                <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable. <Link to="/home">Return to homepage</Link></p>
            </div>
	    </div>
    )
}
export default Error404;