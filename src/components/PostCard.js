import { Card, Col, Button, Modal, Accordion } from 'react-bootstrap';
import { useContext, useState, useEffect } from "react";
import UserContext from "../UserContext";
import axios from "axios";
import EditPost from "./EditPost.js";
import DeletePost from "./DeletePost.js";
import AddComment from "./AddComment.js";
import DeleteComment from "./DeleteComment.js";
import formatDate from "../services/formatDate";

export default function PostCard({ post }) {
  const { user } = useContext(UserContext);

  const [comments, setComments] = useState([]);

  const [showPost, setShowPost] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleShowPost = () => setShowPost(true);
  const handleClosePost = () => setShowPost(false);

  const handleShowComments = () => setShowComments(true);
  const handleCloseComments = () => setShowComments(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/${post._id}/comments/find/all`);
        setComments(response.data.comments);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };

    fetchComments();
  }, [post._id]);

  return (
    <>
      <Col sm={6} md={4} className="mb-4">
        <Card className="h-100 text-center shadow-sm">
          <Card.Body>
            <Card.Title><b>{post.title}</b></Card.Title>
            <Card.Text>By: {post.author.authorName}</Card.Text>
            <Card.Text>{formatDate(post.dateCreated)[1]}<br/>{formatDate(post.dateCreated)[2]}</Card.Text>
            {post.author.authorId.toString() === user.id 
              ? <>
                  <EditPost post={post} />
                  <DeletePost postId={post._id} />
                </>
              : null
            }
            
          </Card.Body>
          <Card.Footer className="py-3">
            <Button variant="primary" className="m-1" onClick={handleShowPost}>
              View Post
            </Button>
            <Button variant="secondary" className="m-1" onClick={handleShowComments}>
              Comments
            </Button>
          </Card.Footer>
        </Card>
      </Col>

      <Modal show={showPost} onHide={handleClosePost} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {post.title}<br />
            <small className="text-muted">
              Posted by {post.author.authorName} on {formatDate(post.dateCreated)[0]}
            </small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-start preserve-lines">
            {post.content}
          </p>
          <div className="text-end">
          {post.dateCreated !== post.lastUpdated
            ? <small className="text-muted">
                Last updated on {formatDate(post.lastUpdated)[0]}
              </small>
            : null
          }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePost}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showComments} onHide={handleCloseComments} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Comments for: {post.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {comments.length > 0 ? (
            <Accordion alwaysOpen>
              {comments.map((comment, index) => (
                <Accordion.Item eventKey={index.toString()} key={comment._id}>
                  <Accordion.Header>
                    {comment.author?.authorName || "Anonymous"} - {formatDate(comment.dateCommented)[0]}
                  </Accordion.Header>
                  <Accordion.Body className="preserve-lines">
                    {comment.content}
                  </Accordion.Body>
                  {comment.author.authorId.toString() === user.id
                    ? <Accordion.Body className="preserve-lines">
                        <div className="d-flex ms-auto">
                          <DeleteComment postId={post._id} commentId={comment._id}/>
                        </div>
                      </Accordion.Body>
                    : null
                  }
                </Accordion.Item>
              ))}
            </Accordion>
          ) : (
            <p className="text-center text-muted">No comments available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          {user.id !== null
            ? <AddComment postId={post._id} />
            : null
          }
          
          <Button variant="secondary" onClick={handleCloseComments}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}
