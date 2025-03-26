import React from "react";
const defaultProfile = "https://via.placeholder.com/150"; // Fallback
import { MapPin, Phone, Mail, Contact } from 'lucide-react';

const DeveloperCard = ({ name, position, address, contact, email, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-[250px] text-center">
      <img
        src={image || defaultProfile}
        alt={name}
        className="w-[200px] h-[200px] object-cover rounded-md border-2 border-gray-300 mx-auto"
      />
      <div className="mt-4 space-y-0 text-sm">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p>  <span className="font-medium"></span> <span className="italic">{position}</span></p>
        <div className="mt-5 flex items-start gap-3">
          <MapPin className="w-5 h-5 text-red-600 mt-1 shrink-0" />
          <p className="break-words overflow-hidden text-ellipsis leading-snug text-left">
            {address}
          </p>
        </div>

        <div className="flex items-start gap-3">
          <Phone className="w-5 h-5 text-blue-600 mt-1 shrink-0" />
          <p className="break-words overflow-hidden text-ellipsis leading-snug text-left">
            {contact}
          </p>
        </div>

        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-green-600 mt-1 shrink-0" />
          <p className="break-words overflow-hidden text-ellipsis leading-snug text-left">
            {email}
          </p>
        </div>

      </div>
    </div>
  );
};

export default DeveloperCard;

