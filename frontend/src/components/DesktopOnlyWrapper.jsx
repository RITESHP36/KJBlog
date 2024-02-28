import React, { useEffect, useState } from "react";

const DesktopOnlyWrapper = ({ children }) => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768); // Adjust the threshold as needed
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	return isMobile ? (
		<div className="h-screen flex justify-center items-end  bg-black">
			<div className=" fixed top-10 flex justify-center items-center">
				<img
					className="h-full w-full  bg-no-repeat"
					src='/loader.gif'
				/>
			</div>
			<div className=" m-4 p-2 rounded-lg bg-white/10 shadow-2xl ring-2 ring-black/5 backdrop-blur-xl ">
				<p className="text-white text-xl font-medium mb-4 text-center ">
					This site is best viewed on a desktop or laptop
				</p>
				<p className="text-white text-base text-center">
					Please switch to a larger screen for the best experience
				</p>
			</div>
		</div>
	) : (
		children
	);
};

export default DesktopOnlyWrapper;
