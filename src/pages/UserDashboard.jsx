import React, { useState } from 'react';
import { User, Calendar, Car, MapPin, Clock, AlertTriangle, Check, X } from 'lucide-react';
import './UserDashboard.css';

const UserDashboard = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [email, setEmail] = useState('rahul.sharma@example.com');
    return (
        <div className="user-dashboard fade-in">
            <div className="dashboard-header">
                <h1><User size={32} className="text-primary" /> My Profile</h1>
                <p className="text-muted">Manage your bookings, vehicles, and account settings.</p>
            </div>

            <div className="dashboard-grid">
                <div className="main-content">
                    <div className="dashboard-section glass-card">
                        <h2>Active Bookings</h2>
                        <div className="booking-item border-left" style={{ borderColor: 'var(--success)' }}>
                            <div className="booking-info">
                                <h4>UB City Basement Parking</h4>
                                <p><MapPin size={14}/> MG Road, Bangalore</p>
                                <p><Clock size={14}/> Today, 10:00 AM - 2:00 PM</p>
                            </div>
                            <div className="booking-status">
                                <span className="status-badge status-active">Active</span>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-section glass-card">
                        <h2>Past Bookings</h2>
                        <div className="booking-item">
                            <div className="booking-info">
                                <h4>Koramangala BDA Complex</h4>
                                <p><Calendar size={14}/> 12 Apr 2026</p>
                                <p>₹120 • 4 Hours</p>
                            </div>
                            <div className="booking-status">
                                <span className="status-badge status-completed">Completed</span>
                            </div>
                        </div>
                        <div className="booking-item">
                            <div className="booking-info">
                                <h4>Commercial Street Open Lot</h4>
                                <p><Calendar size={14}/> 05 Apr 2026</p>
                                <p>₹40 • 2 Hours</p>
                            </div>
                            <div className="booking-status">
                                <span className="status-badge status-completed">Completed</span>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-section glass-card">
                        <h2>Reported Violations</h2>
                        <div className="booking-item">
                            <div className="booking-info">
                                <h4>Illegal Parking - Brigade Road</h4>
                                <p><Calendar size={14}/> 12 Jul 2026</p>
                                <p><AlertTriangle size={14} className="text-warning" /> Vehicle blocking pedestrian walkway</p>
                            </div>
                            <div className="booking-status">
                                <span className="status-badge status-pending">Pending Review</span>
                            </div>
                        </div>
                        <div className="booking-item">
                            <div className="booking-info">
                                <h4>Handicap Spot Violation - MG Road</h4>
                                <p><Calendar size={14}/> 05 Jul 2026</p>
                                <p><AlertTriangle size={14} className="text-warning" /> Unauthorized vehicle</p>
                            </div>
                            <div className="booking-status" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                                <span className="status-badge status-action-taken">Action Taken</span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Challan Issued</span>
                            </div>
                        </div>
                        <div className="booking-item">
                            <div className="booking-info">
                                <h4>No Parking Zone - Indiranagar</h4>
                                <p><Calendar size={14}/> 20 Jun 2026</p>
                                <p><AlertTriangle size={14} className="text-warning" /> Parked in crosswalk</p>
                            </div>
                            <div className="booking-status" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                                <span className="status-badge status-validated">Validated</span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Forwarded to BBMP</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="side-content">
                    <div className="dashboard-section glass-card">
                        <h2>My Vehicles</h2>
                        <div className="vehicle-item">
                            <div>
                                <strong>KA 01 AB 1234</strong>
                                <p className="text-muted" style={{ fontSize: '0.85rem' }}>Honda City (4-Wheeler)</p>
                            </div>
                            <Car size={20} className="text-muted" />
                        </div>
                        <div className="vehicle-item">
                            <div>
                                <strong>KA 05 XY 9876</strong>
                                <p className="text-muted" style={{ fontSize: '0.85rem' }}>Activa (2-Wheeler)</p>
                            </div>
                            <Car size={20} className="text-muted" />
                        </div>
                        <button className="btn-secondary w-100 mt-3" style={{ padding: '0.75rem' }}>+ Add Vehicle</button>
                    </div>

                    <div className="dashboard-section glass-card">
                        <h2>Account Details</h2>
                        <div className="account-details-content">
                            <p><strong>Name:</strong> <span className="text-muted">Rahul Sharma (Verified via Aadhaar)</span></p>
                            <p><strong>Phone:</strong> <span className="text-muted">+91 98765 43210 (Linked to Aadhaar)</span></p>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                                <strong>Email:</strong> 
                                {isEditing ? (
                                    <input 
                                        type="email" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="input-field"
                                        style={{ padding: '0.4rem', flex: 1 }}
                                    />
                                ) : (
                                    <span>{email}</span>
                                )}
                            </div>
                        </div>

                        {isEditing ? (
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button className="btn-primary" style={{ flex: 1, padding: '0.75rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }} onClick={() => setIsEditing(false)}>
                                    <Check size={18} /> Save
                                </button>
                                <button className="btn-secondary" style={{ flex: 1, padding: '0.75rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }} onClick={() => setIsEditing(false)}>
                                    <X size={18} /> Cancel
                                </button>
                            </div>
                        ) : (
                            <button className="btn-secondary w-100 mt-3" style={{ padding: '0.75rem' }} onClick={() => setIsEditing(true)}>
                                Edit Email
                            </button>
                        )}
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1rem', textAlign: 'center' }}>
                            Name and phone number cannot be changed as they are verified via Aadhaar.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
