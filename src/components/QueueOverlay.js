import React, { useState } from "react";

export default function QueueOverlay({ isOpen, onClose, children, result }) {
    const [name, setName] = useState();
    const [period, setPeriod] = useState();
    const [message, setMessage] = useState();
    const [subject, setSubject] = useState();
    const [followupSubject, setFollowupSubject] = useState();
    const [followupMessage, setFollowupMessage] = useState();
    const [showFollowUpFields, setShowFollowUpFields] = useState(false); // State to toggle follow-up fields

    if (!isOpen) return null;

    const baseUrl = process.env.REACT_APP_API_URL;

    const handleBackdropClick = (e) => {
        if (e.target.id === "outreachModal") {
            onClose();
            setMessage("");
            setName("");
            setPeriod("");
            setFollowupMessage("");
            setFollowupSubject("");
            setSubject("");
        }
    };

    const handleClick = async () => {
        try {
            const response = await fetch(`${baseUrl}/queue/create/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    queueName: name,
                    message,
                    period,
                    followupMessage,
                    followupSubject,
                    subject,
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setMessage("");
            setName("");
            setPeriod("");
            setFollowupMessage("");
            setFollowupSubject("");
            setSubject("");
        } catch (err) {
            console.log(err);
        }
        onClose();
    };

    return (
        <div
            id="overlay-backdrop"
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
        >
            <section id="profile" className="text-gray-900">
                <div id="outreachModal" className="fixed inset-0 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg w-[700px] max-h-[750px] overflow-y-auto">
                        <h2 className="text-xl font-bold text-center mb-4 bg-yellow-500 p-2 text-white">
                            Outreach Panel
                        </h2>
                        <label htmlFor="campaignName" className="block text-gray-700 font-semibold mb-2">
                            Outreach Queue Name
                        </label>
                        <input
                            id="campaignName"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                            placeholder="Enter queue name"
                        />

                        <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">
                            Subject
                        </label>
                        <textarea
                            id="subject"
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Enter your Subject"
                            rows="1"
                        ></textarea>

                        <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter your message"
                            rows="8"
                        ></textarea>

                        <label className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={showFollowUpFields}
                                onChange={(e) => setShowFollowUpFields(e.target.checked)}
                            />
                            Show Follow-Up Fields
                        </label>

                        {showFollowUpFields && (
                            <>
                                <label htmlFor="period" className="block text-gray-700 font-semibold mb-2">
                                    Period
                                </label>
                                <input
                                    id="period"
                                    className="w-full p-2 border border-gray-300 rounded mb-4"
                                    value={period}
                                    onChange={(e) => setPeriod(e.target.value)}
                                    placeholder="Enter your period"
                                ></input>
                                <label
                                    htmlFor="followupSubject"
                                    className="block text-gray-700 font-semibold mb-2"
                                >
                                    Follow-Up Subject
                                </label>
                                <textarea
                                    id="followupSubject"
                                    className="w-full p-2 border border-gray-300 rounded mb-4"
                                    value={followupSubject}
                                    onChange={(e) => setFollowupSubject(e.target.value)}
                                    placeholder="Enter your follow-up subject"
                                    rows="1"
                                ></textarea>

                                <label
                                    htmlFor="followupMessage"
                                    className="block text-gray-700 font-semibold mb-2"
                                >
                                    Follow-Up Message
                                </label>
                                <textarea
                                    id="followupMessage"
                                    className="w-full p-2 border border-gray-300 rounded mb-4"
                                    value={followupMessage}
                                    onChange={(e) => setFollowupMessage(e.target.value)}
                                    placeholder="Enter your follow-up message"
                                    rows="8"
                                ></textarea>
                            </>
                        )}

                        <div className="flex justify-center">
                            <button
                                onClick={handleClick}
                                className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
