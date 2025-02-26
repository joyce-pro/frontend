import React from "react";
import { Trash2 } from "lucide-react";

export default function EmailSearchResultCard({ number, name, status, useremail, onRemove }) {
    const baseUrl = process.env.REACT_APP_API_URL;

    const handleRemoval = async () => {
        try {
            const response = await fetch(`${baseUrl}/email/delete/${useremail}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                // console.log
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            onRemove(useremail);
        } catch (err) {
            console.error(err);
        }
    };

    // Determine status color
    const statusColor = status === "PENDING"
        ? "text-yellow-500"
        : status === "ACCEPTED"
            ? "text-green-500"
            : "text-red-500";

    return (
        <div className="col">
            <div className="cursor-pointer card bg-gray-50 border-2 border-gray-100 shadow-sm rounded-md hover:shadow-lg transition-shadow duration-300">
                <div className="card-body flex justify-between items-center p-4">
                    <h5 className="text-primary text-lg font-bold">({number + 1}) {name}</h5>

                    {/* Status with dynamic color */}
                    <p className={`font-medium ${statusColor}`}>
                        <strong>Status:</strong> {status}
                    </p>

                    <button
                        id="removeFromQueue"
                        onClick={handleRemoval}
                        className="bg-[#fa9939] text-white rounded px-4 py-2 right-0 top-0 transition-transform transform hover:scale-105"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}