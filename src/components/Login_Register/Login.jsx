import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import BalootLogo from '../../assets/images/baloot-logo.svg';
import './Login_Register.css';
// import { login } from '../../services/API';
import { ToastContainer, toast } from 'react-toastify';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

const Login = () => {

    const [state, setState] = useState({
        form: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email...',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                used: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password...',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                used: false,
            },
        },
    });

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

        const formData = {}
        for (let item in state.form) {
            formData[item] = state.form[item].value
        }

        try {
            let email = state.form.email.value;
            let password = state.form.password.value;
            let isFormValid = state.form.email.valid && state.form.password.valid;
            if (!isFormValid) {
                toast.error("There are items that require your attention!", {
                    position: toast.POSITION.TOP_LEFT
                });
                return;
            }
            // const res = await login(email, password);
            // if (res.status === 200) {
            //     // jwt : res.data
            //     localStorage.setItem("accessToken", JSON.stringify(res.data));
            //     console.log(JSON.parse(localStorage.getItem('accessToken')));
            //     navigate('/', { replace: true });
            //     window.location.reload();
            // } else {
            //     console.log(res);
            // }
            
        } catch (err) {
            if (err.response.status === 401) {
				toast.error(err.response.data, {
					position: toast.POSITION.TOP_LEFT
				});
			}
			else {
				console.log(err);
			}
        }
    };

    let checkValidation = (value, rules) => {
        let isValid = false

        if (rules.required) {
            isValid = value.trim() !== ''
        }

        return isValid
    }

    let inputChangeHandler = (event, inputElement) => {
        const updatedForm = {
            ...state.form,
        }

        const updatedElement = { ...updatedForm[inputElement] }

        updatedElement.value = event.target.value

        updatedElement.valid = checkValidation(
            updatedElement.value,
            updatedElement.validation
        )

        updatedElement.used = true

        updatedForm[inputElement] = updatedElement

        setState({ form: updatedForm })
    }

    const elementsArray = []

    for (let item in state.form) {
        elementsArray.push({
            id: item,
            config: state.form[item],
        })
    }

    return (
        <main style={{backgroundColor:"#F7F0E9"}}>
            <div className="login_register_main">
                <div className="login_register">
                    <div className="login_register_welcome_text">
                        ورود
                    </div>
                    <div className="login_register_baloot_logo">
                        {/* <img src={BalootLogo} alt="Baloot-logo"/> */}
                    </div>
                    <form onSubmit={formHandler} className='login_btn'>
                        {elementsArray.map((item) => {
                            return (
                                <Input
                                    key={item.id}
                                    elementType={item.config.elementType}
                                    elementConfig={item.config.elementConfig}
                                    value={item.config.value}
                                    invalid={!item.config.valid}
                                    used={item.config.used}
                                    change={(event) => inputChangeHandler(event, item.id)}
                                />
                            )
                        })}
                        <Button btnType="submit md">
                            ورود
                        </Button>
                    </form>
                    <div className="login_register_navigation">
                        <span>
                            حساب کاربری ندارید؟
                        </span>
                        {' '}
                        <span>
                            <Link to="/register">
                                ثبت نام
                            </Link>
                        </span>
                    </div>
                    {/* <div className='seperator'>
                        <div className='seperator-line'></div> <p>OR</p><div className='seperator-line'></div>
                    </div>
                    <Link className='github-link' to={GithubURL}>
                        <img src={githubLogo} />
                        <span>
                            Continue with Github
                        </span>
                    </Link> */}
                </div>
            </div>
            <ToastContainer />
        </main>
    )
}
export default Login;
