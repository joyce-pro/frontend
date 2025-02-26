import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddCSVOverlay from "./AddCsv";
import Papa from "papaparse";
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
                <p>{localTime}</p>
            </div>
        </div>
    )
};

export default function CampaignResults() {
    const [results, setResults] = useState();
    const [isOverlayOpen, setOverlayOpen] = useState(false);
    const baseUrl = process.env.REACT_APP_API_URL


    useEffect(() => {
        const handleSearch = async () => {

            try {
                const response = await fetch(`${baseUrl}/extension/fetch-campaign`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response}`);
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

    const handleSubmit = (name, file) => {
        console.log("Name:", name);
        console.log("File:", file);

        if (!file) {
            alert("Please select a file.");
            return;
        }

        const reader = new FileReader();

        reader.onload = async ({ target }) => {
            const csvData = target.result;

            // Parse CSV into JSON
            Papa.parse(csvData, {
                header: true,
                skipEmptyLines: true,
                complete: async function (results) {
                    console.log("Parsed CSV Data:", results.data);

                    // Format the data to match your API's expected structure
                    const formattedData = {};
                    results.data.forEach((row, index) => {
                        formattedData[`user_${index}`] = {
                            firstName: row.firstname,
                            lastName: row.lastname,
                            location: row.location,
                            headline: row.headline,
                            industryName: row.industryname,
                            contactEmail: row.contactemail || "",
                            publicProfileUrl: row.publicprofileurl,
                            educations: JSON.parse(row.educations || "[]"),
                            workExperience: JSON.parse(row.workexperience || "[]"),
                            userUrn: row.publicprofileurl?.split("/").pop() || "",
                            dbId: name, // Using 'name' as campaign ID or any identifier
                        };
                    });

                    console.log("Formatted JSON:", formattedData);

                    // Send JSON to Backend
                    try {
                        const response = await fetch(`${baseUrl}/extension/add-multiple-data`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(formattedData),
                        });

                        const result = await response.json();
                        if (response.ok) {
                            alert("Data uploaded successfully.");
                        } else {
                            alert("Error: " + result.error);
                        }
                    } catch (error) {
                        console.error("Error sending data:", error);
                    }
                },
            });
        };

        reader.readAsText(file);
    };

    return (
        <section id="search-results" className="pt-20 mt-20 text-gray-900">
            <div className="container mx-auto px-4" data-aos="fade-up">
                <div className="relative mb-6">
                    <h2 className="text-3xl font-bold text-center text-[#fa9939]">Campaigns</h2>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded absolute right-0 top-0 transition-transform transform hover:scale-105"
                        onClick={() => setOverlayOpen(true)}
                    >
                        Upload CSV
                    </button>
                </div>
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
            <AddCSVOverlay
                isOpen={isOverlayOpen}
                onClose={() => setOverlayOpen(false)}
                onSubmit={handleSubmit}
            />
        </section>


    );
}
