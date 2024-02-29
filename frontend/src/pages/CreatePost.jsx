import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { storage } from "../components/firebase";
import toast, { Toaster } from "react-hot-toast";

const CreatePost = () => {
	const { user } = useContext(UserContext);
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [introductionImage, setIntroductionImage] = useState("");
	const [blogImages, setBlogImages] = useState([]);
	const [subBodyImage, setSubBodyImage] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [introduction, setIntroduction] = useState("");
	const [body, setBody] = useState("");
	const [subBody, setSubBody] = useState("");
	const [conclusion, setConclusion] = useState("");
	const [faqs, setFaqs] = useState("");
	const [writerDetails, setWriterDetails] = useState("");
	const [sources, setSources] = useState("");
	const [hasPosted, setHasPosted] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserPosts = async () => {
			try {
				const res = await axios.get(
					"https://kjblog-api.up.railway.app/api/posts/user/" + user._id
				);
				if (res.data.length > 0) {
					setHasPosted(true);
				}
			} catch (err) {
				console.log(err);
			}
		};

		fetchUserPosts();
	}, []);

	if (hasPosted && user?._id !== "65d95b56e49e83adad786352") {
		toast.error("You have already posted a blog");
		navigate("/myblogs/:id");
	}

	// Uploading image and url generration function into firebase
	const uploadImage = (img) => {
		return toast.promise(
			new Promise((resolve, reject) => {
				if (img == null) {
					reject("No image provided");
					return;
				}

				const uploadTask = storage.ref(`images/${img.name}`).put(img);
				uploadTask.on(
					"state_changed",
					(snapshot) => {},
					(error) => {
						reject(error.message);
					},
					() => {
						uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
							resolve(downloadURL);
						});
					}
				);
			}),
			{
				loading: "Uploading image...",
				success: "Image uploaded successfully",
				error: "Error uploading image",
			}
		);
	};

	// Function to handle introduction image change
	const handleIntroductionImageChange = async (e) => {
		const file = e.target.files[0];
		try {
			const url = await uploadImage(file);
			setIntroductionImage(url);
			toast.success("Introduction image uploaded successfully");
		} catch (error) {
			toast.error("Error uploading introduction image");
		}
	};

	// Function to handle blog image change
	const handleBlogImageChange = async (e) => {
		const files = e.target.files;
		const newBlogImages = [];
		if (blogImages.length + files.length > 2) {
			// console.log("Cannot add more than 2 images");
			toast.error("Cannot add more than 2 images");
			return;
		}
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			try {
				const url = await uploadImage(file);
				newBlogImages.push(url);
				toast.success(`Blog image ${i + 1} uploaded successfully`);
			} catch (error) {
				// console.log("Blog image upload failed:", error);
				toast.error(`Error uploading blog image ${i + 1}`);
			}
		}
		setBlogImages(newBlogImages);
	};

	// Function to handle sub-body image change
	const handleSubBodyImageChange = async (e) => {
		const file = e.target.files[0];
		try {
			const url = await uploadImage(file);
			setSubBodyImage(url);
			toast.success("Sub-body image uploaded successfully");
		} catch (error) {
			// console.log("Sub-body image upload failed:", error);
			toast.error("Error uploading sub-body image");
		}
	};

	const handleCreate = async (e) => {
		e.preventDefault();

		const totalWordCount = [
			title,
			desc,
			introduction,
			body,
			subBody,
			conclusion,
			faqs,
			writerDetails,
			sources,
		]
			.filter((field) => typeof field === "string")
			.reduce((acc, field) => acc + field.split(/\s+/).length, 0);
		if (totalWordCount > 3000) {
			// console.log(
			// 	"Total word count exceeds 3000. Please reduce the word count."
			// );
			toast.error(
				"Total word count exceeds 3000. Please reduce the word count."
			);
			return;
		}

		const token = localStorage.getItem("token"); // Retrieve the token from local storage

		const post = {
			title,
			desc,
			username: user.username,
			userId: user._id,
			category: selectedCategory,
			introduction,
			body,
			subBody,
			conclusion,
			faqs,
			writerDetails,
			sources,
			introductionImage,
			blogImages,
			subBodyImage,
		};

		try {
			const res = await axios.post(
				"https://kjblog-api.up.railway.app/api/posts/create",
				post,
				{
					headers: { Authorization: `Bearer ${token}` }, // Include the token in the request headers
				}
			);
			navigate("/posts/post/" + res.data._id);
			toast.success("Post created successfully");
		} catch (err) {
			console.error("Error at CreatePost.jsx: ", err);
			toast.error("Error creating post");
		}
	};

	const handleCategorySelect = (cat) => {
		setSelectedCategory(cat);
		console.log(selectedCategory);
	};

	return (
		<div>
			<Navbar />
			<div className="pb-16 "></div>
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

			<div className="md:mx-40 px-6 pt-8 bg-white">
				<h1 className="font-bold md:text-2xl text-xl ">Create a post</h1>
				<form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
					{/* Select a Category */}
					<fieldset className="mt-8 border-2 border-gray-300 px-2 pb-2 rounded-lg bg-white">
						<legend className="font-bold text-gray-700 ml-2">
							Select a Category
						</legend>
						<div className="grid grid-cols-3 gap-4 font-poppins">
							<div
								className={` flex justify-center items-center relative bg-black/40 hover:bg-black/60 rounded-lg h-30  ${
									selectedCategory === "Historical"
										? "border-4 border-yellow-500 "
										: "border-4 border-white"
								}`}
								onClick={() => handleCategorySelect("Historical")}
							>
								<img
									src="/history.jpeg"
									alt=""
									className="rounded-lg h-full w-full object-cover"
								/>
								<div
									className={`h-full w-full absolute flex justify-center items-center bg-black/40 hover:bg-black/50 rounded-lg h-30 transition-300" ${
										selectedCategory === "Historical"
											? "text-yellow-400 shadow-xl"
											: "text-white"
									}`}
								>
									<p className=" text-xl font-semibold">HISTORICAL</p>
								</div>
							</div>
							<div
								className={`flex justify-center items-center relative bg-black/40 hover:bg-black/60 rounded-lg h-30 ${
									selectedCategory === "Cultural"
										? "border-4 border-cyan-500 "
										: "border-4 border-white"
								}`}
								onClick={() => handleCategorySelect("Cultural")}
							>
								<img
									src="/cultural.jpg"
									alt=""
									className="rounded-lg h-full w-full  object-cover "
								/>
								<div
									className={`h-full w-full absolute flex justify-center items-center bg-black/40 hover:bg-black/50 rounded-lg h-30 transition-300" ${
										selectedCategory === "Cultural"
											? "text-cyan-400 shadow-xl"
											: "text-white"
									}`}
								>
									<p className=" text-xl font-semibold">CULTURAL</p>
								</div>
							</div>
							<div
								className={`flex justify-center items-center relative bg-black/40 hover:bg-black/40 rounded-lg h-32  ${
									selectedCategory === "Open"
										? "border-4 border-lime-400 "
										: "border-4 border-white"
								}`}
								onClick={() => handleCategorySelect("Open")}
							>
								<img
									src="/open.jpg"
									alt=""
									className="rounded-lg h-full w-full object-cover "
								/>
								<div
									className={`h-full w-full absolute flex flex-col justify-center items-center bg-black/40 hover:bg-black/50 rounded-lg h-30 transition-300" ${
										selectedCategory === "Open"
											? "text-lime-400 shadow-xl"
											: "text-white"
									}`}
								>
									<p className=" text-xl font-semibold">OPEN</p>
									<p className=" text-xl font-semibold">CATEGORY</p>
								</div>
							</div>
						</div>
					</fieldset>

					{/* Title */}
					<fieldset className="mt-8 border-2 border-gray-300 p-15 rounded-lg bg-white">
						<legend className="font-bold text-gray-700 ml-2">Title</legend>
						<input
							onChange={(e) => setTitle(e.target.value)}
							type="text"
							placeholder="Enter title"
							className="px-4 pb-2 outline-none w-full"
						/>
					</fieldset>
					{/* Description */}
					<fieldset className="mt-8 border-2 border-gray-300 p-15 rounded-lg bg-white">
						<legend className="font-bold text-gray-700 ml-2">
							Description
						</legend>
						<textarea
							onChange={(e) => setDesc(e.target.value)}
							type="text"
							placeholder="Enter description"
							className="px-4 pb-2 outline-none  w-full h-40"
						/>
					</fieldset>

					{/* title image */}
					<fieldset className="mt-8 border-2 border-gray-300 px-2 pb-2 rounded-lg bg-white">
						<legend className="font-bold text-gray-700 ml-2">
							Title Image
						</legend>

						{!introductionImage ? (
							<div class="flex items-center justify-center w-full">
								<label
									for="dropzone-file"
									class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
								>
									<div class="flex flex-col items-center justify-center pt-5 pb-6">
										<svg
											class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 20 16"
										>
											<path
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
											/>
										</svg>
										<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
											<span class="font-semibold">Click to upload</span> or drag
											and drop
										</p>
										<p class="text-xs text-gray-500 dark:text-gray-400">
											SVG, PNG, JPG or GIF (MAX. 800x400px)
										</p>
									</div>
									<input
										type="file"
										id="dropzone-file"
										onChange={handleIntroductionImageChange}
										className="hidden"
									/>
								</label>
							</div>
						) : (
							<img
								src={introductionImage}
								alt="Introduction"
								className="w-full"
							/>
						)}
						<p
							className="bg-red-500 px-2 py-1 text-white rounded-lg font-medium text-center w-fit mx-auto mt-2 flex items-center gap-2 cursor-pointer
						"
							onClick={(e) => setIntroductionImage("")}
						>
							{" "}
							<IoCloseCircleSharp />
							Clear Selection
						</p>
					</fieldset>

					{/* Introduction */}
					<fieldset className="mt-8 border-2 border-gray-300 p-15 rounded-lg bg-white">
						<legend className="font-bold text-gray-700 ml-2">
							Introduction
						</legend>
						<textarea
							onChange={(e) => setIntroduction(e.target.value)}
							className="px-4 py-2 outline-none w-full h-40"
							placeholder="Enter introduction"
						/>
					</fieldset>

					{/* Input field for the blog image same as the title image*/}
					<fieldset className="mt-8 border-2 border-gray-300 px-2 pb-2  rounded-lg bg-white">
						<legend className="font-bold text-gray-700 ml-2">
							Blog Body Images
						</legend>
						{blogImages.length == 0 ? (
							<div class="flex items-center justify-center w-full">
								<label
									for="dropzone-file2"
									class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
								>
									<div class="flex flex-col items-center justify-center pt-5 pb-6">
										<svg
											class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 20 16"
										>
											<path
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
											/>
										</svg>
										<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
											<span class="font-semibold">Click to upload</span> or drag
											and drop
										</p>
										<p class="text-xs text-gray-500 dark:text-gray-400">
											SVG, PNG, JPG or GIF (MAX. 800x400px)
										</p>
									</div>
									<input
										type="file"
										id="dropzone-file2"
										multiple
										onChange={handleBlogImageChange}
										className="hidden"
									/>
								</label>
							</div>
						) : (
							<>
								{blogImages.map((image, index) => (
									<div key={index}>
										<img src={image} alt={"Blog Image " + (index + 1)} />
									</div>
								))}
							</>
						)}
						<p
							className="bg-red-500 px-2 py-1 text-white rounded-lg font-medium text-center w-fit mx-auto mt-2 flex items-center gap-2 cursor-pointer
						"
							onClick={(e) => setBlogImages([])}
						>
							{" "}
							<IoCloseCircleSharp />
							Clear Selection
						</p>
					</fieldset>

					{/* Body */}
					<fieldset className="mt-8 border-2 border-gray-300 p-15 rounded-lg bg-white">
						<legend className="font-bold text-gray-700 ml-2">Body</legend>
						<textarea
							onChange={(e) => setBody(e.target.value)}
							rows={15}
							cols={30}
							className="px-4 py-2 outline-none w-full h-40"
							placeholder="Enter body"
						/>
					</fieldset>

					{/* Sub-Body */}
					<fieldset className="mt-8 border-2 border-gray-300 px-2 pb-2  rounded-lg bg-white">
						<legend className="font-bold text-gray-700 ml-2">Sub-Body</legend>
						{!subBodyImage ? (
							<div class="flex items-center justify-center w-full">
								<label
									for="dropzone-file3"
									class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
								>
									<div class="flex flex-col items-center justify-center pt-5 pb-6">
										<svg
											class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 20 16"
										>
											<path
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
											/>
										</svg>
										<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
											<span class="font-semibold">Click to upload</span> or drag
											and drop
										</p>
										<p class="text-xs text-gray-500 dark:text-gray-400">
											SVG, PNG, JPG or GIF (MAX. 800x400px)
										</p>
									</div>
									<input
										type="file"
										id="dropzone-file3"
										onChange={handleSubBodyImageChange}
										className="hidden"
									/>
								</label>
							</div>
						) : (
							<>{subBodyImage && <img src={subBodyImage} alt="Sub Body" />}</>
						)}
						<p
							className="bg-red-500 px-2 py-1 text-white rounded-lg font-medium text-center w-fit mx-auto mt-2 flex items-center gap-2 cursor-pointer
						"
							onClick={(e) => setSubBodyImage("")}
						>
							{" "}
							<IoCloseCircleSharp />
							Clear Selection
						</p>

						<textarea
							onChange={(e) => setSubBody(e.target.value)}
							rows={10}
							cols={30}
							className="px-4 py-2 outline-none w-full h-40"
							placeholder="Enter sub body"
						/>
					</fieldset>

					{/* Conclusion */}
					<fieldset className="mt-8 border-2 border-gray-300 p-15 rounded-lg bg-white">
						<legend className="font-bold text-gray-700 ml-2">Conclusion</legend>
						<textarea
							onChange={(e) => setConclusion(e.target.value)}
							rows={5}
							cols={30}
							className="px-4 py-2 outline-none w-full h-40"
							placeholder="Enter conclusion"
						/>
					</fieldset>

					{/* FAQs */}
					<fieldset className="mt-8 border-2 border-gray-300 p-15 rounded-lg bg-white">
						<legend className="font-bold text-gray-700 ml-2">FAQs</legend>
						<textarea
							onChange={(e) => setFaqs(e.target.value)}
							rows={5}
							cols={30}
							className="px-4 py-2 outline-none w-full h-40"
							placeholder="Enter FAQs"
						/>
					</fieldset>

					{/* Writer Details */}
					<fieldset className="mt-8 border-2 border-gray-300 p-15 rounded-lg bg-white">
						<legend className="font-bold text-gray-700 ml-2">
							Writer Details
						</legend>
						<textarea
							onChange={(e) => setWriterDetails(e.target.value)}
							rows={5}
							cols={30}
							className="px-4 py-2 outline-none w-full h-40"
							placeholder="Enter writer details"
						/>
					</fieldset>

					{/* Sources */}
					<fieldset className="mt-8 border-2 border-gray-300 p-15 rounded-lg bg-white">
						<legend className="font-bold text-gray-700 ml-2">Sources</legend>
						<textarea
							onChange={(e) => setSources(e.target.value)}
							rows={5}
							cols={30}
							className="px-4 py-2 outline-none w-full h-40"
							placeholder="Enter sources"
						/>
					</fieldset>

					<button
						onClick={handleCreate}
						className="bg-black rounded-md w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg"
					>
						Create
					</button>
					<div className=""></div>
				</form>
			</div>
			<Footer />
		</div>
	);
};

export default CreatePost;
