import React from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import './EChallan.css';

const EChallan = () => {
    return (
        <div className="echallan-container fade-in">
            <div className="echallan-header">
                <ShieldCheck size={56} className="header-icon" />
                <h1>Check Vehicle Fines</h1>
                <p>Keep a clear record of your vehicle. Quick access to official traffic penalty portals.</p>
            </div>

            <div className="echallan-card glass-card">
                <div className="portal-option" style={{ marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-main)' }}>Karnataka One Traffic Fine</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>Direct portal for Bangalore and Karnataka state traffic violations.</p>
                    <a
                        href="https://www.karnatakaone.gov.in/PoliceCollectionOfFine/TrafficFineCollection/dUZnOGxNQzFCbEdIckVoQlNaZVV2UT09"
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary proceed-btn"
                        style={{ textDecoration: 'none' }}
                    >
                        Visit Karnataka One <ExternalLink size={18} />
                    </a>
                </div>

                <hr style={{ border: 0, borderTop: '1px dashed var(--border-color)', margin: '2rem 0' }} />

                <div className="portal-option">
                    <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-main)' }}>National eChallan (Parivahan)</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>Centralized portal to check challans across India borders.</p>
                    <a
                        href="https://echallan.parivahan.gov.in/index/accused-challan"
                        target="_blank"
                        rel="noreferrer"
                        className="btn-secondary proceed-btn"
                        style={{ textDecoration: 'none', background: 'transparent' }}
                    >
                        Visit Parivahan <ExternalLink size={18} />
                    </a>
                </div>
            </div>

            <p className="security-note" style={{ marginTop: '2rem' }}>
                <strong>Note:</strong> You will be securely redirected to the official government websites. ParkEzo does not store or process your fine payments.
            </p>
        </div>
    );
};

export default EChallan;
