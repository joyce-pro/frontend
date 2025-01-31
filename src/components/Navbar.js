import React from "react";
import logo from "./newlogo.png";
import { Link } from "react-router-dom";

export default function Navbar() {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload(); // Refresh the page after logout
    };

    return (
        <header className="fixed top-0 left-0 w-full bg-[#fa9939] z-50">
            <div className="container mx-auto flex items-center justify-between py-2 px-4">
                <a href="#about" className="logo">
                    <img src={logo} alt="BioroidTech Logo" className="h-12" />
                </a>
                <nav className="hidden md:flex items-center">
                    <ul className="flex space-x-6">
                        <li className="text-white hover:text-black"><Link to="/" >Campaign</Link></li>
                        <li className="text-white hover:text-black"><Link to="/queue" >Queue</Link></li>
                    </ul>
                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="ml-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                        Logout
                    </button>
                </nav>
                <button className="md:hidden text-white text-2xl">
                    <i className="bi bi-list"></i>
                </button>
            </div>
        </header>
    );
}
