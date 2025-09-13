import React from 'react';
import { Link } from 'react-router-dom';

const Users: React.FC = () => {
  // small mock list for now
  const users = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
  }));

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th><th/></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td><Link to={`/users/${u.id}`}>View</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
