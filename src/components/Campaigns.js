import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const { DateTime } = require('luxon');

function CampaignResultCard({ id, campaignname, created_at }) {
    const navigate = useNavigate();
    const localTime = DateTime.fromISO(created_at, { zone: "utc" }) // Parse as UTC
        .setZone("Asia/Kolkata") // Adjust to Asia/Kolkata timezone
        .toFormat("dd MMMM yyyy, hh:mm:ss a");
    const handleNavigate = (id) => {
        navigate(`/${id}`); // Navigate to the path "/:id"
    };



    return (
        <div onClick={() => handleNavigate(id)} className="bg-gray-50 border border-gray-200 shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between">
            <h5 className="text-primary text-2xl font-bold mb-4">{campaignname}</h5>
            <div>
                {/* <p>{localTime}</p> */}
            </div>
        </div>
    )
};

export default function CampaignResults() {
    const [results, setResults] = useState();


    useEffect(() => {
        const handleSearch = async () => {

            try {
                const response = await fetch(`http://localhost:5000/fetch-campaign`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setResults(data);
            } catch (err) {
                // setError(err.message);
                console.log(err)
            } // Handle the API response

        };
        handleSearch();
    }, []);

    return (
        <section id="search-results" className="pt-20 mt-20 text-gray-900">
            <div className="container mx-auto px-4" data-aos="fade-up">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-6">Campaigns</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {results && results.length > 0 ? (
                            results.map((result, index) => (
                                <CampaignResultCard key={index} {...result} />
                            ))
                        ) : (
                            <p className="text-gray-500 col-span-full">No results found.</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
