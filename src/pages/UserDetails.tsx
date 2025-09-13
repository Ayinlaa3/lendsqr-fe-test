import React from 'react';
import { useParams } from 'react-router-dom';

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // later we'll read from localStorage / IndexedDB or mock API
  return (
    <div>
      <h1>User Details</h1>
      <p>Selected user id: <strong>{id}</strong></p>
      <p>(We'll populate this page from localStorage / IndexedDB later.)</p>
    </div>
  );
};

export default UserDetails;
