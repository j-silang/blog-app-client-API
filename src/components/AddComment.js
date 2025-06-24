import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function AddCommentButton({ postId }) {
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState('');

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setContent('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/posts/${postId}/comments/add`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );
      handleClose();
      MySwal.fire({
        title: 'Success!',
        text: 'Your comment has been added.',
        icon: 'success',
        confirmButtonColor: '#3085d6'
      })
      .then(() => window.location.reload())
    } catch (error) {
      console.error('Failed to add comment:', error);
      MySwal.fire({
        title: 'Error',
        text: 'Failed to add comment.',
        icon: 'error',
        confirmButtonColor: '#d33'
      });
    }
  };

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Add Comment
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="commentContent" className="mb-3">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </Form.Group>
            <div className="text-end">
              <Button variant="secondary" className="me-2" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
