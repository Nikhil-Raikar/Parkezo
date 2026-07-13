import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ShieldCheck, FileCheck, ArrowRight, CheckCircle } from 'lucide-react';
import './Auth.css';

const Auth = () => {
    const [step, setStep] = useState(1);
    const [aadhaar, setAadhaar] = useState('');
    const [otp, setOtp] = useState('');
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [isVerifying, setIsVerifying] = useState(false);
    
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const navigate = useNavigate();

    const handleAadhaarSubmit = (e) => {
        e.preventDefault();
        if (aadhaar.length === 12) {
            setStep(2);
        } else {
            alert('Please enter a valid 12-digit Aadhaar number');
        }
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        if (otp.length === 6) {
            setStep(3);
        } else {
            alert('Please enter a valid 6-digit OTP');
        }
    };

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setIsCameraActive(true);
        } catch (err) {
            console.error("Error accessing camera:", err);
            alert("Could not access camera. Please allow camera permissions.");
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
        }
        setIsCameraActive(false);
    };

    const captureImage = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
            const imageDataUrl = canvasRef.current.toDataURL('image/jpeg');
            setCapturedImage(imageDataUrl);
            stopCamera();
        }
    };

    const retakeImage = () => {
        setCapturedImage(null);
        startCamera();
    };

    const handleVerificationComplete = () => {
        setIsVerifying(true);
        // Simulate API call for verification
        setTimeout(() => {
            setIsVerifying(false);
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/');
        }, 2000);
    };

    useEffect(() => {
        if (step === 3 && !capturedImage && !isCameraActive) {
            startCamera();
        }
        return () => {
            stopCamera();
        };
    }, [step]);

    return (
        <div className="auth-container">
            <div className="auth-card glass-card">
                <div className="auth-header">
                    <ShieldCheck size={48} className="auth-icon" />
                    <h2>Secure Verification</h2>
                    <p>Verify your identity to access Parkezo</p>
                </div>

                <div className="auth-stepper">
                    <div className={`step ${step >= 1 ? 'active' : ''}`}>
                        <div className="step-number">1</div>
                        <span>Aadhaar</span>
                    </div>
                    <div className={`step-line ${step >= 2 ? 'active' : ''}`}></div>
                    <div className={`step ${step >= 2 ? 'active' : ''}`}>
                        <div className="step-number">2</div>
                        <span>OTP</span>
                    </div>
                    <div className={`step-line ${step >= 3 ? 'active' : ''}`}></div>
                    <div className={`step ${step >= 3 ? 'active' : ''}`}>
                        <div className="step-number">3</div>
                        <span>Photo</span>
                    </div>
                </div>

                <div className="auth-content fade-in">
                    {step === 1 && (
                        <form onSubmit={handleAadhaarSubmit}>
                            <div className="form-group">
                                <label>Aadhaar Number</label>
                                <div className="input-with-icon">
                                    <FileCheck size={20} />
                                    <input
                                        type="text"
                                        placeholder="Enter 12-digit Aadhaar Number"
                                        value={aadhaar}
                                        onChange={(e) => setAadhaar(e.target.value.replace(/[^0-9]/g, '').slice(0, 12))}
                                        className="input-field"
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn-primary auth-btn">
                                Request OTP <ArrowRight size={20} />
                            </button>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleOtpSubmit}>
                            <div className="form-group">
                                <label>Enter OTP</label>
                                <p className="help-text">OTP sent to Aadhaar linked mobile number</p>
                                <div className="input-with-icon">
                                    <ShieldCheck size={20} />
                                    <input
                                        type="text"
                                        placeholder="Enter 6-digit OTP"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                                        className="input-field"
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn-primary auth-btn">
                                Verify OTP <ArrowRight size={20} />
                            </button>
                            <button type="button" className="btn-text" onClick={() => setStep(1)}>
                                Back
                            </button>
                        </form>
                    )}

                    {step === 3 && (
                        <div className="camera-section">
                            <h3 style={{ marginBottom: '1rem', textAlign: 'center' }}>Face Verification</h3>
                            
                            {!capturedImage ? (
                                <div className="camera-container">
                                    <video ref={videoRef} autoPlay playsInline className="webcam-view" />
                                    <button className="btn-primary capture-btn" onClick={captureImage}>
                                        <Camera size={20} /> Capture Photo
                                    </button>
                                </div>
                            ) : (
                                <div className="preview-container">
                                    <img src={capturedImage} alt="Captured" className="image-preview" />
                                    {isVerifying ? (
                                        <div className="verifying-state">
                                            <div className="spinner"></div>
                                            <p>Verifying with Aadhaar database...</p>
                                        </div>
                                    ) : (
                                        <div className="action-buttons">
                                            <button className="btn-secondary" onClick={retakeImage}>Retake</button>
                                            <button className="btn-primary" onClick={handleVerificationComplete}>
                                                <CheckCircle size={20} style={{ marginRight: '8px' }}/> Confirm & Continue
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                            
                            <canvas ref={canvasRef} style={{ display: 'none' }} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Auth;
