import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars, FaPencilAlt } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
	const [prompt, setPrompt] = useState("");
	const [menu, setMenu] = useState(false);
	const navigate = useNavigate();
	const path = useLocation().pathname;

	// console.log(prompt)

	const showMenu = () => {
		setMenu(!menu);
	};

	const { user } = useContext(UserContext);

	return (
		<div className="flex items-center justify-between px-8 py-2 bg-white/70 shadow-lg ring-1 ring-black/5 backdrop-blur-xl fixed top-0 w-full z-20">
			<div className="">
				<a href="https://www.vitvibrance.com/" target="_blank">
					<img
						src="/vibrance.jpg"
						alt="Vibrance"
						className="h-12 w-12 rounded-full
					"
					/>
				</a>
			</div>
			<div className="">
				<Link to="/">
					<h1 className="text-lg md:text-xl font-extrabold font-poppins">
						Blogging Blitz
					</h1>
					<div className="flex justify-end items-center gap-2 ">
						<p className="md:text- text-right font-medium text-orange-900">
							by Kalinga Jyoti
						</p>
						{/* <img
							src="/fevicon.jpg"
							alt="KalingaLogo"
							className="h-6 w-6  rounded-full"
						/> */}
					</div>
				</Link>
			</div>
			<div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
				{user ? (
					<Link to="/write">
						<div
							className="flex justify-center items-center gap-1 bg-blue-500 text-white rounded-full px-3 py-1 font-medium hover:shadow-md hover:shadow-blue-500 hover:text-blue-500 hover:bg-white transition duration-300 ease-in-out cursor-pointer
            "
						>
							<FaPencilAlt size={12} />
							Write
						</div>
					</Link>
				) : (
					<h3>
						<Link to="/login" className="">
							<button className="flex items-center space-x-1 bg-blue-500 text-white border-blue-500 border-2 rounded-full px-3 py-1 font-medium hover:text-blue-600 hover:bg-white transition duration-300 ease-in-out">
								<LuLogIn className="" />
								<p className="">Login</p>
							</button>
						</Link>
					</h3>
				)}
				{user ? (
					<div onClick={showMenu}>
						<p className="cursor-pointer relative">
							<FaBars size={25} />
						</p>
						{menu && <Menu />}
					</div>
				) : (
					// to be removed
					<h3>
						<Link to="/register" className="">
							<button className="flex items-center space-x-1 bg-green-500 text-white border-green-500 border-2 rounded-full px-3 py-1 font-medium hover:text-green-600 hover:bg-white transition duration-300 ease-in-out">
								<LuLogIn className="" />
								<p className="">Register</p>
							</button>
						</Link>
					</h3>
				)}
			</div>
			<div onClick={showMenu} className="md:hidden text-lg">
				<p className="cursor-pointer relative">
					<FaBars size={25} />
				</p>
				{menu && <Menu />}
			</div>
		</div>
	);
};

export default Navbar;
