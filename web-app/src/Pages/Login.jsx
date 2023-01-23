import logo from '../images/logo_full.png';
import { Link } from "react-router-dom";
import { login } from "../Redux/Actions/users";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { browserName, browserVersion, osName, osVersion } from "react-device-detect";

export default function Login() {
    const dispatch = useDispatch();

    const submitForm = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = {
            email: form.get('email'),
            password: form.get('password'),
            device_name: `${osName} ${osVersion}, ${browserName} ${browserVersion}`
        }

        dispatch(login(data))
            .then((res) => {
                console.log(res);
                localStorage.setItem('token', res.token);
                window.location.href = '/';
            })
            .catch((err) => toast.error(err.response.data.message));
    }
    return (
        <div className="flex justify-center items-center h-screen p-4">
            <div className="max-w-md w-full mb-24 flex flex-col gap-10 md:gap-14">
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
                            create a new account
                        </Link>
                    </p>
                </div>
                <form onSubmit={submitForm}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" name="email" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" name="password" />
                    </div>
                    <button className="btn-primary mt-6 w-full" type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}