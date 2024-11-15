import React, { useState, useEffect, useRef } from 'react';
import '../../App.css';
import './index.css';
import Loading from "../Loading/Loading";
import useStore from '../../store';
import {useNavigate} from "react-router-dom";

function Index() {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dropAreaRef = useRef(null);  // Create a ref for the drop area
  const navigate = useNavigate();

  const {
    questions,
    results,
    addQuestion,
    addResult,
  } = useStore();

  useEffect(() => {
    const dropArea = dropAreaRef.current;

    // Prevent default browser behavior
    const preventDefaults = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    // Event handler to handle the drop
    const handleDrop = (e) => {
      preventDefaults(e);
      const newFiles = e.dataTransfer.files;
      handleFiles(newFiles);
    };

    // Event handlers for drag events
    const handleDragEnter = (e) => {
      dropArea.classList.add('highlight');
    };

    const handleDragLeave = (e) => {
      dropArea.classList.remove('highlight');
    };

    const handleDragOver = (e) => {
      preventDefaults(e);
      dropArea.classList.add('over');
    };

    // Attach event listeners
    dropArea.addEventListener('dragenter', handleDragEnter);
    dropArea.addEventListener('dragleave', handleDragLeave);
    dropArea.addEventListener('dragover', handleDragOver);
    dropArea.addEventListener('drop', handleDrop);

    // Cleanup event listeners when the component is unmounted
    return () => {
      dropArea.removeEventListener('dragenter', handleDragEnter);
      dropArea.removeEventListener('dragleave', handleDragLeave);
      dropArea.removeEventListener('dragover', handleDragOver);
      dropArea.removeEventListener('drop', handleDrop);
    };
  }, []);

  // Handle files selected or dropped
  const handleFiles = (newFiles) => {
    const filesArray = Array.from(newFiles);
    setFiles(filesArray);
    // console.log('Selected or dropped files:', filesArray);
  };

  const uploadFiles = async () => {
    const formData = new FormData();
    formData.append('class_file', files[0]);

    setIsLoading(() => true);

    try {
      const response = await fetch('http://localhost:3001/submit/file', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        // console.log('Files uploaded successfully: ', data);

        data.forEach(question => {
          addQuestion(question)
        });

        navigate('/question');

      } else {
        console.error('File failed to upload: ', response.statusText);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="main">
      <h1>PEG</h1>
        <div>
          <div className="container-1">
            <h2>Drag and drop your course materials.</h2>
            <div className="container-3">
              <p>Upload your practice exam and answer key to generate personalized tests and answer keys.</p>
              <p>Upload your files as a PDF.</p>
            </div>
            <div className="container-2" ref={dropAreaRef}>
              <form className="form">
              
              <p>Drag & Drop your files or Browse</p>
              <input
                type="file"
                id="fileElem"
                multiple
                accept="application/pdf"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </form>
          </div>
          <button className="submit-button" onClick={uploadFiles}>Submit</button>
        </div>



        {/* Test Buttons Below
        <div>
          <Link to={'/loading'}>Loading</Link>
          <Link to={'/question'}>Question</Link>
          <Link to={'/feedback'}>Feedback</Link>
        </div>*/}
      </div>

      {/* Display selected or dropped files */}
      <div className="dropped-files">
        {files.length > 0 && (
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}

export default Index;

