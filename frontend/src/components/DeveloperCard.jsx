import React from "react";
const defaultProfile = "https://via.placeholder.com/150"; // Placeholder image URL
import "../styles/DeveloperCard.css"; // Style file

const DeveloperCard = ({ name, role, location, contact, email, image }) => {
  return (
    <div className="developer-card">
        <img 
        src={image ? image : "/images/default-profile.png"} 
        alt={name} 
        className="developer-image" 
        />
        <div className="developer-info">
        <h3>{name}</h3>
        <p><strong>Role:</strong> {role}</p>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Contact:</strong> {contact}</p>
        <p><strong>Email:</strong> {email}</p>
      </div>
    </div>
  );
};

export default DeveloperCard;
