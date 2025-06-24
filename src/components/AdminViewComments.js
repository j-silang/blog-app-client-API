import { useState } from 'react';
import { Button, Modal, Accordion } from 'react-bootstrap';
import DeleteComment from "./DeleteComment.js";

export default function AdminViewComments({ user, posts, comments }) {
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const filteredComments = comments.filter(
    comment => comment.author.authorId?.toString() === user._id?.toString()
  );

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        View Comments
      </Button>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{user.username}'s Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {filteredComments.length === 0 ? (
            <p className="text-center text-muted">No comments found for this user.</p>
          ) : (
            <Accordion alwaysOpen>
              {filteredComments.map((comment, index) => (
                <Accordion.Item eventKey={comment._id} key={comment._id}>
                  <Accordion.Header>
                    Commented on: {
                      posts.find(p => p._id === comment.postId)?.title || `Post ID: ${comment.postId}`
                    }
                  </Accordion.Header>
                  <Accordion.Body>
                    <p className="preserve-lines">{comment.content}</p>
                    <div className="d-flex align-items-center">
                      <small className="text-muted">
                        Date commented: {new Date(comment.dateCommented).toLocaleString()}
                      </small>
                      <DeleteComment postId={comment.postId} commentId={comment._id} />
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}