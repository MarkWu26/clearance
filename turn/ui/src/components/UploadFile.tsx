import React, { useState } from "react";
import axios from "axios";
import upload from "/upload-file.png";
import uploadService from "../services/upload.service";
import AlertBox from "./Alert";
import ProgressBar from "./ProgressBar";

const UploadFile = () => {
    const [alertMessage, setAlertMessage] = useState('');
    const [isAlertSuccess, setIsAlertSuccess] = useState(true);
    const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
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
      
        if (e.dataTransfer.files) {
          handleFileChange(e.dataTransfer.files); // Pass the entire FileList
          e.dataTransfer.clearData();
        }
      };

      const handleFileChange = (files: FileList) => {
        const allowedFileTypes = [
          'text/csv', 'text/xml', 'application/json', 'text/plain',
          'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];
      
        const validFiles: File[] = []; // Initialize as an array of File objects
      
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if (allowedFileTypes.includes(file.type)) {
            validFiles.push(file);
          }
        }
      
        if (validFiles.length === 0) {
          setAlertMessage('File types not allowed. Please select CSV, XML, JSON, TXT, PDF, DOCX, or XLSX files.');
          setIsAlertSuccess(false);
          return;
        }
      
        // Directly update state with the original FileList (optional)
        // setSelectedFiles(files); // If you want to store the entire FileList
      
        // Or, update state with the filtered valid files array
        setSelectedFiles(validFiles);
      
        // Handle batch file uploads in handleFileUpload
        handleFileUpload(validFiles);
      };
      
      const handleFileUpload = async (files: File[]) => { // Update parameter type to File[]
        if (!files || files.length === 0) {
          setAlertMessage('No files selected!');
          setIsAlertSuccess(false);
          return;
        }
      
        try {
          // Iterate through files and upload them individually
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
      
            // Use axios or your preferred library for file upload
            const response = await uploadService.uploadFile(file, setUploadProgress); // Pass individual files
      
            if (response.success) {
              console.log(`File "${file.name}" uploaded and parsed successfully`);
            } else {
              console.error(`Error uploading file "${file.name}":`, response.error);
              // Handle specific error messages for failed uploads (optional)
            }
          }
      
          setAlertMessage(`${files.length} files uploaded.`);
          setIsAlertSuccess(true);
          setUploadProgress(0);
        } catch (error) {
          console.error('Error during file uploads:', error);
          setAlertMessage('Error during file uploads.');
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
                            multiple
                            style={{ display: "none" }}
                            onChange={(e) => {
                                if (e.target.files) {
                                    handleFileChange(e.target.files);
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
