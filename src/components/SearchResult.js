import React, { useState, useEffect } from "react";
import SearchResultCard from "./SearchComponent";
import { useParams } from "react-router-dom";
import { unparse } from "papaparse";
import { QueueListCampaignOverlay } from "./QueueListCampaignOverlay";
import { ConnectionListCampaignOverlay } from "./ConnectionListCampaignOverlay";
import { WhatsappListCampaignOverlay } from "./WhatsappListCampaign";
import { EmailListCampaignOverlay } from "./EmailListCampaign";


export default function SearchResults() {
    const [results, setResults] = useState([]);
    const { id } = useParams();
    const baseUrl = process.env.REACT_APP_API_URL
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [isConnectionOverlayOpen, setIsConnectionOverlayOpen] = useState(false);
    const [isWhatsappOverlayOpen, setIsWhatsappOverlayOpen] = useState(false);
    const [isEmailOverlayOpen, setIsEmailOverlayOpen] = useState(false);



    const toggleOverlay = (e) => {
        // if (e.target.id == "profileOverlay")
        setIsOverlayOpen(!isOverlayOpen);
    };


    // const [query, setQuery] = useState("");
    useEffect(() => {
        const handleSearch = async () => {
            if (!id) {
                alert("Please enter a search term.");
                return;
            }
            try {
                try {
                    const response = await fetch(`${baseUrl}/extension/fetch-data/${id}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const data = await response.json();
                    setResults(data);
                } catch (err) {
                    // setError(err.message);
                    console.log(err)
                } // Handle the API response
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        handleSearch();
    }, []);


    const processDataForCSV = (data) => {
        return data.map((item, index) => ({
            id: index + 1, // Row number as ID
            dbid: item.dbid || "", // If `dbid` exists in your data
            firstname: item.firstname || "",
            lastname: item.lastname || "",
            location: item.location || "",
            headline: item.headline || "",
            industryname: item.industryname || "",
            contactemail: item.contactemail || "",
            publicprofileurl: item.publicprofileurl || "",
            educations: item.educations ? JSON.stringify(item.educations) : "[]", // Preserve as JSON string
            workexperience: item.workexperience
                ? JSON.stringify(item.workexperience)
                : "[]", // Preserve as JSON string
        }));
    };

    const DownloadCSV = (data) => {


        const parsedData = processDataForCSV(data);
        const csvContent = unparse(parsedData);

        // Create Blob and trigger download
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "data.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <section id="search-results" className="pt-7 mt-20 bg-primary text-gray-900">
                <div className="container mx-auto px-4" data-aos="fade-up">
                    <div className="relative mb-6">
                        <h2 className="text-3xl font-bold text-center">Search Results</h2>
                        <div className="flex justify-between mt-4">
                            {/* Left Side Buttons */}
                            <div className="flex space-x-4">
                                <button
                                    className="bg-black text-white px-4 py-2 rounded transition-transform transform hover:scale-105"
                                    onClick={() => setIsOverlayOpen(!isOverlayOpen)}
                                >
                                    Add All To Queue
                                </button>
                                <button
                                    className="bg-black text-white px-4 py-2 rounded transition-transform transform hover:scale-105"
                                    onClick={() => setIsConnectionOverlayOpen(!isConnectionOverlayOpen)}
                                >
                                    Add All To Connection Campaign
                                </button>
                                <button
                                    className="bg-black text-white px-4 py-2 rounded transition-transform transform hover:scale-105"
                                    onClick={() => setIsEmailOverlayOpen(!isEmailOverlayOpen)}
                                >
                                    Add All To Email Outreach
                                </button>
                                <button
                                    className="bg-black text-white px-4 py-2 rounded transition-transform transform hover:scale-105"
                                    onClick={() => setIsWhatsappOverlayOpen(!isWhatsappOverlayOpen)}
                                >
                                    Add All To Whatsapp Outreach
                                </button>
                            </div>

                            {/* Right Side Button */}
                            <button
                                className="bg-black text-white px-4 py-2 rounded transition-transform transform hover:scale-105"
                                onClick={() => DownloadCSV(results)}
                            >
                                Download CSV Data
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {results && results.length > 0 ? (
                            results.map((result, index) => (
                                <SearchResultCard
                                    key={index}
                                    name={result.firstname + " " + result.lastname}
                                    firstname={result.firstname}
                                    company={result.workexperience[0]?.companyName}
                                    experience={result.workexperience[0]?.title}
                                    result={result}
                                    number={index}
                                    user_url={result.publicprofileurl}
                                    userurn={result.userurn}
                                />
                            ))
                        ) : (
                            <p>No results found.</p>
                        )}
                    </div>
                </div>
            </section>
            <QueueListCampaignOverlay isOpen={isOverlayOpen} campaignId={id} onClose={() => setIsOverlayOpen(false)} />
            <ConnectionListCampaignOverlay isOpen={isConnectionOverlayOpen} campaignId={id} onClose={() => setIsConnectionOverlayOpen(false)} />
            <WhatsappListCampaignOverlay isOpen={isWhatsappOverlayOpen} campaignId={id} onClose={() => setIsWhatsappOverlayOpen(false)} />
            <EmailListCampaignOverlay isOpen={isEmailOverlayOpen} campaignId={id} onClose={() => setIsEmailOverlayOpen(false)} />

        </>
    );
};