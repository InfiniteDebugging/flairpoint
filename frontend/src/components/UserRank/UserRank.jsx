import React from "react";

const UserRank = ({ name, rank, requests }) => {
  return (
    <div className="text-2xl text-center py-4">
      <p>
        Hello {name ?? "User"}! With {requests} requests, your rank is{" "}
        {rank ?? "last"}!
      </p>
    </div>
  );
};

export default UserRank;
