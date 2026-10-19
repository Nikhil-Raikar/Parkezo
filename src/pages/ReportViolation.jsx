import React, { useState } from 'react';
import { AlertCircle, Camera, FileText, MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './ReportViolation.css';

const ReportViolation = () => {
    const [violationType, setViolationType] = useState('illegal');

    const [formData, setFormData] = useState({
        bookingId: '',
        vehicleNumber: '',
        spotDetails: '',
        description: '',
        photo: null
    });

    const [selectedBooking, setSelectedBooking] = useState(null);

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

    const mockBookings = [
        {
            id: 'BKG-101',
            spot: 'UB City Basement Parking',
            vehicle: 'KA 01 AB 1234',
            user: 'Rahul S.',
            bookedOn: '12th April, 09:00 AM',
            scheduledEnd: '12th April, 06:00 PM',
            exceededBy: '18 hours'
        },
        {
            id: 'BKG-102',
            spot: 'Koramangala BDA',
            vehicle: 'MH 12 CD 5678',
            user: 'Sneha K.',
            bookedOn: '10th April, 10:00 AM',
            scheduledEnd: '11th April, 10:00 AM',
            exceededBy: '1 day'
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Complaint successfully submitted along with the generated booking receipt! The authorities have been flagged.');
        setFormData({ bookingId: '', vehicleNumber: '', spotDetails: '', description: '', photo: null });
        setSelectedBooking(null);
    };

    const handleBookingSelect = (e) => {
        const b = mockBookings.find(x => x.id === e.target.value);
        if (b) {
            setFormData({ ...formData, bookingId: b.id, vehicleNumber: b.vehicle, spotDetails: b.spot });
            setSelectedBooking(b);
        } else {
            setFormData({ ...formData, bookingId: '', vehicleNumber: '', spotDetails: '' });
            setSelectedBooking(null);
        }
    };

    return (
        <div className="report-container fade-in">
            <div className="report-header text-center">
                <AlertCircle size={56} className="text-danger mx-auto mb-4" />
                <h1>Report a Violation</h1>
                <p>Help keep the spaces clear. Report illegal parking or exceeded bookings.</p>
            </div>

            <div className="glass-card report-form-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Violation Type</label>
                        <select
                            className="input-field"
                            style={{ backgroundColor: 'var(--surface-color)', padding: '1rem' }}
                            value={violationType}
                            onChange={(e) => {
                                setViolationType(e.target.value);
                                setSelectedBooking(null);
                                setFormData({ ...formData, bookingId: '' });
                            }}
                        >
                            <option value="illegal">Illegal Parking (No-parking zone / Footpath)</option>
                            <option value="exceeded">Exceeded Booking Limit (+1 Day)</option>
                        </select>
                    </div>

                    {violationType === 'exceeded' && (
                        <>
                            <div className="form-group fade-in">
                                <label>Choose a User's Booking</label>
                                <select
                                    className="input-field"
                                    style={{ padding: '1rem' }}
                                    onChange={handleBookingSelect}
                                    value={formData.bookingId}
                                    required
                                >
                                    <option value="">-- Select Outdated Booking --</option>
                                    {mockBookings.map(b => (
                                        <option key={b.id} value={b.id}>{b.id} - {b.spot} ({b.user})</option>
                                    ))}
                                </select>
                            </div>

                            {selectedBooking && (
                                <div className="generated-receipt fade-in my-3">
                                    <h4 className="flex-align"><FileText size={18} /> Generated Booking Receipt</h4>
                                    <div className="receipt-box">
                                        <p><strong>Booking ID:</strong> {selectedBooking.id}</p>
                                        <p><strong>Spot Location:</strong> {selectedBooking.spot}</p>
                                        <p><strong>Booked By User:</strong> {selectedBooking.user}</p>
                                        <p><strong>Enrolled Vehicle:</strong> <span className="highlight-text">{selectedBooking.vehicle}</span></p>
                                        <p><strong>Status:</strong> {selectedBooking.bookedOn}</p>
                                        <p><strong>Scheduled End:</strong> {selectedBooking.scheduledEnd}</p>
                                        <div className="alert-box mt-2">
                                            <strong>Time Exceeded By: {selectedBooking.exceededBy}</strong>
                                        </div>
                                    </div>
                                    <p className="help-text mt-2">This booking receipt info will be automatically attached when you submit the complaint.</p>
                                </div>
                            )}
                        </>
                    )}

                    {violationType === 'illegal' && (
                        <>
                            <div className="form-group fade-in">
                                <label>Vehicle Registration Number</label>
                                <input type="text" className="input-field" placeholder="e.g. KA 01 AB 1234" value={formData.vehicleNumber} onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })} required />
                            </div>
                            <div className="form-group fade-in">
                                <label><MapPin size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Location / Spot Details</label>
                                <input type="text" className="input-field" placeholder="Where is this vehicle illegally parked?" value={formData.spotDetails} onChange={(e) => setFormData({ ...formData, spotDetails: e.target.value })} required style={{ marginBottom: '1rem' }} />
                                <div style={{ height: '250px', width: '100%', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)', position: 'relative' }}>
                                    <MapContainer 
                                        center={[mapCenter.lat, mapCenter.lng]} 
                                        zoom={14} 
                                        style={{ height: '100%', width: '100%' }}
                                    >
                                        <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <LocationMarker />
                                    </MapContainer>
                                </div>
                            </div>
                        </>
                    )}

                    <div className="form-group mt-4">
                        <label><Camera size={18} /> Photographic Evidence</label>
                        <p className="help-text">Take a photo clearly showing the vehicle's registration number and the violation context.</p>
                        <div className="upload-area">
                            <input type="file" accept="image/*" capture="environment" className="file-input" required />
                            <div className="upload-content">
                                <Camera size={36} />
                                <span>Tap to Take Photo or Upload Image</span>
                            </div>
                        </div>
                    </div>

                    <div className="form-group mt-4">
                        <label>Additional Notes (Optional)</label>
                        <textarea className="input-field" rows="3" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Any other details..."></textarea>
                    </div>

                    <button type="submit" className="btn-primary w-100" style={{ padding: '1.2rem', marginTop: '1rem', fontSize: '1.1rem' }}>
                        Submit Complaint
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReportViolation;
