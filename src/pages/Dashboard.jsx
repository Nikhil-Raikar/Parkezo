import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Search, MapPin, Clock, CreditCard, X, Users, CheckCircle, Navigation } from 'lucide-react';
import './Dashboard.css';
const mapContainerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: 'inherit'
};

const mapCenter = {
    lat: 12.9716,
    lng: 77.5946
};

// Simulated data representing official BBMP "Namma Parking" app locations in Bengaluru
const initialSpots = [
    { id: 1, name: 'Namma Parking - Brigade Road (BBMP)', lat: 12.9738, lng: 77.6074, price: 30, type: '2/4-Wheeler', rating: 4.5, slots: 5 },
    { id: 2, name: 'Namma Parking - Commercial Street Area', lat: 12.9822, lng: 77.6083, price: 20, type: '2-Wheeler', rating: 4.1, slots: 8 },
    { id: 3, name: 'Namma Parking - Jayanagar 4th Block', lat: 12.9287, lng: 77.5835, price: 30, type: '2/4-Wheeler', rating: 4.4, slots: 2 },
    { id: 4, name: 'Namma Parking - Koramangala BDA', lat: 12.9298, lng: 77.6254, price: 30, type: '2/4-Wheeler', rating: 4.6, slots: 0 },
    { id: 5, name: 'Private Lot - UB City Baseline', lat: 12.9711, lng: 77.5962, price: 80, type: '4-Wheeler', rating: 4.9, slots: 10 },
    { id: 6, name: 'Namma Metro - Majestic Station', lat: 12.9757, lng: 77.5728, price: 40, type: '2/4-Wheeler', rating: 4.1, slots: 3 },
];

const markerColors = ['#10B981', '#84CC16', '#FBBF24', '#F59E0B', '#EA580C', '#EF4444', '#B91C1C'];

const getCustomIcon = (index) => {
    const color = markerColors[Math.min(index, markerColors.length - 1)];
    return L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });
};

// Helper to calculate distance (simulated)
const getDistance = (lat1, lon1, lat2, lon2) => {
    return Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lon2 - lon1, 2)) * 111; // Approx km
};

