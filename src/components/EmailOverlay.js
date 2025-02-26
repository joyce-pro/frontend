import React, { useState } from "react";

export default function EmailOverlay({ isOpen, onClose, children, result }) {
    const [name, setName] = useState();
    const [message, setMessage] = useState();

    if (!isOpen) return null;

    const baseUrl = process.env.REACT_APP_API_URL;

    const handleBackdropClick = (e) => {
        if (e.target.id === "outreachModal") {
            onClose();
            setMessage("");
            setName("");
        }
    };

    const handleClick = async () => {
        try {
            const response = await fetch(`${baseUrl}/email/create/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    emailName: name,
                    message,
                }),
            });
            if (!response.ok) {
                console.log(response)
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setMessage("");
            setName("");
        } catch (err) {
            console.log(err);
        }
        onClose();
    };

    return (
        <div
            id="overlay-backdrop"
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
        >
            <section id="profile" className="text-gray-900">
                <div id="outreachModal" className="fixed inset-0 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg w-[700px] max-h-[750px] overflow-y-auto">
                        <h2 className="text-xl font-bold text-center mb-4 bg-yellow-500 p-2 text-white">
                            Outreach Panel
                        </h2>
                        <label htmlFor="campaignName" className="block text-gray-700 font-semibold mb-2">
                            Outreach Email Campaign Name
                        </label>
                        <input
                            id="campaignName"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                            placeholder="Enter email campaign name"
                        />


                        <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter your message"
                            rows="8"
                        ></textarea>



                        <div className="flex justify-center">
                            <button
                                onClick={handleClick}
                                className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}