import React, { useState } from "react";
import Overlay from "./Overlay";

export default function SearchResultCard({ number, name, company, experience, result }) {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    const toggleOverlay = () => {
        setIsOverlayOpen(!isOverlayOpen);
    };

    return (
        <div className="col">
            <div
                onClick={toggleOverlay}
                className="cursor-pointer card bg-gray-50 border-2 border-gray-100 shadow-sm rounded-md hover:shadow-lg transition-shadow duration-300"
            >
                <div className="card-body flex justify-between items-center p-4">
                    <h5 className="text-primary text-lg font-bold">({number + 1}) {name}</h5>
                    <div className="text-right">
                        <p className="text-secondary font-medium">
                            <strong>Company:</strong> {company}
                        </p>
                        <p className="text-muted">
                            <strong>Experience:</strong> {experience}
                        </p>
                    </div>
                </div>
            </div>

            {/* Overlay for detailed information */}
            <Overlay isOpen={isOverlayOpen} result={result} onClose={() => setIsOverlayOpen(false)} />
            {/* <h2 className="text-xl font-bold mb-4">{name}</h2>
                <p className="text-gray-700 mb-2">
                    <strong>Company:</strong> {company}
                </p>
                <p className="text-gray-700">
                    <strong>Experience:</strong> {experience}
                </p> */}
            {/* </Overlay> */}
        </div>
    );
}
