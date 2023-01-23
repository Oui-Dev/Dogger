import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Avatar from '../Components/Atoms/Avatar'
import Button from '../Components/Atoms/Button'
import Modal from '../Components/Organisms/Modal'
import Table from '../Components/Organisms/Table/Table';
import { retrieveCurrentUser, updateUser, deleteUser, retrieveUserDevices, logout } from '../Redux/Actions/users';
import { BsBoxArrowRight } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';

export default function Profile() {
    const [formErrorsBag, setFormErrorsBag] = useState(null);
    const [openDangerModal, setOpenDangerModal] = useState(false);
    const [initials, setInitials] = useState('');
    const [devices, setDevices] = useState([]);
    const [user, setUser] = useState({});
    const data = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveCurrentUser());
        dispatch(retrieveUserDevices());
    }, []);

    useEffect(() => {
        if(typeof data === 'object' && data?.firstname) {
            setInitials(data.firstname[0] + data.lastname[0]);
            setUser(data);
        }
        else if(Array.isArray(data) && data.length > 0) {
            const currentTokenId = localStorage.getItem('token')[0];
            data.forEach(device => {
                if(device.id == currentTokenId) {
                    device.name = 'Current Device';
                }
            });
            setDevices(data);
        };
    }, [data]);

    const deleteAccount = () => {
        dispatch(deleteUser())
            .then(() => {
                window.localStorage.removeItem('token');
                window.location.href = '/login';
            })
            .catch((err) => { if(err?.response) toast.error(err.response.data.message); });
    }

    const submitForm = (e) => {
        e.preventDefault();
        setFormErrorsBag(null);
        const form = new FormData(e.target);
        const data = {};
        if (!!form.get('firstName')) Object.assign(data, { firstname: form.get('firstName') });
        if (!!form.get('lastName')) Object.assign(data, { lastname: form.get('lastName') });
        if (!!form.get('email')) Object.assign(data, { email: form.get('email') });
        if (!!form.get('old_password')) Object.assign(data, { old_password: form.get('old_password') });
        if (!!form.get('password')) Object.assign(data, { password: form.get('password') });
        if (!!form.get('password_confirmation')) Object.assign(data, { password_confirmation: form.get('password_confirmation') })

        if (Object.keys(data).length > 0) {
            dispatch(updateUser(data))
                .then((res) => {
                    toast.success(res.message);
                    setInitials(data.firstname[0] + data.lastname[0]);
                })
                .catch((err) => {
                    setFormErrorsBag(err.response.data.errors);
                    toast.error('Something went wrong !');
                })
        }
    }

    const _logout = (id) => {
        dispatch(logout(id))
            .then(() => {
                if(id == localStorage.getItem('token')[0]) {
                    window.localStorage.removeItem('token');
                    window.location.href = '/login';
                } else {
                    toast.success('This device has been logged out successfully !')
                    setDevices(devices.filter(device => device.id !== id));
                }
            })
            .catch(() => toast.error("Something went wrong"));
    }

    return (
        <>
            <div className="mt-16 mx-0 md:mt-0">
                <form onSubmit={submitForm}>
                    <div className="overflow-hidden shadow md:rounded-md">
                        <div className="bg-white px-4 py-5 md:p-6">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="inline-grid col-span-6 md:col-span-6 justify-items-center md:justify-items-start">
                                    <Avatar initials={initials} />
                                </div>
                                <div className={`col-span-6 md:col-span-3 ${formErrorsBag?.firstname ? "form-error-div" : ""}`}>
                                    <label htmlFor="firstName">First name</label>
                                    <input name="firstName" id="firstName" autoComplete='given-name' defaultValue={user?.firstname} />
                                    {formErrorsBag?.firstname &&
                                        <div className="form-error-field">{formErrorsBag.firstname[0]}</div>
                                    }
                                </div>

                                <div className={`col-span-6 md:col-span-3 ${formErrorsBag?.lastname ? "form-error-div" : ""}`}>
                                    <label htmlFor="lastName">Last name</label>
                                    <input name="lastName" id="lastName" autoComplete='family-name' defaultValue={user?.lastname}/>
                                    {formErrorsBag?.lastname &&
                                        <div className="form-error-field">{formErrorsBag.lastname[0]}</div>
                                    }
                                </div>

                                <div className={`col-span-6 ${formErrorsBag?.email ? "form-error-div" : ""}`}>
                                    <label htmlFor="email">Email address</label>
                                    <input name="email" id="email" autoComplete='email' defaultValue={user?.email}/>
                                    {formErrorsBag?.email &&
                                        <div className="form-error-field">{formErrorsBag.email[0]}</div>
                                    }
                                </div>

                                <div className={`col-span-6 md:col-span-6 lg:col-span-2 ${formErrorsBag?.old_password ? "form-error-div" : ""}`}>
                                    <label htmlFor="old_password">Current Password</label>
                                    <input type="password" name="old_password" id="old_password" autoComplete='current-password'/>
                                    {formErrorsBag?.old_password &&
                                        <div className="form-error-field">{formErrorsBag.old_password[0]}</div>
                                    }
                                </div>

                                <div className={`col-span-6 md:col-span-3 lg:col-span-2 ${formErrorsBag?.password ? "form-error-div" : ""}`}>
                                    <label htmlFor="password">New Password</label>
                                    <input type="password" name="password" id="password" autoComplete='new-password'/>
                                    {formErrorsBag?.password &&
                                        <div className="form-error-field">{formErrorsBag.password[0]}</div>
                                    }
                                </div>

                                <div className="col-span-6 md:col-span-3 lg:col-span-2">
                                    <label htmlFor="password_confirmation">Confirm New Password</label>
                                    <input type="password" name="password_confirmation" id="password_confirmation" autoComplete='new-password'/>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 px-4 py-3 flex justify-between md:px-6">
                            <Button
                                type={"warning"}
                                onClick={(e) => {
                                    setOpenDangerModal(true)
                                    e.preventDefault()
                                }}>
                                Delete Account
                            </Button>
                            <button className="btn-primary" type="submit">Save</button>
                        </div>
                    </div>
                </form>
                <div className="mt-12">
                    <h2 className="text-xl font-medium mb-4">Connected Devices</h2>
                    <Table
                        tableTitles={['Name', 'Created At', 'Last used at']}
                        tableKeys={['name', 'created_at', 'last_used_at']}
                        data={devices}
                        actions={[
                            { function: _logout, fctParam: 'id', icon: <BsBoxArrowRight />, hover: 'hover:text-red-500' }
                        ]}
                    />
                </div>
            </div>
            <Modal
                open={openDangerModal}
                title="Delete Account"
                description="Are you sure you want to delete your account? All of your data will be permanently removed. This action cannot be undone."
                type="danger"
                actions={{ close: setOpenDangerModal, submit: deleteAccount }}
            />
        </>
    )
}