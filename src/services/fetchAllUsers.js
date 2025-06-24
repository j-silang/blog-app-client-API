import axios from "axios";

export default async function fetchAllUsers() {
	const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/all`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`
			}
	})
	return response.data.users;
}