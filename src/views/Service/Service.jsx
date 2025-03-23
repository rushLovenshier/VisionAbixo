import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import './Service.css';

const Service = () => {
  const [leftEye, setLeftEye] = useState(null);
  const [rightEye, setRightEye] = useState(null);
  const [notification, setNotification] = useState('');
  const [apiDiagnosis, setPredictedDiagnosis] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isHealthy, setIsHealthy] = useState(false);

  const isBothScansUploaded = leftEye !== null && rightEye !== null;

  const leftInputRef = useRef(null);
  const rightInputRef = useRef(null);

  const onDropLeft = (acceptedFiles) => {
    setLeftEye(acceptedFiles[0]);
  };

  const onDropRight = (acceptedFiles) => {
    setRightEye(acceptedFiles[0]);
  };

  const { getRootProps: getLeftProps, getInputProps: getLeftInputProps } = useDropzone({
    onDrop: onDropLeft,
    accept: {
      'image/jpeg': []
    }
    ,
    noClick: true,
    noKeyboard: true,
  });

  const { getRootProps: getRightProps, getInputProps: getRightInputProps } = useDropzone({
    onDrop: onDropRight,
    accept: {
      'image/jpeg': []
    },
    noClick: true,
    noKeyboard: true,
  });

  const removeLeftImage = () => setLeftEye(null);
  const removeRightImage = () => setRightEye(null);
  const notify = () => {
    setNotification('Uploading to model...');
    setTimeout(() => setNotification(''), 3000); //to hide notification after
  }
  const uploadImages = async () => {
    if (!isBothScansUploaded) return;
    
    const formData = new FormData();
    formData.append('leftEye', leftEye); // Append left eye image
    formData.append('rightEye', rightEye); // Append right eye image

    try {
      notify();
      const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
        
      });
      
      setNotification('Upload successful!');
      setPredictedDiagnosis(response.data.prediction); 
      setIsHealthy(response.data.prediction === "healthy")
      setTimeout(() => setNotification(''), 3000); 
      setTimeout(() => {
        setShowResult(true);
      }, 4000);
    } catch (error) {
      setNotification('Upload failed. Try again.');
      setTimeout(() => setNotification(''), 5000); 
    }
  };

  return (
    <div className="about-container" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Age-Related Macular Degeneration Classifier</h1>
      <p></p>
      <br />
    
    <div className="eye-upload-container">
      {/* OCT Upload */}
      <div className="upload-section">
        <div className="upload-box" {...getLeftProps()}>
          <input {...getLeftInputProps()} ref={leftInputRef} />
          {leftEye ? (
            <img src={URL.createObjectURL(leftEye)} alt="OCT Preview" className="preview-image" />
          ) : (
            <p>Drag & drop or click to upload OCT scan</p>
          )}
        </div>
        <div className="button-container">
          <button
            className="upload-btn"
            onClick={() => leftInputRef.current.click()}
              //document.querySelector("input[type='file']").click()}
          >
            Upload OCT
          </button>
          <button
            className="remove-btn"
            onClick={removeLeftImage}
            disabled={!leftEye}
          >
            Remove OCT
          </button>
        </div>
      </div>

      {/* FundusUpload */}
      <div className="upload-section">
        <div className="upload-box" {...getRightProps()}>
          <input {...getRightInputProps()} ref={rightInputRef} />
          {rightEye ? (
            <img src={URL.createObjectURL(rightEye)} alt="FundusPreview" className="preview-image" />
          ) : (
            <p>Drag & drop or click to upload Funduscopic scan</p>
          )}
        </div>
        <div className="button-container">
          <button
            className="upload-btn"
            onClick={() => rightInputRef.current.click()}
           
          >
            Upload Fundus 
          </button>
          <button
            className="remove-btn"
            onClick={removeRightImage}
            disabled={!rightEye}
          >
            Remove Fundus 
          </button>
        </div>
      </div>
    </div>

    <div className='upload-to-model-container'>
      <div className='notification-bar'>
       {/* Notification Box */}
      {notification && (
        <div className="notification-box">
          {notification}
        </div>
      )}
      </div>
      <button
            className="notify-btn"
            onClick={uploadImages}
            disabled= {!isBothScansUploaded}
          >
            Uplopad to Model 
      </button>
    </div>

    <div className='empty'></div>

    {showResult && apiDiagnosis && (
      <div className='predicted-diagnosis'>
        <p></p>
        {isHealthy && <p className='healthy'>You're eyes are Healthy</p>}
        {!isHealthy && <p>Prediction: {apiDiagnosis}</p>}
      </div> 
    )}
    </div>
  );
};

export default Service
