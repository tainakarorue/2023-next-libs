"use client";
import { motion } from "framer-motion";

const UserPlaceholder = ({ users }: { users: any }) => {
  return (
    <div>
      <h1>Users Data</h1>
      {users?.map((user: any, idx: number) => (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { duration: 1, delay: idx } }}
        >
          <h2>{user.name}</h2>
          <p>{user.id}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default UserPlaceholder;
