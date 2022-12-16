import Avatar from '../Components/Atoms/Avatar'
import Button from '../Components/Atoms/Button'
import Modal from '../Components/Organism/Modal'

export default function Profile() {
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
							<Modal title="Warning !" description="This action is permanent and irreversible" type="danger" openButtonMessage="Delete Account" />
							<Button type={"primary"} > Save </Button>
						</div>
					</div>
				</form>
			</div>
		</>
	)
}