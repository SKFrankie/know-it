import React from "react";
import { useQuery, gql } from "@apollo/client";

const QUERY = gql`
  query Users {
    users {
      userId
      username
    }
  }
`;

export default function Signup() {
  const { data, loading, error } = useQuery(QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <div>
      {data.users.map((user) => (
        <div>{user.username}</div>
      ))}
    </div>
  );
}
