import React, { useState } from "react";
import "../styles/About_Us.css";
import { developersData } from "../data/developers";
import DeveloperCard from "../components/DeveloperCard";

const About_Us = () => {
  const [activeVersion, setActiveVersion] = useState("v1");

  return (
    <div className="about-container">
      {/* Header Section */}
    <header className="about-header">
      {/* Home Button */}
      <a href="/" className="about-home-button">
      <img src="/images/home-icon.png" alt="Home Icon" className="home-icon" />
      </a>

      <div className="about-header-content">
        {/* BLTS Logo & Subtitle (Stacked Correctly) */}
        <div className="about-logo-container">
        <img src="/images/logo-white.svg" alt="BLTS Logo" className="logo-white" />
        <p className="about-subtitle">
            Store your barangay legislative documents in BLTS, the responsive online website
          </p>
        </div>

        {/* Text Beside Logo */}
        <p className="about-header-text">
          This aims to aid Barangay Officials in managing and keeping their records through an online website wherein the documents stored, such as Ordinance, Resolution, Proposal, and others which are proposed and enacted by Barangays, are distinguished with which administrative term they were uploaded.
        </p>
        {/* View Documentation Button */}
      <a href="/files/SAMPLE DOCUMENATION.pdf" target="_blank" rel="noopener noreferrer" className="download-btn">
        View Documentation
      </a>
      </div>

    </header>

      {/* Version Buttons */}
      <div className="version-buttons">
        <button onClick={() => setActiveVersion("v1")}>Version 1</button>
        <button onClick={() => setActiveVersion("v2")}>Version 2</button>
        <button onClick={() => setActiveVersion("v3")}>Version 3</button>
      </div>

      {/* Developer Section */}
      <div className="developer-section">
        <h3>Developers of {activeVersion.toUpperCase()}</h3>
        <div className="developer-list">
          {developersData[activeVersion].map((dev, index) => (
            <DeveloperCard key={index} {...dev} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default About_Us;
