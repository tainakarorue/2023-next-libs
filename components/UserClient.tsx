"use client";
import { use } from "react";
import { motion } from "framer-motion";

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

const UserClient = () => {
  const users = use(getUsers());

  return (
    <div>
      <h1>Users Data</h1>
      {users?.map((user: any, idx: number) => (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: { duration: 1, delay: idx * 0.4 },
          }}
        >
          <h2>{user.name}</h2>
          <p>{user.id}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default UserClient;
