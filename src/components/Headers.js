import React from "react";
import logo from "./newlogo.png"

export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full bg-black z-50">
            <div className="container mx-auto flex items-center justify-between py-2 px-4">
                <a href="#about" className="logo">
                    <img src={logo} alt="BioroidTech Logo" className="h-12" />
                </a>
                <nav className="hidden md:flex">
                    <ul className="flex space-x-6">
                        <li><a href="#home" className="text-white hover:text-blue-400">Home</a></li>
                        <li><a href="#about" className="text-white hover:text-blue-400">About</a></li>
                        <li><a href="#contact" className="text-white hover:text-blue-400">Contact</a></li>
                    </ul>
                </nav>
                <button className="md:hidden text-white text-2xl">
                    <i className="bi bi-list"></i>
                </button>
            </div>
        </header>
    )
}