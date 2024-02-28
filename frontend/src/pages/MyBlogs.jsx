import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import HomePosts from "../components/HomePosts";
import Loader from "../components/Loader";

const MyBlogs = () => {
	const { search } = useLocation();
	// console.log(search)
	const [posts, setPosts] = useState([]);
	const [noResults, setNoResults] = useState(false);
	const [loader, setLoader] = useState(false);
	const { user } = useContext(UserContext);
	// console.log(user)

	const fetchPosts = async () => {
		setLoader(true);
		try {
			const res = await axios.get(
				"https://kjblog-api.up.railway.app/api/posts/user/" + user._id
			);
			// console.log(res.data)
			setPosts(res.data);
			if (res.data.length === 0) {
				setNoResults(true);
			} else {
				setNoResults(false);
			}
			setLoader(false);
		} catch (err) {
			console.log(err);
			setLoader(true);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, [search]);

	return (
		<div>
			<Navbar />
			<div className="pb-16"></div>
			<div className="px-8 md:px-40 min-h-[80vh]">
				{loader ? (
					<div className="h-[40vh] flex justify-center items-center">
						<Loader />
					</div>
				) : !noResults ? (
					posts.map((post) => (
						<>
							<Link
								key={post._id}
								to={user ? `/posts/post/${post._id}` : "/login"}
							>
								<HomePosts post={post} />
							</Link>
						</>
					))
				) : (
					<h3 className="text-center font-bold mt-16">No posts available</h3>
				)}
			</div>
			<div className="w-screen h-screen bg-black fixed top-0 left-0 z-[-1] opacity-20"></div>
			<img
				src="/bg2.jpeg"
				alt="background"
				className="w-screen h-full  fixed top-0 left-0 z-[-2]  opacity-100 "
			/>
			<Footer />
		</div>
	);
};

export default MyBlogs;
