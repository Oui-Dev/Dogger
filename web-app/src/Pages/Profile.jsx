import Avatar from '../Components/Atoms/Avatar/Avatar'

export default function Profile() {
	return (
		<>
			<div className="mt-16 mx-0 sm:mt-0">
				<form action="#" method="POST">
					<div className="overflow-hidden shadow sm:rounded-md">
						<div className="bg-white px-4 py-5 sm:p-6">
                <Avatar  />	
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