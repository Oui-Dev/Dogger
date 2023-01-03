import axios from 'axios';
import logo from '../images/logo_full.png';
import { Link } from "react-router-dom";

export default function Login() {
    const BASE_URL = process.env.REACT_APP_API_URL;

    const submitForm = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = {
            firstname: form.get('first_name'),
            lastname: form.get('last_name'),
            email: form.get('email'),
            password: form.get('password'),
            password_confirmation: form.get('password_confirmation')
        }

        axios.put(BASE_URL + "/register", data)
            .then((res) => {
                console.log(res);
                if(res.status === 200) console.log('ok');
            })
            .catch((err) => {
                // TODO: handle API validators errors
                console.log(err.response.data)
            });
    }

    return (
        <div className="flex justify-center items-center h-screen p-4">
            <div className="max-w-md w-full mb-8 flex flex-col gap-6 md:gap-12">
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
                        <div>
                            <label htmlFor="first_name">First Name</label>
                            <input id="first_name" name="first_name" />
                        </div>
                        <div>
                            <label htmlFor="last_name">Last Name</label>
                            <input id="last_name" name="last_name" />
                        </div>
                    </div>
                    <div className="md:pt-2">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" name="email" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
                        <div className="md:pt-2">
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" name="password" />
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