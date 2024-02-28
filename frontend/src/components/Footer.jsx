import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
	return (
		<>
			<div className="mt-8 w-full bg-white text-black px-8 md:px-40 flex md:flex-row flex-col space-y-6 md:space-y-0 items-start md:justify-between text-sm pt-2 pb-1">
				<div className="">
					<p className="font-bold">Student Coordinators:</p>
					<div className="flex gap-4 text-black">
						<div className="">
							<p className="font-medium">OMKAR DASH</p>
							<p>+91 93379 85232</p>
						</div>
						<div className="">
							<p className="font-medium">BIGNESH NANDA</p>
							<p>+91 73818 05858</p>
						</div>
					</div>
				</div>
				<div className="flex flex-col text-black">
					<p className="font-bold">Faculty Coordinators:</p>
					<p>DR. BISWAJIT JENA</p>
					<p>DR. JYOTIRMAYEE SATAPATHY</p>
				</div>
			</div>
			<div className="flex justify-center space-x-2 bg-white pb-1">
                        <a href="https://twitter.com/kalinga_jyoti" target="_blank" rel="noopener noreferrer">
                            <FaTwitter className="text-blue-400" />
                        </a>
                        <a href="https://www.instagram.com/kalingajyoti.vitc/" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="text-pink-600" />
                        </a>
                        <a href="https://www.linkedin.com/company/kalinga-jyoti-vitc/about/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="text-blue-700" />
                        </a>
                        <a href="https://www.youtube.com/@KalingaJyoti" target="_blank" rel="noopener noreferrer">
                            <FaYoutube className="text-red-600" />
                        </a>
                    </div>
			<p className="pb-2 text-center text-sm bg-white font-semibold">
				All rights reserved @Blogging Blitz KALINGA JYOTI 2024
			</p>
		</>
	);
};

export default Footer;
