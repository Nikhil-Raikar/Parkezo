import React, { useState } from 'react';
import { Camera, MapPin, Car, IndianRupee, Phone } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './HostListing.css';

const HostListing = () => {
    const [formData, setFormData] = useState({
        title: '',
        address: '',
        slots: 1,
        vehicleType: '4-Wheeler',
        price: '',
        timeLimit: '',
        phone: '',
        photo: null
    });

    // Fix for default Leaflet marker icons in React
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    const [mapCenter, setMapCenter] = useState({ lat: 12.9716, lng: 77.5946 });

    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                setMapCenter({ lat: e.latlng.lat, lng: e.latlng.lng });
            },
        });
        return <Marker position={[mapCenter.lat, mapCenter.lng]} />;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Parking spot successfully listed! You will be notified when someone books your spot.');
        // In a real app we'd dispatch to a backend here.
    };

    return (
        <div className="host-container fade-in">
            <div className="host-header">
                <h1>List Your Parking Space</h1>
                <p>Turn your empty driveway or garage into extra income by renting it out securely.</p>
            </div>

            <div className="host-content">
                <form className="host-form glass-card" onSubmit={handleSubmit}>
                    <div className="form-group row">
                        <div className="input-box">
                            <label>Listing Title</label>
                            <input required type="text" name="title" className="input-field" placeholder="e.g. Spacious Garage near Metro" value={formData.title} onChange={handleChange} />
                        </div>
                        <div className="input-box">
                            <label>Total Spots</label>
                            <input required type="number" name="slots" min="1" className="input-field" value={formData.slots} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label><MapPin size={16} /> Address Details & Location Pin</label>
                        <textarea required name="address" className="input-field" rows="2" placeholder="Full address of the parking location" value={formData.address} onChange={handleChange} style={{ marginBottom: '1rem' }}></textarea>
                        <div style={{ height: '300px', width: '100%', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)', position: 'relative' }}>
                            <MapContainer 
                                center={[mapCenter.lat, mapCenter.lng]} 
                                zoom={14} 
                                style={{ height: '100%', width: '100%' }}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                                />
                                <LocationMarker />
                            </MapContainer>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="input-box">
                            <label><Car size={16} /> Vehicle Type</label>
                            <select name="vehicleType" className="input-field" value={formData.vehicleType} onChange={handleChange}>
                                <option value="2-Wheeler">2-Wheeler (Bikes/Scooters)</option>
                                <option value="4-Wheeler">4-Wheeler (Cars/SUVs)</option>
                                <option value="Both">Both (2 & 4-Wheeler)</option>
                                <option value="Heavy">Heavy Vehicles / Trucks</option>
                            </select>
                        </div>
                        <div className="input-box">
                            <label><IndianRupee size={16} /> Price per Hour</label>
                            <input required type="number" name="price" min="0" className="input-field" placeholder="0.00" value={formData.price} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Maximum Time Limit (Hours)</label>
                        <input required type="number" name="timeLimit" className="input-field" placeholder="e.g. 12" value={formData.timeLimit} onChange={handleChange} />
                        <small>Set to 24 if there is no daily availability limit</small>
                    </div>

                    <hr className="divider" />
                    <h3>Host Details</h3>
                    <p className="host-notes">These details will be shared securely when a driver books your spot.</p>

                    <div className="form-group row" style={{ marginTop: '1rem' }}>
                        <div className="input-box">
                            <label><Phone size={16} /> Contact Number</label>
                            <input required type="tel" name="phone" className="input-field" placeholder="+91..." value={formData.phone} onChange={handleChange} />
                        </div>
                        <div className="input-box upload-box">
                            <label><Camera size={16} /> Spot Photo</label>
                            <div className="upload-area">
                                <span>Click to select an image...</span>
                                <input type="file" name="photo" accept="image/*" className="file-input" />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn-primary submit-btn">Publish Listing</button>
                </form>

                <div className="host-sidebar">
                    <div className="glass-card info-card">
                        <h3>Why list with ParkEzo?</h3>
                        <ul className="benefits-list">
                            <li>✔️ Hassle-free automatic payments</li>
                            <li>✔️ Complete control over pricing and schedules</li>
                            <li>✔️ Instant SMS notifications on booking</li>
                            <li>✔️ Helping reduce city traffic footprint</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HostListing;
