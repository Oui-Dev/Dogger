import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Avatar from '../Components/Atoms/Avatar'
import Button from '../Components/Atoms/Button'
import Modal from '../Components/Organisms/Modal'
import { retrieveCurrentUser, updateUser, deleteUser } from '../Redux/Actions/users';
import { useDispatch, useSelector } from 'react-redux';

export default function Profile() {
    const redirect = useNavigate();
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [formErrorsBag, setFormErrorsBag] = useState(null);
    const [openDangerModal, setOpenDangerModal] = useState(false);
    const [initials, setInitials] = useState('');

    useEffect(() => {
        dispatch(retrieveCurrentUser())
    }, []);

    useEffect(() => {
        if(user) setInitials(user.firstname[0] + user.lastname[0]);
    }, [user]);

    const deleteAccount = () => {
        dispatch(deleteUser())
            .then((res) => {
                toast.success(res.message);
                redirect('/login');
            })
            .catch((err) => toast.error(err.response.data.message));
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
                                }}> Delete Account </Button>
                            <button className="btn-primary" type="submit">Save</button>
                        </div>
                    </div>
                </form>
            </div>
            <Modal
                open={openDangerModal}
                title="Delete Account"
                description="Are you sure you want to delete your account? All of your data will be permanently removed. This action cannot be undone."
                type="danger"
                actions={{ close: setOpenDangerModal, submit: deleteAccount }} />
        </>
    )
}