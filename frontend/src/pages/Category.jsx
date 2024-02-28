import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

// Define the category data
const categories = [
	{
		category: "historical",
		title: "Historical ODISHA",
		image: "/historical1.jpg",
		description:
			"Odisha, known for its rich history and cultural heritage, boasts a plethora of historical sites that attract tourists from far and wide. From the ancient caves of Khandagiri and Udayagiri to the magnificent temples of Konark and Puri, every corner of Odisha is steeped in history. The state's capital, Bhubaneswar, is often referred to as the 'City of Temples' due to its numerous ancient temples dating back centuries. Odisha's history is also reflected in its vibrant art and crafts, which have been passed down through generations.",
		image2: "/historical2.jpg",
		description2:
			"In addition to its architectural marvels, Odisha is also home to several sites of archaeological importance, such as the Ratnagiri and Lalitgiri Buddhist complexes. These sites offer a glimpse into the state's rich Buddhist heritage. The history of Odisha is not just limited to its monuments and temples but also encompasses its rich maritime history, with ports like Paradip playing a significant role in trade and commerce.",
	},
	{
		category: "cultural",
		title: "Cultural ODISHA",
		image: "/cultural1.jpg",
		description:
			"Odisha's cultural heritage is as diverse as it is rich, with influences from various dynasties and civilizations that have ruled the region over the centuries. The state is known for its vibrant dance forms, such as Odissi, which is considered one of the oldest surviving dance forms in India. Odisha's music, art, and literature also reflect its rich cultural heritage, with classical music forms like Odissi music and folk art forms like Pattachitra and Tala Patra painting thriving in the state.",
		image2: "/cultural2.jpg",
		description2:
			"The people of Odisha are known for their warm hospitality and rich traditions, which are evident in their festivals and rituals. Festivals like Durga Puja, Rath Yatra, and Raja Parba are celebrated with great fervor and enthusiasm, showcasing the state's cultural vibrancy. Odisha's cuisine is also a reflection of its cultural diversity, with dishes like Pakhala Bhata, Dalma, and Chhena Poda being popular among locals and tourists alike.",
	},
	{
		"category": "open",
		"title": "Open Category",
		"image": "/open1.jpg",
		"description": "The 'Open Category' is a broad canvas for your creativity and intellect. It's a space where you can explore any topic, idea, or concept that sparks your interest. From personal anecdotes and thought-provoking opinions to educational content and creative writing, the possibilities are endless. This category encourages you to step outside the confines of specific themes and delve into the depths of your imagination and knowledge.",
		"image2": "/open2.jpg",
		"description2": "In the 'Open Category', you can write about your unique experiences, share your perspective on current events, or educate readers about a subject you're passionate about. You can also showcase your creativity through short stories, poems, or scripts. The 'Open Category' is all about freedom in writing, so don't hesitate to express your thoughts, share your ideas, and engage your readers in meaningful conversations."
	},	
];

const Category = () => {
	let { cat } = useParams();

	// Find the category data based on the 'cat' parameter
	const category = categories.find(
		(c) => c.category.toLowerCase() === cat.toLowerCase()
	);

	if (!category) {
		return <div>Category not found.</div>;
	}

	return (
		<div>
			<Navbar />
			<div className="pb-16"></div>
			<h1 className="text-center uppercase font-bold text-3xl mb-8 mt-4 drop-shadow-xl text-transparent bg-clip-text bg-gradient-to-br from-violet-500 to-blue-300">
				{category.title}
			</h1>
			<div className="flex gap-8 px-8">
				<div className="w-1/2 h-56 shadow-xl">
					<img
						className="rounded-lg shadow-lg h-full w-full object-cover"
						src={category.image}
						alt={category.title}
					/>
				</div>
				<div className="w-1/2">
					<p className=" text-gray-700 font-medium">
						{category.description}
					</p>
				</div>
			</div>
			{/* Additional description and image */}
			<div className="flex gap-8 my-8 px-8">
				<div className="w-1/2">
					<p className=" text-gray-700 font-medium">
						{category.description2}
					</p>
				</div>
				<div className="w-1/2 h-56 shadow-xl">
					<img
						className="rounded-lg shadow-lg h-full w-full object-cover"
						src={category.image2}
						alt={category.title}
					/>
				</div>
			</div>
		</div>
	);
};

export default Category;
