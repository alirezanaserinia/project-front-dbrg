import { useEffect } from 'react';
import './Errors.css';
import { Link } from 'react-router-dom';

const Error404 = () => {
    useEffect(() => {
        document.title = "Error";
    }, []);

    return (
        <div id="error_box">
            <div className="error_content">
                <div className="error_status_code">
                    <h1>404</h1>
                </div>
                <h1>!صفحه مورد نظر یافت نشد</h1>
                <p>.صفحه ای که به دنبال آن هستید ممکن است در صورت تغییر نام حذف شده باشد یا به طور موقت در دسترس نباشد</p>
                <p><Link to="/home">بازگشت به صفحه نخست</Link></p>
            </div>
	    </div>
    )
}
export default Error404;