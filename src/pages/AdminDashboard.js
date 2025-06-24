import { Table } from 'react-bootstrap';
import AdminViewPosts from '../components/AdminViewPosts';
import AdminViewComments from '../components/AdminViewComments';

export default function AdminDashboard({ posts, users, comments }) {
  const userList = users.map(user => (
    <tr key={user._id} className="text-center">
      <td className="d-none d-lg-table-cell">{user._id}</td>
      <td>{user.username}</td>
      <td>
        <AdminViewPosts user={user} posts={posts} />
      </td>
      <td>
        <AdminViewComments user={user} posts={posts} comments={comments} />
      </td>
    </tr>
  ));

  return (
    <>
      <h1 className="text-center">Admin Dashboard</h1>
      <Table striped bordered hover responsive className="align-middle">
        <thead>
          <tr className="text-center">
            <th className="d-none d-lg-table-cell">ID</th>
            <th>Username</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>{userList}</tbody>
      </Table>
    </>
  );
}