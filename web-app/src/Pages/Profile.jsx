import Avatar from '../Components/Atoms/Avatar/Avatar'

export default function Profile() {
	return (
		<>
			<div className="mt-16 mx-0 sm:mt-0">
				<form action="#" method="POST">
					<div className="overflow-hidden shadow sm:rounded-md">
						<div className="bg-white px-4 py-5 sm:p-6">
							<Avatar initials="KB" />
							<div className="grid grid-cols-6 gap-6">
								<div className="col-span-6 sm:col-span-3">
									<label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
										First name
									</label>
									<input
										type="text"
										name="firstName"
										id="firstName"
										className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
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
										className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
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
										className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
									/>
								</div>

								<div className="col-span-6 sm:col-span-6 lg:col-span-2">
									<label htmlFor="password" className="block text-sm font-medium text-gray-700">
										Current Password
									</label>
									<input
										type="password"
										name="password"
										id="password"
										className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
									/>
								</div>

								<div className="col-span-6 sm:col-span-3 lg:col-span-2">
									<label htmlFor="passwordNew" className="block text-sm font-medium text-gray-700">
										New Password
									</label>
									<input
										type="password"
										name="passwordNew"
										id="passwordNew"
										className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
									/>
								</div>

								<div className="col-span-6 sm:col-span-3 lg:col-span-2">
									<label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
										Confirm New Password
									</label>
									<input
										type="password"
										name="confirmPassword"
										id="confirmPassword"
										className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
									/>
								</div>
							</div>
						</div>
						<div className="bg-gray-50 px-4 py-3 flex justify-between sm:px-6">
							<button
								type="submit"
								className="btn-primary warning"
							>Delete account</button>
							<button
								type="submit"
								className="btn-primary"
							>Save</button>
						</div>
					</div>
				</form>
			</div>
		</>
	)
}