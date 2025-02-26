import React, { useEffect, useState } from "react";

export const WhatsappListCampaignOverlay = ({ isOpen, onClose, campaignId }) => {
    const [items, setItems] = useState([]);
    const [selectedWhatsappId, setSelectedWhatsappId] = useState(null);

    const baseUrl = process.env.REACT_APP_API_URL;

    const handleClick = async () => {
        try {
            const response = await fetch(`${baseUrl}/whatsapp/add/all`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    whatsappId: selectedWhatsappId,
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
        async function fetchWhatsapp() {
            try {
                const response = await fetch(`${baseUrl}/whatsapp/fetch`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setItems(data.whatsapps);
            } catch (err) {
                console.error(err);
            }
        }
        fetchWhatsapp();
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
                <h2 className="text-lg font-bold mb-3">Select a Whatsapp Campaign</h2>
                <ul className="space-y-2">
                    {items?.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => setSelectedWhatsappId(item.whatsappid)}
                            className={`p-2 rounded cursor-pointer ${selectedWhatsappId === item.whatsappid
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 hover:bg-gray-200"
                                }`}
                        >
                            {item.whatsapp_name}
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