import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Menu = () => {
	const { user } = useContext(UserContext);
	const { setUser } = useContext(UserContext);
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			localStorage.removeItem("token");
			const res = await axios.get(
				"https://kjblog-api.up.railway.app/api/auth/logout",
				{
					withCredentials: true,
				}
			);
			toast.success("Logged out successfully");
			setUser(null);
			navigate("/login");
		} catch (err) {
			console.log(err);
			toast.error("Failed to logout");
		}
	};
	return (
		<>
			<div className="bg-black w-[200px] z-10 flex flex-col items-start absolute top-14 right-6 md:right-8 rounded-md p-4 space-y-4">
				{!user && (
					<h3 className="text-white text-sm hover:text-blue-500 cursor-pointer w-full">
						<Link to="/login">Login</Link>
					</h3>
				)}
				{!user && (
					<h3 className="text-white text-sm hover:text-blue-500 cursor-pointer w-full">
						<Link to="/register">Register</Link>
					</h3>
				)}
				{user && (
					<h3 className="text-white text-sm hover:text-blue-400 cursor-pointer w-full">
						<Link to={"/profile/" + user._id}>Profile</Link>
					</h3>
				)}
				{user && (
					<h3 className="text-white text-sm hover:text-blue-500 cursor-pointer w-full">
						<Link to="/write">Write</Link>
					</h3>
				)}
				{user && (
					<h3 className="text-white text-sm hover:text-blue-500 cursor-pointer w-full">
						<Link to={"/myblogs/" + user._id}>My blogs</Link>
					</h3>
				)}
				{user && (
					<h3
						onClick={handleLogout}
						className="text-white text-sm hover:text-blue-500 cursor-pointer w-full"
					>
						Logout
					</h3>
				)}
			</div>
		</>
	);
};

export default Menu;
