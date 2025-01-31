import React, { useEffect, useState } from "react";

export const QueueListOverlay = ({ isOpen, onClose, userurn, username, user_url }) => {
    const [items, setItems] = useState([]);
    const [selectedQueueId, setSelectedQueueId] = useState(null);

    const baseUrl = process.env.REACT_APP_API_URL;

    const handleClick = async () => {
        try {
            const response = await fetch(`${baseUrl}/queue/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    queueId: selectedQueueId,
                    userName: username,
                    userUrl: user_url,
                    acceptStatus: "UNRESOLVED",
                    userUrn: userurn,
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (err) {
            console.error(err);
        }
        onClose();
    };


    useEffect(() => {
        async function fetchQueue() {
            try {
                const response = await fetch(`${baseUrl}/queue/fetch`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setItems(data.queues);
            } catch (err) {
                console.error(err);
            }
        }
        fetchQueue();
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
                <h2 className="text-lg font-bold mb-3">Select a Queue</h2>
                <ul className="space-y-2">
                    {items?.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => setSelectedQueueId(item.queueid)}
                            className={`p-2 rounded cursor-pointer ${selectedQueueId === item.queueid
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 hover:bg-gray-200"
                                }`}
                        >
                            {item.queue_name}
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
