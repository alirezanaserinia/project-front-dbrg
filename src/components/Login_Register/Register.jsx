import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login_Register.css';
import { register } from '../../services/API';
import { ToastContainer, toast } from 'react-toastify';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

const Register = () => {
    const [state, setState] = useState({
        form: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'نام کاربری',
                    pattern: "^[a-zA-Z1-9_]+$",
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
                    placeholder: 'رمز عبور',
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
        document.title = "Register";
        let isUserLoggedin = localStorage.getItem('accessToken');
        if (isUserLoggedin) {
            navigate('/home', { replace: true });
        }
    }, );


    let formHandler = async (e) => {
        e.preventDefault();

        const formData = {}
        for (let item in state.form) {
            formData[item] = state.form[item].value
        }

        try {
            let username = state.form.username.value;
            let password = state.form.password.value;

            let isFormValid = state.form.username.valid && state.form.password.valid;
            if (!isFormValid) {
                toast.error("There are items that require your attention!", {
                    position: toast.POSITION.TOP_LEFT
                });
                return;
            }
            const res = await register(username, password);
            if (res.status === 200) {
                // jwt : res.data
                localStorage.setItem("accessToken", JSON.stringify(res.data));
                navigate('/home', { replace: true });
            } else {
            }
        } catch (err) {
            console.log(err.response.data)
            // if (err.response.status === 400) {
            //     toast.error(err.response.data, {
            //         position: toast.POSITION.TOP_LEFT
            //     });
            // }
            // else {
            //     console.log(err);
            // }
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
        <div className="login_register">
            <h1>ثبت نام</h1>
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
                    ثبت نام
                </Button>
            </form>
            <div className="login_register_navigation">
                <p>قبلا ثبت نام کرده اید؟</p>
                {' '}
                <Link to="/login">
                    ورود
                </Link>
            </div>
        </div>
    )
}
export default Register;