const Dashboard = () => {
    const [search, setSearch] = useState('');
    const [spots, setSpots] = useState(initialSpots);
    const [activeSpot, setActiveSpot] = useState(null);
    const [sortBy, setSortBy] = useState('rating'); // rating, price, distance

    // Fix for default Leaflet marker icons in React
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    const [isBookingModalOpen, setBookingModalOpen] = useState(false);
    const [bookingHours, setBookingHours] = useState(1);

    // New State for Location Selection
    const [hasSetLocation, setHasSetLocation] = useState(false);
    const [locationInput, setLocationInput] = useState('');

    const handleLocationSubmit = (e) => {
        e.preventDefault();
        setHasSetLocation(true);
        if (locationInput) {
            setSearch(locationInput); // Pre-filter spots based on input
        }
    };

    const handleCurrentLocation = () => {
        // In a real app we'd use navigator.geolocation
        setSearch('');
        setHasSetLocation(true);
    };

    if (!hasSetLocation) {
        return (
            <div className="welcome-screen fade-in">
                <div className="glass-card welcome-card">
                    <MapPin size={48} className="welcome-icon" style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
                    <h1 style={{ marginBottom: '0.5rem' }}>Where are you heading?</h1>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Enter your destination in Bangalore to find the best parking spots nearby.</p>
                    <form onSubmit={handleLocationSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input
                            type="text"
                            className="input-field"
                            style={{ padding: '1rem', fontSize: '1.1rem' }}
                            placeholder="e.g. MG Road, Indiranagar..."
                            value={locationInput}
                            onChange={(e) => setLocationInput(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn-primary" style={{ padding: '1rem', fontSize: '1.05rem' }}>Find Parking</button>
                    </form>
                    <div style={{ margin: '1.5rem 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', position: 'relative' }}>
                        <hr style={{ border: 0, borderTop: '1px solid var(--border-color)', position: 'absolute', width: '100%', top: '50%' }} />
                        <span style={{ background: 'var(--surface-color)', padding: '0 10px', position: 'relative' }}>OR</span>
                    </div>
                    <button className="btn-secondary" onClick={handleCurrentLocation} style={{ width: '100%', padding: '1rem', fontSize: '1.05rem' }}>
                        Use Current Location
                    </button>
                </div>
            </div>
        );
    }

    const handleBookSpot = (spot) => {
        setActiveSpot(spot);
        setBookingModalOpen(true);
    };

    const confirmBooking = () => {
        setSpots(prevSpots => prevSpots.map(s => 
            s.id === activeSpot.id ? { ...s, slots: Math.max(0, s.slots - 1) } : s
        ));
        alert(`Successfully booked ${activeSpot.name} for ${bookingHours} hours. The host has been instantly notified by SMS!`);
        setBookingModalOpen(false);
    };

    const sortedSpots = [...spots]
        .filter(spot => search === '' || search.toLowerCase() === 'bangalore' || spot.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sortBy === 'price') return a.price - b.price;
            if (sortBy === 'rating') return b.rating - a.rating;
            if (sortBy === 'distance') {
                const distA = getDistance(mapCenter.lat, mapCenter.lng, a.lat, a.lng);
                const distB = getDistance(mapCenter.lat, mapCenter.lng, b.lat, b.lng);
                return distA - distB;
            }
            return 0;
        });

    return (
        <div className="dashboard-container fade-in">
            {isBookingModalOpen && activeSpot && (
                <div className="booking-modal-overlay">
                    <div className="booking-modal glass-card">
                        <button className="close-btn" onClick={() => setBookingModalOpen(false)}>✕</button>
                        <h2>Confirm Booking</h2>
                        <div className="spot-summary">
                            <h3>{activeSpot.name}</h3>
                            <p>{activeSpot.price} • {activeSpot.type}</p>
                            <p style={{ marginTop: '0.4rem', fontSize: '0.8rem', color: 'var(--success)' }}>Available up to 12 Hrs</p>
                        </div>
                        <div className="form-group" style={{ textAlign: 'left' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Requested Booking Time (Hours)</label>
                            <input type="number" min="1" max="12" className="input-field" value={bookingHours} onChange={(e) => setBookingHours(e.target.value)} />
                        </div>
                        <div className="price-estimation">
                            <p style={{ fontWeight: 500, color: 'var(--text-muted)' }}>Total Estimated Price</p>
                            <h4>₹{activeSpot.price * bookingHours}</h4>
                        </div>
                        <button className="btn-primary" onClick={confirmBooking} style={{ width: '100%', marginTop: '2rem', padding: '1rem', fontSize: '1.05rem' }}>Proceed to Payment</button>
                    </div>
                </div>
            )}

            <div className="stats-panel glass-card">
                <div className="stat-cards">
                    <div className="stat-card">
                        <Users className="stat-icon" size={32} />
                        <div>
                            <h4>Total Users</h4>
                            <p>15,420</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <CheckCircle className="stat-icon" size={32} />
                        <div>
                            <h4>Total Bookings</h4>
                            <p>4,850</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <Navigation className="stat-icon" size={32} />
                        <div>
                            <h4>Active Spots</h4>
                            <p>1,234</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="sidebar list-view glass-card">
                <div className="search-bar">
                    <Search size={20} className="search-icon" />
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Search for parking..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="sort-controls">
                    <span>Sort by:</span>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
                        <option value="rating">Top Rated</option>
                        <option value="price">Lowest Price</option>
                        <option value="distance">Nearest</option>
                    </select>
                </div>

                <div className="spot-list">
                    {sortedSpots.map((spot, index) => (
                        <div key={spot.id} className={`spot-card ${activeSpot?.id === spot.id ? 'active' : ''} ${spot.slots === 0 ? 'spot-full' : ''}`} onClick={() => setActiveSpot(spot)}>
                            <div className="spot-header" style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: markerColors[Math.min(index, markerColors.length - 1)], marginRight: '10px', flexShrink: 0 }}></div>
                                <h3 style={{ margin: 0 }}>{spot.name}</h3>
                                {spot.slots === 0 && <span className="badge-full">FULL</span>}
                            </div>
                            <div className="spot-details">
                                <span><CreditCard size={14} /> ₹{spot.price}/hr</span>
                                <span><Clock size={14} /> {spot.slots} slots left</span>
                                <span>★ {spot.rating}</span>
                            </div>
                            <div className="spot-type">{spot.type}</div>
                            <button 
                                className={`btn-primary select-btn ${spot.slots === 0 ? 'disabled' : ''}`} 
                                disabled={spot.slots === 0}
                                onClick={(e) => { e.stopPropagation(); handleBookSpot(spot); }}
                            >
                                {spot.slots === 0 ? 'No Vacancy' : 'Book Spot'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="map-view glass-card" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', position: 'relative' }}>
                <MapContainer 
                    center={[mapCenter.lat, mapCenter.lng]} 
                    zoom={13} 
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    />
                    {sortedSpots.map((spot, index) => (
                        <Marker
                            key={spot.id}
                            position={[spot.lat, spot.lng]}
                            icon={getCustomIcon(index)}
                            eventHandlers={{
                                click: () => setActiveSpot(spot),
                            }}
                        >
                            <Popup>
                                <div style={{ color: '#000' }}>
                                    <strong>{spot.name}</strong><br />
                                    ₹{spot.price}/hr • {spot.slots > 0 ? `${spot.slots} slots` : 'FULL'}
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
                </div>
            </div>
        </div>
    )
}
export default Dashboard;
