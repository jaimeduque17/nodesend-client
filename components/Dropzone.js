import React, { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import clientAxios from '../config/axios';
import appContext from '../context/app/appContext';

const Dropzone = () => {

    const AppContext = useContext(appContext);
    const { showAlert, uploadFile, loading, createLink } = AppContext;

    const onDropAccepted = useCallback(async (acceptedFiles) => {
        // create a form data
        const formData = new FormData();
        FormData.append('file', acceptedFiles[0]);
        uploadFile(formData, acceptedFiles[0].path);
    });

    const onDropRejected = () => {
        showAlert('Can\'t upload file');
    }

    // extract dropzone content
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDropAccepted, onDropRejected, maxSize: 1000000 });

    const files = acceptedFiles.map(file => (
        <li key={file.lastModified} className="bg-white flex-1 p-3 mb-4 shadow-lg rounded">
            <p className="font-bold text-xl">{file.path}</p>
            <p className="text-sm text-gray-500">{(file.size / Math.pow(1024, 2)).toFixed(4)} MB</p>
        </li>
    ));

    return (
        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-500 border-2 bg-gray-100 px-4">
            {acceptedFiles.length > 0
                ? (
                    <div className="mt-10 w-full">
                        <h4 className="text-2xl font-bold text-center mb-4">Files</h4>
                        <ul>
                            {files}
                        </ul>
                        {loading
                            ? <p className="my-10 text-center text-gray-600">Uploading file</p>
                            : (<button className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
                                type="button"
                                onClick={() => createLink()}
                            >
                                Create Link
                            </button>)
                        }
                    </div>
                )
                : (
                    <div {...getRootProps({ className: "dropzone w-full py-32" })}>
                        <input className="h-100" {...getInputProps()} />

                        {isDragActive
                            ? <p className="text-2xl text-center text-gray-600">Drop the file</p>
                            : <div className="text-center">
                                <p className="text-2xl text-center text-gray-600">Select a file and drag it here</p>
                                <button className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800" type="button">
                                    Select files to upload
                        </button>
                            </div>
                        }
                    </div>
                )
            }
        </div>
    );
}

export default Dropzone;