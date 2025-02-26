import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EmailSearchResultCard from "./EmailComponent";

export default function EmailResults() {
    const [results, setResults] = useState([]);
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
                const response = await fetch(`${baseUrl}/email/fetch/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setResults(data.email);
                console.log(data)
            } catch (err) {
                console.log(err);
            }
        };
        handleSearch();
    }, [id]);



    const handleRemoveFromQueue = (useremail) => {
        setResults((prevQueue) => prevQueue.filter((item) => item.useremail !== useremail));
    };

    return (
        <>
            <section id="search-results" className="pt-7 mt-20 bg-primary text-gray-900 relative">
                <div className="container mx-auto px-4" data-aos="fade-up">
                    <div className="relative mb-6">
                        <h2 className="text-3xl font-bold text-center">Email Campaign Results</h2>
                        {/* <button
                            className="bg-black text-white px-4 py-2 rounded absolute right-0 top-0 transition-transform transform hover:scale-105"
                            onClick={CheckStatus}
                        >
                            Check Status
                        </button> */}
                    </div>

                    {/* Results Grid */}
                    <div className="grid grid-cols-1 gap-6">
                        {results.length > 0 ? (
                            results.map((result, index) => (
                                <EmailSearchResultCard
                                    key={index}
                                    name={result.username}
                                    status={result.accept_status}
                                    useremail={result.useremail}
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