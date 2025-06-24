import axios from "axios";

export default async function fetchAllComments() {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/comments/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
  });
  return response.data.comments;
}