import { useNavigate, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";
import toast, { Toaster } from "react-hot-toast";

const PostDetails = () => {
	const postId = useParams().id;
	const [post, setPost] = useState({});
	const { user } = useContext(UserContext);
	const [comments, setComments] = useState([]);
	const [comment, setComment] = useState("");
	const [loader, setLoader] = useState(false);
	const navigate = useNavigate();

	const fetchPost = async () => {
		try {
			const token = localStorage.getItem("token");
			const res = await axios.get(
				"https://kjblog-api.up.railway.app/api/posts/" + postId
			);
			setPost(res.data);
			// toast.success("Post fetched successfully");
		} catch (err) {
			// console.log(err);
			toast.error("Failed to fetch post");
		}
	};

	const handleDeletePost = async () => {
		try {
			const token = localStorage.getItem("token");
			const res = await axios.delete(
				"https://kjblog-api.up.railway.app/api/posts/" + postId,
				{
					headers: { Authorization: `Bearer ${token}` }, // Include the token in the request headers
				}
			);
			// console.log(res.data);
			toast.success("Post deleted successfully");
			navigate("/");
		} catch (err) {
			console.log("Error at handleDeletePost: ", err);
			toast.error("Failed to delete post");
		}
	};

	useEffect(() => {
		fetchPost();
	}, [postId]);

	const fetchPostComments = async () => {
		setLoader(true);
		try {
			const token = localStorage.getItem("token");
			const res = await axios.get(
				"https://kjblog-api.up.railway.app/api/comments/post/" + postId,
				{
					headers: { Authorization: `Bearer ${token}` }, // Include the token in the request headers
				}
			);
			setComments(res.data);
			setLoader(false);
		} catch (err) {
			setLoader(true);
			// console.log(err);
			toast.error("Failed to fetch comments");
		}
	};

	useEffect(() => {
		fetchPostComments();
	}, [postId]);

	const postComment = async (e) => {
		e.preventDefault();
		try {
			const token = localStorage.getItem("token");
			const res = await axios.post(
				"https://kjblog-api.up.railway.app/api/comments/create",
				{
					comment: comment,
					author: user.username,
					postId: postId,
					userId: user._id,
				},
				{ headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
			);

			// fetchPostComments()
			// setComment("")
			window.location.reload(true);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="relative ">
			<Navbar />
			<div className="pb-16 "></div>
			{loader ? (
				<div className="h-[80vh] flex justify-center items-center w-full">
					<Loader />
				</div>
			) : (
				<>
					<div className="h-screen w-screen bg-black fixed z-[-2]"></div>
					<img
						src="/BG.jpeg"
						alt=""
						className="h-screen w-1/2 objec fixed z-[-1] opacity-80"
					/>
					<img
						src="/BG.jpeg"
						alt=""
						className="h-screen w-1/2 fixed z-[-1] right-0 opacity-80"
					/>
					<div className=" md:mx-40 px-6 pt-8 bg-white">
						<div className="flex justify-between items-center">
							<h1 className="text-2xl font-bold text-black md:text-3xl">
								{post.title}
								{post?.category === "Historical" && (
									<p className="text-yellow-500 text-sm font-semibold ">
										#HISTORICAL
									</p>
								)}
								{post?.category === "Cultural" && (
									<p className="text-cyan-600 text-sm font-semibold ">
										#CULTURAL
									</p>
								)}
								{post?.category === "Open" && (
									<p className="text-lime-600 text-sm font-semibold ">
										#OPENCATEGORY
									</p>
								)}
							</h1>
							{(user?._id === post?.userId ||
								user?._id === "65d95b56e49e83adad786352") && (
								<div className="flex items-center justify-center space-x-2">
									<p
										className="cursor-pointer"
										onClick={() => navigate("/edit/" + postId)}
									>
										<BiEdit />
									</p>
									<p className="cursor-pointer" onClick={handleDeletePost}>
										<MdDelete />
									</p>
								</div>
							)}
						</div>
						<div className="flex items-center justify-between mt-2 md:mt-4">
							<p>@{post.username}</p>
							<div className="flex space-x-2">
								<p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
								<p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
							</div>
						</div>
						{/* Introduction Image */}
						{post.introductionImage ? (
							<img
								src={post.introductionImage||"/bg3.png"}
								className="w-full mx-auto mt-8 rounded-sm h-64 object-cover"
								alt="Introduction"
							/>
						) : (
							<img
								src="/bg3.png" // Replace with the actual path to your placeholder image
								className="w-full mx-auto mt-8 rounded-sm h-64 object-cove"
								alt="Placeholder Image"
							/>
						)}

						{(user?._id === post?.userId ||
							user?._id === "65d95b56e49e83adad786352") && (
							<>
								{/* Introduction */}
								<fieldset className="mt-8 border-2 border-gray-300 p-15 rounded-lg bg-white">
									<legend className="font-bold text-gray-700 ml-2">
										Introduction
									</legend>
									<p className="px-4 pb-2">{post.introduction}</p>
								</fieldset>
								{/* Description */}
								<fieldset className="mt-8 border-2 border-gray-300 p-15 rounded-lg bg-white">
									<legend className="font-bold text-gray-700 ml-2">
										Description
									</legend>
									<p className="px-4 pb-2">{post.desc}</p>
								</fieldset>
								{/* Blog Images */}
								<div className="flex h-56 overflow-hidden">
									{post.blogImages &&
										post.blogImages.map((image, index) => (
											<img
												key={index}
												src={image}
												className=" mt-8 object-cover"
												alt={`Blog Image ${index + 1}`}
											/>
										))}
								</div>
								{/* Body */}
								<fieldset className="mt-8 border-2 border-gray-300 p-15 rounded-lg bg-white">
									<legend className="font-bold text-gray-700 ml-2">
										Blog Body
									</legend>
									<p className="px-4 pb-2">{post.body}</p>
								</fieldset>
								{/* Sub Body Image */}
								{post.subBodyImage && (
									<img
										src={post.subBodyImage||"/bg3.png"}
										className="w-full mx-auto mt-8 h-64 rounded-sm object-cover"
										alt="Introduction"
									/>
								)}
								{/* Sub Body */}
								<fieldset className="mt-8 border-2 border-gray-300 p-15 rounded-lg bg-white">
									<legend className="font-bold text-gray-700 ml-2">
										Sub Body
									</legend>
									<p className="px-4 pb-2">{post.subBody}</p>
								</fieldset>
								{/* Conclusion */}
								<fieldset className="mt-8 border-2 border-gray-300 p-15 rounded-lg bg-white">
									<legend className="font-bold text-gray-700 ml-2">
										Conclusion
									</legend>
									<p className="px-4 pb-2">{post.conclusion}</p>
								</fieldset>
								{/* FAQs */}
								<fieldset className="mt-8 border-2 border-gray-300 p-15 rounded-lg bg-white">
									<legend className="font-bold text-gray-700 ml-2">FAQs</legend>
									<p className="px-4 pb-2">{post.faqs}</p>
								</fieldset>
								{/* Writer Details */}
								<fieldset className="mt-8 border-2 border-gray-300 p-15 rounded-lg bg-white">
									<legend className="font-bold text-gray-700 ml-2">
										Writer Details
									</legend>
									<p className="px-4 pb-2">{post.writerDetails}</p>
								</fieldset>
								{/* Sources */}
								<fieldset className="mt-8 border-2 border-gray-300 p-15 rounded-lg bg-white">
									<legend className="font-bold text-gray-700 ml-2">
										Sources
									</legend>
									<p className="px-4 pb-2">{post.sources}</p>
								</fieldset>
							</>
						)}
						{/* Comments */}
						<fieldset className="mt-8 border-2 border-gray-300 px-2 pb-2 rounded-lg bg-white ">
							<legend className="font-bold text-gray-700 ml-2">
								<h3 className="font-semibold">Comments</h3>
							</legend>
							{comments?.map((c) => (
								<Comment key={c._id} c={c} post={post} />
							))}

							{/* write a comment */}
							<div className="w-full flex flex-col mt-4 md:flex-row">
								<input
									onChange={(e) => setComment(e.target.value)}
									type="text"
									placeholder="Write a comment"
									className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0"
								/>
								<button
									onClick={postComment}
									className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0"
								>
									Add Comment
								</button>
							</div>
						</fieldset>

						<div className="pb-4"></div>
					</div>
				</>
			)}
			<Footer />
		</div>
	);
};

export default PostDetails;
