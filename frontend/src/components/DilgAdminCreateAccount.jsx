import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const DilgAdminCreateAccount = () => {
  const [formData, setFormData] = useState({
    username: "",
    role: "",
    municipality: "",
    barangay: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [municipalities, setMunicipalities] = useState([]);
  const barangaysByMunicipality = {
    "Boac": ["Agot", "Agumaymayan", "Amoingon", "Apitong", "Balagasan", "Balaring", "Balimbing", "Balogo", "Bamban", "Bangbangalon", "Bantad", "Bantay", "Bayuti", "Binunga", "Boi", "Boton", "Buliasnin", "Bunganay", "Caganhao", "Canat", "Catubugan", "Cawit", "Daig", "Daypay", "Duyay", "Hinapulan", "Ihatub", "Isok I", "Isok II", "Laylay", "Lupac", "Mahinhin", "Mainit", "Malbog", "Maligaya", "Malusak", "Mansiwat", "Mataas na Bayan", "Maybo", "Mercado", "Murallon", "Ogbac", "Pawa", "Pili", "Poctoy", "Poras", "Puting Buhangin", "Puyog", "Sabong", "San Miguel", "Santol", "Sawi", "Tabi", "Tabigue", "Tagwak", "Tambunan", "Tampus", "Tanza", "Tugos", "Tumagabok", "Tumapon"],
    "Gasan": ["Antipolo", "Bachao Ibaba", "Bachao Ilaya", "Bacongbacong", "Bahi", "Bangbang", "Banot", "Banuyo", "Barangay I", "Barangay II", "Barangay III", "Bognuyan", "Cabugao", "Dawis", "Dili", "Libtangin", "Mahunig", "Mangiliol", "Masiga", "Matandang Gasan", "Pangi", "Pingan", "Tabionan", "Tapuyan", "Tiguion"],
    "Mogpog": ["Anapog-Sibucao", "Argao", "Balanacan", "Banto", "Bintakay", "Bocboc", "Butansapa", "Candahon", "Capayang", "Danao", "Dulong Bayan", "Gitnang Bayan", "Guisian", "Hinadharan", "Hinanggayon", "Ino", "Janagdong", "Lamesa", "Laon", "Magapua", "Malayak", "Malusak", "Mampaitan", "Mangyan-Mababad", "Market Site", "Mataas na Bayan", "Mendez", "Nangka I", "Nangka II", "Paye", "Pili", "Puting Buhangin", "Sayao", "Silangan", "Sumangga", "Tarug", "Villa Mendez"],
    "Torrijos": ["Bangwayin", "Bayakbakin", "Bolo", "Bonliw", "Buangan", "Cabuyo", "Cagpo", "Dampulan", "Kay Duke", "Mabuhay", "Makawayan", "Malibago", "Malinao", "Maranlig", "Marlangga", "Matuyatuya", "Nangka", "Pakaskasan", "Payanas", "Poblacion", "Poctoy", "Sibuyao", "Suha", "Talawan", "Tigwi"],
    "Buenavista": ["Bagacay", "Bagtingon", "Barangay I", "Barangay II", "Barangay III", "Barangay IV", "Bicas-bicas", "Caigangan", "Daykitin", "Libas", "Malbog", "Sihi", "Timbo", "Tungib-Lipata", "Yook"],
    "Sta. Cruz": ["Alobo", "Angas", "Aturan", "Bagong Silang Poblacion", "Baguidbirin", "Baliis", "Balogo", "Banahaw Poblacion", "Bangcuangan", "Banogbog", "Biga", "Botilao", "Buyabod", "Dating Bayan", "Devilla", "Dolores", "Haguimit", "Hupi", "Ipil", "Jolo", "Kaganhao", "Kalangkang", "Kamandugan", "Kasily", "Kilo-kilo", "Kiñaman", "Labo", "Lamesa", "Landy", "Lapu-lapu Poblacion", "Libjo", "Lipa", "Lusok", "Maharlika Poblacion", "Makulapnit", "Maniwaya", "Manlibunan", "Masaguisi", "Masalukot", "Matalaba", "Mongpong", "Morales", "Napo", "Pag-asa Poblacion", "Pantayin", "Polo", "Pulong-Parang", "Punong", "San Antonio", "San Isidro", "Tagum", "Tamayo", "Tambangan", "Tawiran", "Taytay"],
  };

  useEffect(() => {
    const fetchMunicipalities = async () => {
      try {
        const response = await axios.get(`http://${window.location.hostname}:5000/api/municipalities`);
        setMunicipalities(response.data);
      } catch (error) {
        console.error("Error fetching municipalities:", error);
      }
      
    };
    fetchMunicipalities();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    try {
      const response = await axios.post(`http://${window.location.hostname}:5000/api/dilgadmincreateaccount/register`, formData);
      alert("Account created successfully!");
      console.log(response.data);

      setFormData({
        username: "",
        role: "",
        municipality: "",
        barangay: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong");
      }
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
      <div className="flex flex-col justify-between bg-gradient-to-b from-[#5a7d9a] to-[#5f7f9e] text-white min-w-[300px] w-full md:w-1/2 relative z-10">
        <div className="bg-[#1d3557] flex items-center justify-between px-5 py-4 text-sm font-bold w-full z-20">
          <span>DILG MARINDUQUE</span>
          <Link to="/DilgAdminDashboard">
            <img src="/images/home-icon.png" alt="Home" className="w-6 h-6 cursor-pointer" />
          </Link>
        </div>
        <p className="text-lg text-center px-6 py-4">
          The Barangay Legislative Tracking System (BLTS) is an online platform for archiving Barangay Legislative Records, where Barangay Secretaries can upload ordinances and resolutions.
        </p>
        <div className="bg-[#163a56] py-2 text-center text-sm z-10">A project by ONE MARINDUQUE DILG - LGRC</div>
      </div>
      <div className="relative flex flex-col items-center bg-white w-full lg:w-[60%] p-25 overflow-y-auto h-screen">
        <div className="relative z-10 text-center">
          <h2 className="text-[#d12406e5] text-2xl font-bold mb-4">DILG-Create Account for BLTS Users</h2>
          <img src="/images/blts_logo.png" alt="BLTS Logo" className="mx-auto max-w-[200px]" />
        </div>
        <div className="relative z-10 mt-6 w-full max-w-[350px] bg-white p-6 rounded-lg shadow-lg text-center">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <select
              name="municipality"
              value={formData.municipality}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option value="" disabled>Select Municipality...</option>
              {municipalities.map((mun) => (
                <option key={mun._id} value={mun.name}>{mun.name}</option>
              ))}
            </select>
            <select
              name="barangay"
              value={formData.barangay}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option value="" disabled>Select Barangay...</option>
              {barangaysByMunicipality[formData.municipality]?.map((brgy, index) => (
                <option key={index} value={brgy}>{brgy}</option>
              ))}
            </select>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            >
             <option value="" disabled>Select Role...</option>
             <option value="Secretary">Secretary</option>
             <option value="Barangay_Captain">Barangay Captain</option>
            </select>
            <input type="username" name="username" placeholder="Enter Username" value={formData.username} onChange={handleChange} required className="border border-gray-300 rounded px-3 py-2 text-sm" />
            <input type="email" name="email" placeholder="Enter Gmail" value={formData.email} onChange={handleChange} required className="border border-gray-300 rounded px-3 py-2 text-sm" />
            <input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} required className="border border-gray-300 rounded px-3 py-2 text-sm" />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required className="border border-gray-300 rounded px-3 py-2 text-sm" />
            <button type="submit" className="bg-gradient-to-r from-[#ca1a07] to-[#e67e22] text-white font-medium py-2 rounded-full hover:from-[#c0392b] hover:to-[#d35400] transition-all">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DilgAdminCreateAccount;
