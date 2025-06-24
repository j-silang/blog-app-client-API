import { useState } from 'react';
import { Button, Modal, Accordion } from 'react-bootstrap';
import DeletePost from "./DeletePost.js";

export default function AdminViewPosts({ user, posts }) {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const filteredPosts = posts.filter(
    (post) => post.author.authorId.toString() === user._id
  );

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        View Posts
      </Button>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{user.username}'s Posts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {filteredPosts.length === 0 ? (
            <p className="text-center text-muted">No posts found for this user.</p>
          ) : (
            <Accordion alwaysOpen>
              {filteredPosts.map((post, index) => (
                <Accordion.Item eventKey={index.toString()} key={post._id}>
                  <Accordion.Header>{post.title} - Posted on: {new Date(post.dateCreated).toLocaleString()}</Accordion.Header>
                  <Accordion.Body>
                    <p className="preserve-lines">{post.content}</p>
                    <div className="d-flex align-items-center">
                    	<small className="text-muted">
                    	  Last updated: {new Date(post.lastUpdated).toLocaleString()}
                    	</small>
                    	<DeletePost postId={post._id}/>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}