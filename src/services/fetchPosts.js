import axios from "axios";

export default async function fetchPosts() {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/find/all`);
  return response.data.posts;
}