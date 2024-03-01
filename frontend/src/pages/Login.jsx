import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import toast from "react-hot-toast";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);
	const { setUser } = useContext(UserContext);
	const navigate = useNavigate();

	const [isAdmin, setIsAdmin] = useState(false);
	const [adminPassword, setAdminPassword] = useState("");

	const handleLogin = async () => {
		try {
			const res = await axios.post(
				"https://kjblog-api.up.railway.app/api/auth/login",
				{ username, password }, // send plain text password
				{ withCredentials: true }
			);
			localStorage.setItem("token", res.data.token); // Store the token in local storage
			console.log("Token at login: ", res.data.token);
			setUser(res.data);
			setError(false);
			navigate("/");
			toast.success("Welcome back " + res.data.username + " !");
		} catch (err) {
			setError(true);
			console.log(err);
		}
	};

	const checkAdminPassword = () => {
		const adminPass = "kjadmin007";
		if (adminPassword === adminPass) {
			setIsAdmin(true);
		} else {
			toast.error("Incorrect admin password");
		}
	};

	return (
		<>
			{!isAdmin ? (
				<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
					<p className="text-lg text-center text-gray-700 mb-2">
						You are not allowed to access this page
					</p>
					<p className="text-md text-center text-gray-600 mb-6">
						Login as an admin to continue
					</p>
					<input
						type="password"
						className="w-64 px-3 py-2 border-2 border-gray-300 rounded-md outline-none focus:border-indigo-500"
						placeholder="Enter admin password"
						onChange={(e) => setAdminPassword(e.target.value)}
					/>
					<button
						onClick={checkAdminPassword}
						className="mt-4 px-4 py-2 text-white bg-indigo-500 rounded hover:bg-indigo-600 focus:outline-none"
					>
						Submit
					</button>
				</div>
			) : (
				<>
					<div className="flex items-center justify-between px-6 md:px-[200px] py-4">
						<h1 className="">
							<Link to="/">
								<h1 className="text-lg md:text-2xl font-extrabold font-poppins">
									Blogging Blitz
								</h1>
								<p className="text-right font-medium text-orange-900">
									by Kalinga Jyoti
								</p>
							</Link>
						</h1>
						<h3>
							<Link to="/register">Register</Link>
						</h3>
					</div>
					<div className="w-full flex justify-center items-center h-[80vh] ">
						<div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
							<h1 className="text-xl font-bold text-left">
								Log in to your account
							</h1>
							<input
								onChange={(e) => setUsername(e.target.value)}
								className="w-full px-4 py-2 border-2 border-black outline-0"
								type="text"
								placeholder="Enter your username"
							/>
							<input
								onChange={(e) => setPassword(e.target.value)}
								className="w-full px-4 py-2 border-2 border-black outline-0"
								type="password"
								placeholder="Enter your password"
							/>
							<button
								onClick={handleLogin}
								className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black "
							>
								Log in
							</button>
							{error && (
								<h3 className="text-red-500 text-sm ">Something went wrong</h3>
							)}
							<div className="flex justify-center items-center space-x-3">
								<p>New here?</p>
								<p className="text-gray-500 hover:text-black">
									<Link to="/register">Register</Link>
								</p>
							</div>
						</div>
					</div>
				</>
			)}
			<Footer />
		</>
	);
};

export default Login;
