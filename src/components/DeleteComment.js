import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const MySwal = withReactContent(Swal);

export default function DeleteComment({ postId, commentId }) {
  const handleDelete = async () => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'This action will permanently delete the comment.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try{
        await axios.delete(`${process.env.REACT_APP_API_URL}/posts/${postId}/comments/delete/${commentId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        MySwal.fire('Deleted!', 'The comment has been removed.', 'success').then(() => window.location.reload());
      }catch(error){
        console.error(error);
        MySwal.fire('Error', 'Something went wrong while deleting.', 'error');
      }
    }
  };

  return (
    <Button variant="danger" className="ms-auto" onClick={handleDelete}>
      Delete Comment
    </Button>
  );
}