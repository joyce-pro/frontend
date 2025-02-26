import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QueueOverlay from "./QueueOverlay";
import EmailOverlay from "./EmailOverlay";
const { DateTime } = require('luxon');

function EmailResultCard({ emailid, email_name }) {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);

    const handleNavigate = () => {
        navigate(`/email/${emailid}`); // Navigate to the path "/fetch/:id"
    };

    const baseUrl = process.env.REACT_APP_API_URL;

    const sendMessage = async (emailid, event) => {
        event.stopPropagation(); // Prevent click event from triggering navigation

        try {
            const response = await fetch(`${baseUrl}/email/send`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ emailid }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            console.info("Sending messages started.");
            setShowPopup(true);

            // Hide the popup after 3 seconds
            setTimeout(() => {
                setShowPopup(false);
            }, 3000);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div
            onClick={handleNavigate}
            className="relative bg-gray-50 border border-gray-200 shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between cursor-pointer"
        >
            <h5 className="text-primary text-2xl font-bold mb-4">{email_name}</h5>

            {/* Play Button - Prevents Navigation */}
            <button
                onClick={(e) => sendMessage(emailid, e)}
                className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                >
                    <path d="M8 5v14l11-7L8 5z" />
                </svg>
            </button>

            {/* Popup Notification */}
            {
                showPopup && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm px-4 py-2 rounded-md shadow-lg">
                        Started sending message...
                    </div>
                )
            }
        </div >
    );
}

export default function Email() {
    const [results, setResults] = useState();
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const baseUrl = process.env.REACT_APP_API_URL

    const toggleOverlay = () => {
        setIsOverlayOpen(!isOverlayOpen);
    };


    useEffect(() => {
        const handleSearch = async () => {

            try {
                const response = await fetch(`${baseUrl}/email/fetch`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response}`);
                }
                const data = await response.json();
                setResults(data.emails);
            } catch (err) {
                // setError(err.message);
                console.log(err)
            } // Handle the API response

        };
        handleSearch();
    }, []);

    return (
        <div className="col">
            <section id="search-results" className="pt-20 mt-20 text-gray-900">
                <div className="container mx-auto px-4" data-aos="fade-up">
                    <div className="text-center">
                        <div className="relative mb-6">
                            <h2 className="text-3xl font-bold text-center">Email Campaigns</h2>
                            <button
                                className="bg-black text-white px-4 py-2 rounded absolute right-0 top-0 transition-transform transform hover:scale-105"
                                onClick={toggleOverlay}
                            >
                                Create New Email Campaign
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {results && results.length > 0 ? (
                                results.map((result, index) => (
                                    <EmailResultCard key={index} {...result} />
                                ))
                            ) : (
                                <p className="text-gray-500 col-span-full">No results found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <EmailOverlay
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
            />
        </div>
    );
}