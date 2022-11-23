import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/posts/');
      const responseData = await response.json();
      setUsers(responseData);
    }
    fetchData();
  }, []);

  // const userComponents = users.map((user) => {
  //   return (
  //     <li key={user.id}>
  //       <NavLink to={`/users/${user.id}`}>{user.first_name} {user.last_name}</NavLink>
  //     </li>
  //   );
  // });

  return (
    <>
      <h1>test</h1>
      <ul>{JSON.stringify(users)}</ul>
    </>
  );
}

export default UsersList;
