import React, { useEffect, useState } from "react";

export const EmailListCampaignOverlay = ({ isOpen, onClose, campaignId }) => {
    const [items, setItems] = useState([]);
    const [selectedEmailId, setSelectedEmailId] = useState(null);

    const baseUrl = process.env.REACT_APP_API_URL;

    const handleClick = async () => {
        try {
            const response = await fetch(`${baseUrl}/email/add/all`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emailId: selectedEmailId,
                    campaignId
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response}`);
            }
        } catch (err) {
            console.error(err);
        }
        onClose();
    };

    useEffect(() => {
        async function fetchemail() {
            try {
                const response = await fetch(`${baseUrl}/email/fetch`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setItems(data.emails);
            } catch (err) {
                console.error(err);
            }
        }
        fetchemail();
    }, [baseUrl]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={onClose}
        >
            <div
                className="bg-white w-[250px] h-[300px] rounded-lg shadow-lg p-4 overflow-y-auto"
                onClick={(e) => e.stopPropagation()} // Prevent click-through
            >
                <h2 className="text-lg font-bold mb-3">Select a Email Campaign</h2>
                <ul className="space-y-2">
                    {items?.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => setSelectedEmailId(item.emailid)}
                            className={`p-2 rounded cursor-pointer ${selectedEmailId === item.emailid
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 hover:bg-gray-200"
                                }`}
                        >
                            {item.email_name}
                        </li>
                    ))}
                </ul>
                <button
                    className="mt-4 w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleClick}
                >
                    Enter
                </button>
            </div>
        </div>
    );
};