/* eslint-disable react/prop-types */

const ProfilePosts = ({ p }) => {
	// console.log(p)
	return (
		<div className="w-full mt-2 pr-2">
			{/* left */}
			<div className=" h-56 pr-4  flex justify-center items-center">
				<img
					src={p.introductionImage||"/bg3.png"}
					alt=""
					className="h-full w-full object-cover"
				/>
			</div>
			{/* right */}
			<div className="flex flex-col pr-4">
				<h1 className="text-xl font-bold md:mb-2 mb-1  md:text-2xl">
					{p.title}
				</h1>
				{p?.category === "Historical" && (
					<p className="text-yellow-500 text-xs font-semibold ">#HISTORICAL</p>
				)}
				{p?.category === "Cultural" && (
					<p className="text-cyan-600 text-xs font-semibold ">#CULTURAL</p>
				)}
				{p?.category === "Open" && (
					<p className="text-lime-600 text-xs font-semibold ">#OPENCATEGORY</p>
				)}
				<div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
					<p>@{p.username}</p>
					<div className="flex space-x-2">
						<p>{new Date(p.updatedAt).toString().slice(0, 15)}</p>
						<p>{new Date(p.updatedAt).toString().slice(16, 24)}</p>
					</div>
				</div>
				<p className="text-sm pb-8">
					{p.desc.slice(0, 200) + " ...Read more"}
				</p>
			</div>
		</div>
	);
};

export default ProfilePosts;
