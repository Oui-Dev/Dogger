import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import Avatar from '../Components/Atoms/Avatar'
import Button from '../Components/Atoms/Button'
import Modal from '../Components/Organism/Modal'

export default function Profile() {
	const firstName = useRef(null);
	const lastName = useRef(null);
	const email = useRef(null);
	const oldPassword = useRef(null);
	const password = useRef(null);
	const passwordConfirm = useRef(null);
	const [openDangerModal, setOpenDangerModal] = useState(false);
	const BASE_URL = process.env.REACT_APP_API_URL;
// 	const [data, setData] = useState([]);

// 	const config = {
// 		headers: { Authorization: process.env.REACT_APP_API_TOKEN }
// 	};

// 	useEffect(() => {
// 		axios.get(BASE_URL + "/users/current", config).then((res) => { // 500 error
// 				if(res.status === 200 && res.data?.projects !== data) setData(res.data.projects);
// 		});
// }, []);

	const deleteAccount = () => {
		console.log('delete account');
	}

	const updateProfile = () => {
		console.log('update profile');
	}

	return (
		<>
			<div className="mt-16 mx-0 sm:mt-0">
				<form action="#" method="POST">
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
										ref={firstName}
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
										ref={lastName}
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
										ref={email}
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
										ref={oldPassword}
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
										ref={password}
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
										ref={passwordConfirm}
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
							<Button
								type={"primary"}
								onClick={(e) => {
									updateProfile()
									e.preventDefault()
								}}
							> Save </Button>
						</div>
					</div>
				</form>
			</div>
			<Modal
						open={openDangerModal}
            title="Delete Account"
            description="Are you sure you want to delete your account? All of your data will be permanently removed. This action cannot be undone."
            type="danger"
            actions={{ close: setOpenDangerModal, submit: deleteAccount}} />
		</>
	)
}