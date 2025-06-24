import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import { Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddPost from "../components/AddPost";
import PostCard from "../components/PostCard";
import AdminDashboard from "./AdminDashboard";

import fetchPosts from "../services/fetchPosts";
import fetchAllUsers from "../services/fetchAllUsers";
import fetchAllComments from "../services/fetchAllComments";

export default function Posts() {
	const [posts, setPosts] = useState([]);
	const [users, setUsers] = useState([]);
	const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(UserContext);

	useEffect(() => {
		if(user.isAdmin === true){
			fetchAllUsers().then(userData => setUsers(userData));
			fetchAllComments().then(commentData => setComments(commentData));
		}
		fetchPosts()
		.then(postData => setPosts(postData))
		.finally(() => setLoading(false));
	}, [user.isAdmin]);

	if (loading) {
	  return (
	    <div className="position-absolute top-50 start-50 translate-middle">
	      <Spinner animation="border" variant="primary" />
	    </div>
	  );
	}

	return (
		!user.isAdmin
			?	<Container className="my-3 text-center">
					<h1 className="mb-4">Posts</h1>
					{user.id !== null
						? <AddPost />
						:	<h5>You must <Link to="/register">login</Link> to add posts and leave comments.</h5>
					}
					
				  <Row className="g-4 justify-content-center mt-2">
				    {posts.map(post => (
							<PostCard
								key={post._id}
								post={post}
							/>
				    ))}
				  </Row>
				</Container>
			:	<AdminDashboard posts={posts} users={users} comments={comments} />
	);
}