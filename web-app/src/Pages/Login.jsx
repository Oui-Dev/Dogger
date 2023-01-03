import axios from 'axios';
import logo from '../images/logo_full.png';
import { Link } from "react-router-dom";

export default function Login() {
    const BASE_URL = process.env.REACT_APP_API_URL;

    const submitForm = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = {
            email: form.get('email'),
            password: form.get('password')
        }

        axios.put(BASE_URL + "/login", data)
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
            <div className="max-w-md w-full mb-8 flex flex-col gap-10 md:gap-14">
                <div>
                    <img
                        className="mx-auto w-24"
                        src={logo}
                        alt="Logo Dogger"
                    />
                    <h2 className="mt-6 text-center text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{' '}
                        <Link to="/register" className="font-medium text-dogger-orange-400 hover:text-dogger-orange-500">
                            create your account
                        </Link>
                    </p>
                </div>
                <form onSubmit={submitForm}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" name="email" />
                    </div>
                    <div className="mt-5">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" name="password" />
                    </div>
                    <button className="btn-primary mt-6 w-full" type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}