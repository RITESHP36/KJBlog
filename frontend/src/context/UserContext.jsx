/* eslint-disable react/prop-types */

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
	const [user, setUser] = useState(null);

	useEffect(() => {
		getUser();
	}, []);

	const getUser = async () => {
		try {
			const token = localStorage.getItem("token"); // Retrieve token from local storage
			const res = await axios.get(
				"https://kjblog-api.up.railway.app/api/auth/refetch",
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			console.log("Data recieved at UserContext.jsx getUser: ", res.data);
			setUser(res.data);
		} catch (err) {
			console.log("Error at UserContext.jsx getUser: ", err);
		}
	};

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
}
