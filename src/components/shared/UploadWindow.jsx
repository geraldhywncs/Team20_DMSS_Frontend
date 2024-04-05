import React , {useState} from 'react';

const UploadWindow = ({ closeUploadWindow , onFileUpload }) => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    console.log('success UploadWindow')

    const handleFileUpload = () => {
        if (!selectedFile) {
            setError('Please select a file.');
            return;
        }

        // Pass the selected file to the parent component
        onFileUpload(selectedFile);

        // Close the upload window
        closeUploadWindow();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-8 rounded-md shadow-md">
                <h2 className="text-lg font-semibold mb-4">Select only 1 image file</h2>
                <input type="file" accept="image/*" onChange={handleFileChange} multiple={false}/>
                {error && <p className="text-red-500">{error}</p>}
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleFileUpload}>
                    Upload
                </button>
                <button className="ml-2 text-gray-600 px-4 py-2 rounded-md border border-gray-300" onClick={closeUploadWindow}>
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default UploadWindow;

