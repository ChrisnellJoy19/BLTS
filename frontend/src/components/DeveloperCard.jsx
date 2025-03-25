import React from "react";
const defaultProfile = "https://via.placeholder.com/150"; // Fallback

const DeveloperCard = ({ name, role, location, contact, email, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-[250px] text-center">
      <img
        src={image || defaultProfile}
        alt={name}
        className="w-[200px] h-[200px] object-cover rounded-md border-2 border-gray-300 mx-auto"
      />
      <div className="mt-4 space-y-1 text-sm">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p><span className="font-medium">Role:</span> {role}</p>
        <p><span className="font-medium">Location:</span> {location}</p>
        <p><span className="font-medium">Contact:</span> {contact}</p>
        <p><span className="font-medium">Email:</span> {email}</p>
      </div>
    </div>
  );
};

export default DeveloperCard;
