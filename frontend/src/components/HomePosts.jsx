/* eslint-disable react/prop-types */

const HomePosts = ({ post }) => {
	return (
		<div className="w-full flex mt-8 space-x-4  p-3 rounded-lg bg-white/10 shadow-2xl ring-2 ring-black/5 backdrop-blur-3xl">
			{/* left */}
			<div className="w-[35%] h-[150px] flex justify-center items-center ">
				<img
					src={post.introductionImage||"/bg3.png"}
					alt=""
					className="h-full w-full object-cover rounded-lg"
				/>
			</div>
			{/* right */}
			<div className="flex flex-col w-[65%]">
				<h1 className="text-xl font-bold  md:text-xl text-neutral-100">
					{post.title}
				</h1>
				{post?.category === "Historical" && (
					<p className="text-yellow-500 text-xs font-semibold ">#HISTORICAL</p>
				)}
				{post?.category === "Cultural" && (
					<p className="text-cyan-600 text-xs font-semibold ">#CULTURAL</p>
				)}
				{post?.category === "Open" && (
					<p className="text-lime-600 text-xs font-semibold ">#OPENCATEGORY</p>
				)}
				<div className="flex mb-2 text-sm font-semibold text-neutral-300 items-center justify-between md:mb-4">
					<p>@{post.username}</p>
					<div className="flex space-x-2 text-sm">
						<p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
						<p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
					</div>
				</div>
				<p className="text-xs md:text-base text-neutral-200 overflow-clip ">
					{post.desc.slice(0, 45) + " ...Read more"}
				</p>
			</div>
		</div>
	);
};

export default HomePosts;
