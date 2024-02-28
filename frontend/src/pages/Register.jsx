import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isTeam, setIsTeam] = useState(false);
	const [name, setName] = useState("");
	const [name1, setName1] = useState("");
	const [name2, setName2] = useState("");
	const [phone, setPhone] = useState("");
	const [regno, setRegno] = useState("");
	const [regno1, setRegno1] = useState("");
	const [regno2, setRegno2] = useState("");
	const [error, setError] = useState(false);
	const navigate = useNavigate();

	const [isAdmin, setIsAdmin] = useState(false);
	const [adminPassword, setAdminPassword] = useState("");

	const handleRegister = async () => {
		try {
			const res = await axios.post(
				"https://kjblog-api.up.railway.app/api/auth/register",
				{
					username,
					email,
					password,
					isTeam,
					phone,
					name: isTeam ? "" : name,
					name1: isTeam ? name1 : "",
					name2: isTeam ? name2 : "",
					regno: isTeam ? "" : regno,
					regno1: isTeam ? regno1 : "",
					regno2: isTeam ? regno2 : "",
				}
			);
			setUsername(res.data.username);
			setEmail(res.data.email);
			setPassword(res.data.password);
			setError(false);
			toast.success("Account created successfully");
			navigate("/login");
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
							<Link to="/login">Login</Link>
						</h3>
					</div>
					<div className="w-full flex justify-center items-center  ">
						<div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
							<h1 className="text-xl font-bold text-left">Create an account</h1>
							<div className="flex items-center">
								<input
									type="checkbox"
									checked={isTeam}
									onChange={() => setIsTeam(!isTeam)}
									className="mr-2"
								/>
								<label>Register as a team</label>
							</div>
							<input
								onChange={(e) => setUsername(e.target.value)}
								className="w-full px-4 py-2 border-2 border-black outline-0"
								type="text"
								placeholder="Enter your username"
							/>
							{!isTeam && (
								<>
									<input
										onChange={(e) => setName(e.target.value)}
										className="w-full px-4 py-2 border-2 border-black outline-0"
										type="text"
										placeholder="Enter your name"
									/>
									<input
										onChange={(e) => setRegno(e.target.value)}
										className="w-full px-4 py-2 border-2 border-black outline-0"
										type="text"
										placeholder="Enter your regno"
									/>
									<input
										onChange={(e) => setPhone(e.target.value)}
										className="w-full px-4 py-2 border-2 border-black outline-0"
										type="text"
										placeholder="Enter your phone"
									/>
								</>
							)}
							{isTeam && (
								<>
									<input
										onChange={(e) => setName1(e.target.value)}
										className="w-full px-4 py-2 border-2 border-black outline-0"
										type="text"
										placeholder="Enter team member 1 name"
									/>
									<input
										onChange={(e) => setName2(e.target.value)}
										className="w-full px-4 py-2 border-2 border-black outline-0"
										type="text"
										placeholder="Enter team member 2 name"
									/>
									<input
										onChange={(e) => setRegno1(e.target.value)}
										className="w-full px-4 py-2 border-2 border-black outline-0"
										type="text"
										placeholder="Enter team member 1 regno"
									/>
									<input
										onChange={(e) => setRegno2(e.target.value)}
										className="w-full px-4 py-2 border-2 border-black outline-0"
										type="text"
										placeholder="Enter team member 2 regno"
									/>
									<input
										onChange={(e) => setPhone(e.target.value)}
										className="w-full px-4 py-2 border-2 border-black outline-0"
										type="text"
										placeholder="Enter your phone"
									/>
								</>
							)}
							<input
								onChange={(e) => setEmail(e.target.value)}
								className="w-full px-4 py-2 border-2 border-black outline-0"
								type="text"
								placeholder="Enter your email"
							/>
							<input
								onChange={(e) => setPassword(e.target.value)}
								className="w-full px-4 py-2 border-2 border-black outline-0"
								type="password"
								placeholder="Enter your password"
							/>
							<button
								onClick={handleRegister}
								className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black"
							>
								Register
							</button>
							{error && (
								<h3 className="text-red-500 text-sm ">Something went wrong</h3>
							)}
							<div className="flex justify-center items-center space-x-3">
								<p>Already have an account?</p>
								<p className="text-gray-500 hover:text-black">
									<Link to="/login">Login</Link>
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

export default Register;
