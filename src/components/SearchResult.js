import React, { useState, useEffect } from "react";
import SearchResultCard from "./SearchComponent";
import { useParams } from "react-router-dom";
import { unparse } from "papaparse";


export default function SearchResults() {
    const [results, setResults] = useState([]);
    const { id } = useParams();
    // const [query, setQuery] = useState("");
    useEffect(() => {
        const handleSearch = async () => {
            if (!id) {
                alert("Please enter a search term.");
                return;
            }
            try {
                try {
                    const response = await fetch(`http://localhost:5000/fetch-data/${id}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const data = await response.json();
                    console.log(data);
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

        // const flattenData = (data) => {
        //     const flattenData = data.map(items=>{
        //         campaignid: data.campaignid,
        //         contactemail: data.contactemail || "",
        //         firstname: data.firstname,
        //         lastname: data.lastname,
        //         location: data.location,
        //         headline: data.headline,
        //         industryname: data.industryname,
        //         publicprofileurl: data.publicprofileurl,
        //         educations: data.educations?.map((edu) => `${edu.degree} (${edu.year})`).join("; "),
        //         workexperience: data.workexperience?.map((exp) => `${exp.company}: ${exp.role} (${exp.years} years)`).join("; "),
        //     })
        //     return {

        //     };
        // };

        // const downloadCSV = (data) => {
        // const flatData = flattenData(data);

        // // Create CSV header and rows
        // const headers = Object.keys(flatData).join(",");
        // const row = Object.values(flatData).map((value) => `"${value}"`).join(",");

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
        // };
        // downloadCSV(data)

        // return <button onClick={downloadCSV}>Download CSV</button>;
    };

    return (
        <>
            {/* <div className="bg-primary flex items-center space-x-4 mt-20">
                
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter your search query"
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-primary"
                />
                
                <button
                    onClick={handleSearch}
                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
                >
                    Search
                </button>
            </div> */}
            <section id="search-results" className="pt-7 mt-20 bg-primary text-gray-900">
                <div className="container mx-auto px-4" data-aos="fade-up">
                    <div className="relative mb-6">
                        <h2 className="text-3xl font-bold text-center">Search Results</h2>
                        <button
                            className="bg-black text-white px-4 py-2 rounded absolute right-0 top-0 transition-transform transform hover:scale-105"
                            onClick={() => DownloadCSV(results)}
                        >
                            Download CSV data
                        </button>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                        {results && results.length > 0 ? (
                            results.map((result, index) => (
                                <SearchResultCard
                                    key={index}
                                    name={result.firstname + " " + result.lastname}
                                    company={result.workexperience[0]?.companyName}
                                    experience={result.workexperience[0]?.title}
                                    result={result}
                                    number={index}
                                />
                            ))
                        ) : (
                            <p>No results found.</p>
                        )}
                    </div>
                </div>
            </section>


        </>
    );
};