import React, { useState } from "react";
import axios from "axios";
import upload from "/upload-file.png";
import uploadService from "../services/upload.service";
import AlertBox from "./Alert";
import ProgressBar from "./ProgressBar";

const UploadFile = () => {
    const [alertMessage, setAlertMessage] = useState('');
    const [isAlertSuccess, setIsAlertSuccess] = useState(true);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileChange(e.dataTransfer.files[0]);
            e.dataTransfer.clearData();
        }
    };

    const handleFileChange = (file: File) => {
        const allowedFileTypes = [
            'text/csv', 'text/xml', 'application/json', 'text/plain',
            'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];

        if (!allowedFileTypes.includes(file.type)) {
            setAlertMessage('File type not allowed. Please select a CSV, XML, JSON, TXT, PDF, DOCX, or XLSX file.');
            setIsAlertSuccess(false);
            return;
        }
        setSelectedFile(file);
        handleFileUpload(file);
    };

    const handleFileUpload = async (file: File) => {
        if (!file) {
            setAlertMessage('No file selected!');
            setIsAlertSuccess(false);
            return;
        }

        try {
            // Use axios or your preferred library for file upload
            const response = await uploadService.uploadFile(file, setUploadProgress);
            if (response.success) {
                console.log('File uploaded and parsed successfully');

                setAlertMessage('File uploaded and parsed successfully');
                setIsAlertSuccess(true);
                setUploadProgress(0);
            }
        } catch (error) {
            console.error('Error during file upload and parsing', error);

            // Log event (simulated)
            console.log('File upload and parse failed', error);

            setAlertMessage('Error during file upload and parsing');
            setIsAlertSuccess(false);
            setUploadProgress(0);
        }
    };

    return (
        <>
            <div className="card m-2 w-75 h-50">
                <div className="card-header">Upload File</div>
                <div className="card-body">
                    <h5 className="card-title">Upload text file</h5>
                    <p className="card-text">
                        Drag and drop your text file or click the Choose File button to manually choose your text file in File Explorer Window.
                    </p>

                    <div
                        className={`dashed-border flex-column card-body h-75 d-flex justify-content-center align-items-center ${isDragOver ? 'drag-over' : ''}`}
                        onDragEnter={handleDragEnter}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <span>
                            <img src={upload} className="upload-logo m-2" alt="arrow right" />
                        </span>
                        <h4 className="upload-label">
                            Drag and Drop your txt file to upload
                        </h4>
                        <h4 className="upload-label">- or -</h4>
                        <button
                            className="btn btn-primary btn-lg my-2"
                            onClick={() => document.getElementById("hiddenFileInput")?.click()}
                        >
                            Choose File...
                        </button>
                        <input
                            type="file"
                            id="hiddenFileInput"
                            style={{ display: "none" }}
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    handleFileChange(e.target.files[0]);
                                }
                            }}
                        />
                    </div>
                    {uploadProgress > 0 && <ProgressBar progress={uploadProgress} />}
                </div>
            </div>

            {alertMessage && (
                <AlertBox
                    message={alertMessage}
                    isSuccess={isAlertSuccess}
                    duration={3000}
                    onClose={() => setAlertMessage('')}
                />
            )}
        </>
    );
};

export default UploadFile;
