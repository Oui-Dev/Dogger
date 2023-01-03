import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Avatar from '../Components/Atoms/Avatar'
import Button from '../Components/Atoms/Button'
import Modal from '../Components/Organisms/Modal'

export default function Profile() {
    const BASE_URL = process.env.REACT_APP_API_URL;
    // in the future, we will get the token from redux
    const config = {
        headers: { Authorization: process.env.REACT_APP_TOKEN }
    };

    const [openDangerModal, setOpenDangerModal] = useState(false);

    const deleteAccount = () => {
        console.log('delete account');
    }

    const submitForm = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = {};
        if (!!form.get('firstName')) Object.assign(data, { firstName: form.get('firstName') });
        if (!!form.get('lastName')) Object.assign(data, { lastName: form.get('lastName') });
        if (!!form.get('email')) Object.assign(data, { email: form.get('email') });
        if (!!form.get('old_password')) Object.assign(data, { old_password: form.get('old_password') });
        if (!!form.get('password')) Object.assign(data, { password: form.get('password') });
        if (!!form.get('password_confirmation')) Object.assign(data, { password_confirmation: form.get('password_confirmation') })

        if (Object.keys(data).length > 0) {
            axios.put(BASE_URL + "/users/edit", data, config)
            .then((res) => {
                console.log(res);
                if (res.status === 200) toast.success('Profile updated !');
            })
            .catch((err) => {
                // TODO: form errors handling
                console.log(err.response.data)
            });
        }
    }

    return (
        <>
            <div className="mt-16 mx-0 sm:mt-0">
                <form onSubmit={submitForm}>
                    <div className="overflow-hidden shadow sm:rounded-md">
                        <div className="bg-white px-4 py-5 sm:p-6">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="inline-grid col-span-6 sm:col-span-6 justify-items-center sm:justify-items-start">
                                    <Avatar initials='KB' />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                        First name
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        autoComplete='given-name'
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                        Last name
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        autoComplete='family-name'
                                    />
                                </div>

                                <div className="col-span-6">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email address
                                    </label>
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        autoComplete='email'
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                    <label htmlFor="old_password" className="block text-sm font-medium text-gray-700">
                                        Current Password
                                    </label>
                                    <input
                                        type="password"
                                        name="old_password"
                                        id="old_password"
                                        autoComplete='current-password'
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        autoComplete='new-password'
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password_confirmation"
                                        id="password_confirmation"
                                        autoComplete='new-password'
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 px-4 py-3 flex justify-between sm:px-6">
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