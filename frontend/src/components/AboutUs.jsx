import React, { useState } from "react";
import { developersData } from "../data/developers";
import DeveloperCard from "./DeveloperCard";

const About_Us = () => {
  const [activeVersion, setActiveVersion] = useState("v1");

  return (
    <div className="w-full font-sans bg-[#183248] text-white">
      {/* Header Section */}
      <header className="flex flex-col items-center text-center px-4 py-6 relative">
        {/* Home Button */}
        <a href="/" className="absolute top-4 left-4">
          <img src="/images/home-icon.png" alt="Home" className="h-10 w-10" />
          <span>Home</span>
        </a>

        {/* Logo & Subtitle */}
        <div className="flex flex-col items-center mt-8">
          <img
            src="/images/logo-white.svg"
            alt="BLTS Logo"
            className="h-24"
          />
          <p className="text-sm italic mt-2 text-center max-w-md">
            Store your barangay legislative documents in BLTS, the responsive online website
          </p>
        </div>

        {/* About Description */}
        <p className="mt-4 max-w-3xl text-center text-sm md:text-base">
          This aims to aid Barangay Officials in managing and keeping their records through
          an online website wherein the documents stored, such as Ordinance, Resolution,
          Proposal, and others which are proposed and enacted by Barangays, are distinguished
          with which administrative term they were uploaded.
        </p>

        {/* View Documentation Button */}
        <a
          href="/files/SAMPLE DOCUMENATION.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-[#1f3b57] font-bold px-4 py-2 mt-4 rounded-md"
        >
          View Documentation
        </a>
      </header>

      {/* Version Buttons */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => setActiveVersion("v1")}
          className="bg-[#1f3b57] hover:bg-[#2a4d6b] text-white px-6 py-2 rounded-md"
        >
          Version 1
        </button>
        <button
          onClick={() => setActiveVersion("v2")}
          className="bg-[#1f3b57] hover:bg-[#2a4d6b] text-white px-6 py-2 rounded-md"
        >
          Version 2
        </button>
        <button
          onClick={() => setActiveVersion("v3")}
          className="bg-[#1f3b57] hover:bg-[#2a4d6b] text-white px-6 py-2 rounded-md"
        >
          Version 3
        </button>
      </div>

      {/* Developer Section */}
      <div className="bg-white text-[#183248] mt-6 px-4 py-8 text-center">
        <h3 className="text-xl font-bold mb-6">Developers of {activeVersion.toUpperCase()}</h3>
        <div className="flex flex-wrap justify-center gap-8">          {developersData[activeVersion].map((dev, index) => (
            <DeveloperCard key={index} {...dev} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default About_Us;
