import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QueueSearchResultCard from "./QueueComponent";

export default function QueueResults() {
    const [results, setResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [filterStatus, setFilterStatus] = useState("all");
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState(""); // Store dynamic popup messages
    const { id } = useParams();
    const baseUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const handleSearch = async () => {
            if (!id) {
                alert("Please enter a search term.");
                return;
            }
            try {
                const response = await fetch(`${baseUrl}/queue/fetch/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setResults(data.queue);
                setFilteredResults(data.queue);
            } catch (err) {
                console.log(err);
            }
        };
        handleSearch();
    }, [id]);

    useEffect(() => {
        if (filterStatus === "all") {
            setFilteredResults(results);
        } else {
            setFilteredResults(results.filter(result => result.accept_status === filterStatus));
        }
    }, [filterStatus, results]);

    const CheckStatus = async () => {
        try {
            const response = await fetch(`${baseUrl}/inbox/getFeed/`);
            if (response.status === 409) {
                setPopupMessage("Instance already running");
            } else if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                setPopupMessage("Checking status...");
            }

            // Show popup for 3 seconds
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
        } catch (err) {
            console.log(err);
        }
    };

    const handleRemoveFromQueue = (userurn) => {
        setResults((prevQueue) => prevQueue.filter((item) => item.userurn !== userurn));
    };

    return (
        <>
            <section id="search-results" className="pt-7 mt-20 bg-primary text-gray-900 relative">
                <div className="container mx-auto px-4" data-aos="fade-up">
                    <div className="relative mb-6 flex justify-between items-center">
                        <h2 className="text-3xl font-bold">Search Results</h2>
                        <div className="flex gap-4">
                            <select
                                className="px-4 py-2 border rounded bg-white text-gray-900"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="all">All</option>
                                <option value="ACCEPTED">Accepted</option>
                                <option value="PENDING">Pending</option>
                                <option value="DECLINED">Declined</option>
                                <option value="UNRESOLVED">Unresolved</option>
                            </select>
                            <button
                                className="bg-black text-white px-4 py-2 rounded transition-transform transform hover:scale-105"
                                onClick={CheckStatus}
                            >
                                Check Status
                            </button>
                        </div>
                    </div>

                    {/* Results Grid */}
                    <div className="grid grid-cols-1 gap-6">
                        {filteredResults.length > 0 ? (
                            filteredResults.map((result, index) => (
                                <QueueSearchResultCard
                                    key={index}
                                    name={result.username}
                                    status={result.accept_status}
                                    userurn={result.userurn}
                                    number={index}
                                    onRemove={handleRemoveFromQueue}
                                />
                            ))
                        ) : (
                            <p>No results found.</p>
                        )}
                    </div>

                    {/* Popup Notification */}
                    {showPopup && (
                        <div className="absolute top-10 right-10 bg-black text-white text-sm px-4 py-2 rounded-md shadow-lg">
                            {popupMessage}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

