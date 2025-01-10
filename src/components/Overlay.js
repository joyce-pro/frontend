import React from "react";

export default function Overlay({ isOpen, onClose, children, result }) {
    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target.id === "overlay-backdrop") {
            onClose();
        }
    };

    return (
        <div
            id="overlay-backdrop"
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
        >
            <div className="bg-white p-8 rounded-2xl shadow-xl relative w-4/5 max-w-4xl overflow-y-auto scrollbar-none hide-scrollbar max-h-screen">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
                >
                    ✖
                </button>
                {/* Profile Section */}
                <section id="profile" className="text-gray-900">
                    <div className="container mx-auto">
                        <div className="bg-white shadow-md rounded-lg p-8">
                            {/* Profile Header */}
                            <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
                                <div className="flex-1 text-center md:text-left">
                                    {/* {result} */}
                                    <a href={result?.publicprofileurl} target="_blank" class="no-underline text-inherit">
                                        <h3 className="text-primary text-3xl font-bold mb-2">{result?.firstname} {result?.lastname}</h3>
                                    </a>
                                    <p className="text-gray-500 text-lg"><strong>Headline:</strong> {result?.headline}</p>
                                    {/* <p className="text-gray-500 text-lg">Location: {result?.location}</p> */}
                                    <p className="text-gray-500 text-lg"><strong>Email: </strong>{result?.contactemail}</p>
                                    <p className="text-gray-500 text-lg"><strong>Industry: </strong>{result?.industryname}</p>
                                    {/* <p className="text-gray-500 text-lg"><strong>LinkedinUrl: </strong>{result?.publicprofileurl}</p> */}

                                </div>
                            </div>
                            <hr className="mb-8" />
                            {/* Professional Experience */}
                            <h5 className="text-secondary text-2xl font-semibold mb-6">Professional Experience</h5>
                            <ul className="list-none space-y-6 mb-8">
                                {
                                    result?.workexperience?.map((item, index) => (
                                        <li key={index} className="flex flex-col">
                                            <strong className="text-lg">{item?.companyName}</strong>
                                            <span className="text-gray-500">{item?.startYear} - {item?.endYear} - {item?.title}</span>
                                        </li>
                                    ))
                                }

                            </ul>
                            <hr className="mb-8" />
                            {/* Educational Background */}
                            <h5 className="text-secondary text-2xl font-semibold mb-6">Educational Background</h5>
                            <ul className="list-none space-y-6 mb-8">
                                {
                                    result?.educations?.map((item, index) => (
                                        <li key={index} className="flex flex-col">
                                            <strong className="text-lg">{item?.degreeName}</strong>
                                            <span className="text-gray-500">{item?.schoolName} - {item?.startYear} - {item?.endYear}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                            <hr className="mb-8" />
                            {/* Skills */}
                            {/* <h5 className="text-secondary text-2xl font-semibold mb-6">Skills</h5>
                            <div className="flex flex-wrap gap-3 mb-8">
                                {[
                                    "Renewable Energy",
                                    "Project Management",
                                    "Data Analysis",
                                    "Team Leadership",
                                    "Sustainability Solutions",
                                    "Strategic Planning",
                                ].map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-blue px-4 py-2 rounded-full text-base"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div> */}
                            <hr className="mb-8" />
                            {/* Location */}
                            <h5 className="text-secondary text-2xl font-semibold mb-6">Location</h5>
                            <p className="text-lg">{result?.location}</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>


    );
}
