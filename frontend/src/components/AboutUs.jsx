import React, { useState } from "react";
import { developersData } from "../data/developers";
import DeveloperCard from "./DeveloperCard";

const AboutUs = () => {
  const [activeVersion, setActiveVersion] = useState("v1");

  const versionDescriptions = {
    v1: "The Barangay Legislative Tracking System (BLTS) is an offline repository platform for archiving Barangay Legislative Records. Barangay Secretary uploads ordinances, resolutions and others. BLTS is a project completed during the 2023 DILG Internship in collaboration with the Computer Engineering on-the-job trainees from the Marinduque State College (MSC).",
    v2: "The Barangay Legislative Tracking System (BLTS) functions as a comprehensive online repository platform designed to efficiently archive and manage Barangay Legislative Records. This BLTS system version 2 is an improvement where converted from offline to online platform for efficient access and online archiving of legislative documents, such as codes of ordinances, ordinances, resolutions, and other related records, are securely stored and organized.",
    v3: "The Barangay Legislative Tracking System (BLTS) Version 3 enhances accessibility and user experience. This version introduces a refined UI/UX for smoother navigation and allows public access to view ordinances and resolutions from all barangays in every municipality through the Get Started button. In this version, DILG administrators are responsible for creating user accounts for Barangay Secretaries."
  };

  return (
    <div className="w-full font-sans bg-[#183248] text-white">
      {/* Header Section */}
      <header className="flex flex-col items-center text-center px-4 py-6 relative">
        {/* Home Button */}
        <a href="/" className="absolute top-4 left-4">
          <img src="/images/home-icon.png" alt="Home" className="h-8 w-8" />
          <span>Home</span>
        </a>

        {/* Logo & Subtitle */}
        <div className="flex flex-col items-center mt-8">
          <img src="/images/logo-white.svg" alt="BLTS Logo" className="h-24" />
          <p className="text-sm italic mt-2 text-center max-w-md">
            Store your barangay legislative documents in BLTS, the responsive online website
          </p>
        </div>

        {/* About Description */}
        <p className="mt-4 max-w-3xl text-center text-sm md:text-base">
          This aims to aid Barangay Officials in managing and keeping their records through an online website wherein the documents stored, such as Ordinance, Resolution, Proposal, and others which are proposed and enacted by Barangays, are distinguished with which administrative term they were uploaded.
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
        {Object.keys(versionDescriptions).map((version) => (
          <button
            key={version}
            onClick={() => setActiveVersion(version)}
            className={`bg-[#1f3b57] hover:bg-[#2a4d6b] text-white px-6 py-2 rounded-md ${activeVersion === version ? 'font-bold' : ''}`}
          >
            Version {version.toUpperCase().replace('V', '')}
          </button>
        ))}
      </div>

      {/* Developer Section */}
      <div className="bg-white text-[#183248] mt-6 px-4 py-8 text-center">
        <h3 className="text-xl font-bold mb-6">Developers of BLTS {activeVersion.toUpperCase()}</h3>
        <div className="flex flex-wrap justify-center gap-8">
          {developersData[activeVersion].map((dev, index) => (
            <DeveloperCard key={index} {...dev} />
          ))}
        </div>
        <p className="max-w-3xl mx-auto mt-6 text-sm md:text-base">{versionDescriptions[activeVersion]}</p>
      </div>

      {/* Footer with Logos and Text */}
      <footer className="bg-[#1f3b57] text-white text-center py-6 px-4 text-sm">
        <div className="flex justify-center items-center mb-4">
          <img src="/images/dilg_logo.png" alt="DILG Logo" className="h-14 mx-2" />
          <img src="/images/lgrc_mimaropa.png" alt="LGRC MIMAROPA Logo" className="h-14 mx-2" />
          <img src="/images/one_duque.png" alt="One Duque Logo" className="h-14 mx-2" />
        </div>
        <p>Spearheaded by DILG Provincial Office through its administration center office.</p>
        <p className="mt-1">The DILG Marinduque Provincial Office asserts full ownership rights over the Barangay Legislative Tracking System (BLTS).</p>
        <p className="mt-1">The software was developed for the purpose of helping Barangay Secretaries manage and organize barangay legislative documents.</p>
        <p className="mt-1">Any unauthorized use, reproduction, distribution, or modification of the software without our explicit consent is strictly prohibited.</p>
        <p className="mt-1">We reserve the right to enforce our ownership rights and protect the integrity of the software through legal means as necessary.</p>      
      </footer>
    </div>
  );
};

export default AboutUs;
