import { useState } from "react";

const AddCSVOverlay = ({ isOpen, onClose, onSubmit }) => {
    const [name, setName] = useState("");
    const [file, setFile] = useState(null);

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (name && file) {
            onSubmit(name, file);
            onClose();
        } else {
            alert("Please enter a name and select a file.");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-bold mb-4">Upload CSV</h2>
                <input
                    type="text"
                    placeholder="Enter Name"
                    className="border p-2 w-full mb-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="file"
                    accept=".csv"
                    className="border p-2 w-full mb-3"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <div className="flex justify-end">
                    <button className="px-4 py-2 bg-gray-300 rounded mr-2" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddCSVOverlay;
