import { Link, useNavigate } from 'react-router-dom';
import './Login_Register.css';
import { useEffect, useState } from 'react';
import Wrapper from '../../hoc/Wrapper';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Login";
        let isUserLoggedin = localStorage.getItem('accessToken');
        if (isUserLoggedin) {
            navigate('/', { replace: true });
        }
    }, []);

    let formHandler = async (e) => {
        e.preventDefault();
        try {
            // // const res = await login(username, password);
            // if (res.status === 200) {
            //     // jwt : res.data
            //     localStorage.setItem("accessToken", JSON.stringify(res.data));
            //     console.log(JSON.parse(localStorage.getItem('accessToken')));
            //     navigate('/', { replace: true });
            //     // window.location.reload();
            // } else {
            //     console.log(res);
            // }

        } catch (err) {
            // if (err.response.status === 401) {
            // 	toast.error(err.response.data, {
            // 		position: toast.POSITION.TOP_LEFT
            // 	});
            // }
            // else {
            console.log(err);
            // }
        }
    };
    return (
        <Wrapper>
            <div className="login-register">
                <h2>
                    Welcome
                </h2>
                <form onSubmit={formHandler} className='login-form'>
                            <input type="text" name="Username" placeholder="Username" required
                                onChange={(event) => setUsername(event.target.value)} />
                        
                            
                            <input type="password" name="Password" placeholder="Password" required
                                onChange={(event) => setPassword(event.target.value)} />
                        
                    
                    <div className="login_register_form_submit">
                        <button className="btn" type="submit">
                            Login
                        </button>
                    </div>
                </form>
                <div className="login_register_navigation">
                    <span>
                        Don’t have an account?
                    </span>
                    {' '}
                    <span>
                        <Link to="/register">
                            Register
                        </Link>
                    </span>
                </div>
            </div>

            {/* <ToastContainer /> */}
        </Wrapper>
    )
}
export default Login;
