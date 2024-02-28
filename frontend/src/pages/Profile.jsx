import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfilePosts from "../components/ProfilePosts";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
	const param = useParams().id;
	const { user } = useContext(UserContext);
	const navigate = useNavigate();
	const [posts, setPosts] = useState([]);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [isTeam, setIsTeam] = useState(false);
	const [name, setName] = useState("");
	const [name1, setName1] = useState("");
	const [name2, setName2] = useState("");
	const [phone, setPhone] = useState("");
	const [regno, setRegno] = useState("");
	const [regno1, setRegno1] = useState("");
	const [regno2, setRegno2] = useState("");
	const [error, setError] = useState(false);
	// console.log(user)

	const fetchUserPosts = async () => {
		try {
			const res = await axios.get(
				"https://kjblog-api.up.railway.app/api/posts/user/" + user._id
			);
			// console.log(res.data)
			setPosts(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	const fetchUser = async () => {
		try {
			setUsername(user.username);
			setEmail(user.email);
			setIsTeam(user.isTeam);
			setName(user.name);
			setName1(user.name1);
			setName2(user.name2);
			setPhone(user.phone);
			setRegno(user.regno);
			setRegno1(user.regno1);
			setRegno2(user.regno2);
		} catch (error) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchUser();
	}, [param]);

	// useEffect(() => {
	// 	fetchProfile();
	// }, [param]);

	useEffect(() => {
		fetchUserPosts();
	}, [param]);

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
			<div className="min-h-[80vh] md:mx-28 px-6 pt-8 flex md:flex-row flex-col-reverse md:items-start items-start bg-white">
				{/* Left */}
				<div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
					<h1 className="text-xl font-bold mb-4">Your posts:</h1>
					{posts?.map((p) => (
						<ProfilePosts key={p._id} p={p} />
					))}
				</div>
				{/* Right */}
				<div className="  flex justify-start md:justify-end items-start w-[30%] md:items-end pb-4">
					<div className="flex flex-col space-y-2 items-start rounded-lg bg-blue-500/80 shadow-2xl ring-2 ring-blue-600/100 backdrop-blur-3xl py-2 text-white">
						<div className="mx-auto ">
							<img
								src="/userAvatar.jpg"
								className="rounded-full h-14 w-14 "
								alt=""
							/>
						</div>
						<p className="text-sm border-t-2 border-b-2 py-2 px-2 w-full">
							<strong>Username:</strong>{" "}
							<span className="font-medium">@ {username}</span>
						</p>
						<p className="text-sm border-b-2 pb-2 px-2 w-full">
							<strong>Email:</strong> {email}
						</p>
						{isTeam ? (
							<>
								<p className="text-sm border-b-2 pb-2 px-2 w-full">
									<strong>Name 1:</strong> {name1}
								</p>
								<p className="text-sm border-b-2 pb-2 px-2 w-full">
									<strong>Name 2:</strong> {name2}
								</p>
								<p className="text-sm border-b-2 pb-2 px-2 w-full">
									<strong>Registration Number 1:</strong> {regno1}
								</p>
								<p className="text-sm border-b-2 pb-2 px-2 w-full">
									<strong>Registration Number 2:</strong> {regno2}
								</p>
							</>
						) : (
							<>
								<p className="text-sm border-b-2 pb-2 px-2 w-full">
									<strong>Name:</strong> {name}
								</p>
								<p className="text-sm border-b-2 pb-2 px-2 w-full">
									<strong>Registration Number:</strong> {regno}
								</p>
							</>
						)}
						<p className="text-sm pt-2 px-2 w-full">
							<strong>Phone:</strong> {phone}
						</p>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Profile;
