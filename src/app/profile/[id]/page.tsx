import React from "react";

function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <div className="p-1">Profile </div>
      <div className="flex flex-row">
        <div className="mr-2 p-1 ">Profile Page </div>
        <hr />
        <div className="bg-black text-white p-1">{params.id}</div>
      </div>
    </div>
  );
}

export default UserProfile;
