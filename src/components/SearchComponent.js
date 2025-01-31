import React, { useEffect, useState } from "react";
import Overlay from "./Overlay";
import { QueueListOverlay } from "./QueueListOverlay";

export default function SearchResultCard({ number, name, company, experience, firstname, result, user_url, userurn }) {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [queueOverlay, setQueueOverlay] = useState(false);

    const toggleOverlay = (e) => {
        if (e.target.id == "profileOverlay")
            setIsOverlayOpen(!isOverlayOpen);
        // else if(e.target.id == "")
        if (e.target.id == "addToQueue") setQueueOverlay(!queueOverlay);
    };

    return (
        <div className="col">
            <div
                id="profileOverlay"
                onClick={toggleOverlay}
                className="cursor-pointer card bg-gray-50 border-2 border-gray-100 shadow-sm rounded-md hover:shadow-lg transition-shadow duration-300"
            >
                <div id="profileOverlay" className="card-body flex justify-between items-center p-4">
                    <h5 id="profileOverlay" className="text-primary text-lg font-bold">({number + 1}) {name}</h5>
                    <div id="profileOverlay" className="text-right">
                        <p id="profileOverlay" className="text-secondary font-medium">
                            <strong>Company:</strong> {company}
                        </p>
                        <p id="profileOverlay" className="text-muted">
                            <strong>Experience:</strong> {experience}
                        </p>

                    </div>
                    <button id="addToQueue" className="bg-[#fa9939] text-white rounded px-4 py-2 right-0 top-0 transition-transform transform hover:scale-105" >Add to a queue</button>
                </div>
            </div>

            {/* Overlay for detailed information */}
            <Overlay isOpen={isOverlayOpen} result={result} onClose={() => setIsOverlayOpen(false)} />
            <QueueListOverlay id={"dialogue"} username={firstname} user_url={user_url} userurn={userurn} isOpen={queueOverlay} onClick={() => setQueueOverlay(!queueOverlay)} onClose={() => setQueueOverlay(false)} />
        </div>
    );
}
