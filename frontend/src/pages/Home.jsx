import axios from "axios";
import Footer from "../components/Footer";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { UserContext } from "../context/UserContext";
import toast from "react-hot-toast";

const Home = () => {
	const { search } = useLocation();
	const [posts, setPosts] = useState([]);
	const [noResults, setNoResults] = useState(false);
	const [loader, setLoader] = useState(false);
	const { user } = useContext(UserContext);
	const [countdown, setCountdown] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	const fetchPosts = async () => {
		setLoader(true);
		try {
			const token = localStorage.getItem("token");
			const res = await axios.get(
				"https://kjblog-api.up.railway.app/api/posts/" + search,
				{
					headers: { Authorization: `Bearer ${token}` }, // Include the token in the request headers
				}
			);
			// console.log(res.data)
			setPosts(res.data);
			if (res.data.length === 0) {
				setNoResults(true);
				toast.error("No posts available");
			} else {
				setNoResults(false);
			}
			setLoader(false);
		} catch (err) {
			console.log(err);
			setLoader(true);
			toast.error("Error fetching posts");
		}
	};

	const updateCountdown = () => {
		const currentDate = new Date();
		const targetDate = new Date("2024-03-02T00:35:00"); // Modify the target date and time here
		const timeRemaining = targetDate - currentDate;
		let daysRemaining = 0;
		let hoursRemaining = 0;
		let minutesRemaining = 0;
		let secondsRemaining = 0;
		if (timeRemaining > 0) {
			daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
			hoursRemaining = Math.floor(
				(timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			minutesRemaining = Math.floor(
				(timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
			);
			secondsRemaining = Math.floor((timeRemaining % (1000 * 60)) / 1000);
		}

		setCountdown({
			days: daysRemaining,
			hours: hoursRemaining,
			minutes: minutesRemaining,
			seconds: secondsRemaining,
		});
	};

	useEffect(() => {
		fetchPosts();
		updateCountdown(); // Initial countdown update

		const interval = setInterval(updateCountdown, 1000); // Update countdown every second

		return () => {
			clearInterval(interval); // Cleanup interval on component unmount
		};
	}, [search]);

	return (
		<>
			<Navbar />
			<div className="pb-16 "></div>
			<div className="flex ">
				{/* Posts */}
				<div className="px-8 min-h-[80vh] w-4/6">
					{loader ? (
						<>
							<div className="h-screen flex justify-center items-center">
								<Loader />
							</div>
						</>
					) : !noResults ? (
						posts.map((post) => (
							<Link
								key={post._id}
								to={user ? `/posts/post/${post._id}` : "/login"}
							>
								<HomePosts post={post} />
							</Link>
						))
					) : (
						<h3 className="text-center font-bold mt-16">No posts available</h3>
					)}
				</div>
				{/* Updates */}
				<div className="bg-inherit h-auto w-2/6 pt-8 pr-8 pl-4 ">
					{/* Time Remaining */}
					<div className="p-3 rounded-lg bg-white/10 shadow-2xl ring-2 ring-black/5 backdrop-blur-3xl">
						<p className="text-white text-center font-semibold text-xl pb-2 shadow-2xl">
							Event Countdown
						</p>
						<div className="flex gap-2 justify-center items-center  rounded-lg">
							{/* Days */}
							<div className="text-white text-2xl font-semibold w-14 shadow-md shadow-neutral-400">
								<div className="bg-black/20 rounded-md p-1 flex flex-col items-center justify-center">
									{countdown.days}
									<span className="text-xs text-gray-400 ">DAY</span>
								</div>
							</div>
							{/* Hours */}
							<div className="text-white text-2xl font-semibold w-14 shadow-md shadow-neutral-400">
								<div className="bg-black/20 rounded-md p-1 flex flex-col items-center justify-center">
									{countdown.hours}
									<span className="text-xs text-gray-400 ">HOUR</span>
								</div>
							</div>
							{/* Minutes */}
							<div className="text-white text-2xl font-semibold w-14 shadow-md shadow-neutral-400">
								<div className="bg-black/20 rounded-md p-1 flex flex-col items-center justify-center">
									{countdown.minutes}
									<span className="text-xs text-gray-400 ">MIN</span>
								</div>
							</div>
							{/* Seconds */}
							<div className="text-white text-2xl font-semibold w-14 shadow-md shadow-neutral-400">
								<div className="bg-black/20 rounded-md p-1 flex flex-col items-center justify-center">
									{countdown.seconds}
									<span className="text-xs text-gray-400 ">SEC</span>
								</div>
							</div>
						</div>
					</div>
					{/* Updates section */}
					<div className="mt-8 p-3 rounded-lg bg-white/10 shadow-2xl ring-2 ring-black/5 backdrop-blur-3xl">
						<p className="text-white text-center font-semibold text-xl pb-2 shadow-2xl">
							UPDATES
						</p>
						<div className="flex flex-col gap-4 font-poppins text-sm">
							<div className="flex justify-between items-center">
								<p className="text-white font-medium">- Event has ended</p>
							</div>
							<div className="flex justify-between items-center">
								<p className="text-white font-medium">- Thanking everyone for their participation</p>
							</div>
							<div className="flex justify-between items-center">
								<p className="text-white font-medium">- Posts made after 12:35 AM will not be considered for evaluation</p>
							</div>
							<div className="flex justify-between items-center">
								<p className="text-white font-medium">- Results will be announced soon after evaluation</p>
							</div>
						</div>
					</div>
					{/* Categories Description  */}
					<div className="mt-8 p-3 rounded-lg bg-white/10 shadow-2xl ring-2 ring-black/5 backdrop-blur-3xl">
						<p className="text-white text-center font-semibold text-xl pb-2 shadow-2xl">
							Know the Categories
						</p>
						<div className="flex flex-col gap-4 font-poppins">
							<Link to="/category/historical">
								<div className="flex justify-center items-center relative bg-black/50 hover:bg-gradient-to-b hover:from-transparent hover:to-slate-950/50 rounded-lg h-30 shadow-md shadow-neutral-400">
									<img
										src="/history.jpeg"
										alt=""
										className="rounded-lg h-28 w-full object-cover"
									/>
									<div className="h-full w-full absolute flex justify-center items-center bg-black/50 hover:bg-gradient-to-b hover:from-transparent hover:to-slate-950/50 rounded-lg h-30 transition-300">
										<p className="text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 to-red-500 text-2xl font-semibold drop-shadow-2xl">
											HISTORICAL
										</p>
									</div>
								</div>
							</Link>
							<Link to="/category/cultural">
								<div className="flex justify-center items-center relative bg-black/50 hover:bg-gradient-to-b hover:from-transparent hover:to-slate-950/50 rounded-lg h-30 transition-300 shadow-md shadow-neutral-400">
									<img
										src="/cultural.jpg"
										alt=""
										className="rounded-lg h-28 w-full object-cover"
									/>
									<div className="h-full w-full absolute flex justify-center items-center bg-black/40 hover:bg-black/50 rounded-lg h-30 transition-300">
										<p className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-500 text-2xl font-semibold drop-shadow-2xl">
											CULTURAL
										</p>
									</div>
								</div>
							</Link>
							<Link to="/category/open">
								<div className="flex justify-center items-center relative bg-black/50 hover:bg-gradient-to-b hover:from-transparent hover:to-slate-950/50 rounded-lg h-30 transition-300 shadow-md shadow-neutral-400">
									<img
										src="/open.jpg"
										alt=""
										className="rounded-lg h-28 w-full object-cover"
									/>
									<div className="h-full w-full absolute flex justify-center items-center bg-black/40 hover:bg-black/50 rounded-lg h-30 transition-300">
										<p className="text-transparent bg-clip-text bg-gradient-to-br from-lime-400 to-green-500 text-2xl font-bold drop-shadow-2xl text-center">
											OPEN CATEGORY
										</p>
									</div>
								</div>
							</Link>
						</div>
					</div>
				</div>
			</div>

			<div className="w-screen h-screen bg-black fixed top-0 left-0 z-[-1] opacity-20"></div>
			<img
				src="/bg2.jpeg"
				alt="background"
				className="w-screen h-full  fixed top-0 left-0 z-[-2]  opacity-100 "
			/>
			<Footer />
		</>
	);
};

export default Home;
