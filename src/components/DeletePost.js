import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const MySwal = withReactContent(Swal);

export default function DeletePost({ postId }) {
  const handleDelete = async () => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'This action will permanently delete the post and its comments.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try{
        await axios.delete(`${process.env.REACT_APP_API_URL}/posts/delete/${postId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        MySwal.fire('Deleted!', 'The post has been removed.', 'success').then(() => window.location.reload());
      }catch(error){
        console.error(error);
        MySwal.fire('Error', 'Something went wrong while deleting the post.', 'error');
      }
    }
  };

  return (
    <Button variant="danger" className="m-1" onClick={handleDelete}>
      Delete Post
    </Button>
  );
}
