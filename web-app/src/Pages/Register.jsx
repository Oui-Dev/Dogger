import logo from '../images/logo_full.png';
import { Link } from "react-router-dom";
import { browserName, browserVersion, osName, osVersion } from "react-device-detect";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { register } from '../Redux/Actions/users';

export default function Login() {
    const [formErrorsBag, setFormErrorsBag] = useState(null);
    const dispatch = useDispatch();

    const submitForm = (e) => {
        e.preventDefault();
        setFormErrorsBag(null);
        const form = new FormData(e.target);
        const data = {
            firstname: form.get('first_name'),
            lastname: form.get('last_name'),
            email: form.get('email'),
            password: form.get('password'),
            password_confirmation: form.get('password_confirmation'),
            device_name: `${osName} ${osVersion}, ${browserName} ${browserVersion}`
        }

        dispatch(register(data))
            .then((res) => {
                console.log(res);
                localStorage.setItem('token', res.token);
                window.location.href = '/';
            })
            .catch((err) => {
                if(err.response.status === 422) setFormErrorsBag(err.response.data.errors);
            });
    }

    return (
        <div className="flex justify-center items-center h-screen p-4">
            <div className="max-w-md w-full mb-14 flex flex-col gap-6 md:gap-12">
                <div>
                    <img
                        className="mx-auto w-24"
                        src={logo}
                        alt="Logo Dogger"
                    />
                    <h2 className="mt-6 text-center text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Create your account</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{' '}
                        <Link to="/login" className="font-medium text-dogger-orange-400 hover:text-dogger-orange-500">
                            login
                        </Link>
                    </p>
                </div>
                <form onSubmit={submitForm}>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
                        <div className={formErrorsBag?.firstname ? "form-error-div" : ""}>
                            <label htmlFor="first_name">First Name</label>
                            <input id="first_name" name="first_name" />
                            { formErrorsBag?.firstname && <div className="form-error-field">{ formErrorsBag.firstname[0] }</div> }
                        </div>
                        <div className={formErrorsBag?.lastname ? "form-error-div" : ""}>
                            <label htmlFor="last_name">Last Name</label>
                            <input id="last_name" name="last_name" />
                            { formErrorsBag?.lastname && <div className="form-error-field">{ formErrorsBag.lastname[0] }</div> }
                        </div>
                    </div>
                    <div className={`md:pt-2 ${formErrorsBag?.email ? "form-error-div" : ""}`}>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" name="email" />
                        { formErrorsBag?.email && <div className="form-error-field">{ formErrorsBag.email[0] }</div> }
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
                        <div className={`md:pt-2 ${formErrorsBag?.password ? "form-error-div" : ""}`}>
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" name="password" />
                            { formErrorsBag?.password && <div className="form-error-field">{ formErrorsBag.password[0] }</div> }
                        </div>
                        <div className="md:pt-2">
                            <label htmlFor="password_confirmation">Confirm Password</label>
                            <input id="password_confirmation" type="password" name="password_confirmation" />
                        </div>
                    </div>
                    <button className="btn-primary mt-6 w-full" type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}