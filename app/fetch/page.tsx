import UserPlaceholder from "@/components/UserPlaceholder";
import React from "react";

async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const FetchUserPage = async () => {
  const users = await getUsers();
  return (
    <div>
      <UserPlaceholder users={users} />
    </div>
  );
};

export default FetchUserPage;
