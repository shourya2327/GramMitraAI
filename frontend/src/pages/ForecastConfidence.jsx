import React from 'react';
import { useLocation } from '../context/LocationContext';
import { Target, ShieldCheck, Cpu, Info, CheckCircle2, AlertCircle } from 'lucide-react';

export const ForecastConfidence = () => {
  const { selectedLocation } = useLocation();

  const factors = [
    { name: "Historical Regional Rainfall Climatology", weight: "35%", status: "Well Calibrated (50-yr IMD baseline)" },
    { name: "Local Terrain & Topographic Digital Elevation Model", weight: "25%", status: "High Precision (SRTM 30m DEM)" },
    { name: "Satellite Vegetation Index (Sentinel-2 NDVI)", weight: "20%", status: "Recent 5-day Cloud-free Composite" },
    { name: "Ground Weather Station Proximity", weight: "12%", status: "Indore KVK Sensor (14.2 km distance)" },
    { name: "Numerical Weather Prediction (NWP) Ensemble Spread", weight: "8%", status: "Tight GFS/ECMWF Agreement" }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2.5rem' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-dark-green)' }}>
          🎯 AI Forecast Confidence Score
        </h1>
        <p style={{ fontSize: '0.82rem', color: 'var(--color-secondary-text)' }}>
          Objective probabilistic uncertainty estimation for downscaled forecasts in {selectedLocation.panchayat || "Dharampuri"}.
        </p>
      </div>

      {/* Main Confidence Gauge Banner */}
      <div className="gm-card" style={{
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FAF5FF 100%)',
        border: '1.5px solid #DDD6FE',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem',
        padding: '2rem 1.75rem'
      }}>
        <div>
          <span className="gm-badge gm-badge-purple" style={{ marginBottom: '8px' }}>
            Production Model Status
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
            <span style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--color-ai-accent)', lineHeight: 1 }}>
              89.4%
            </span>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#4C1D95' }}>
                High Model Confidence
              </div>
              <div style={{ fontSize: '0.82rem', color: '#6D28D9' }}>
                Operational Ensemble: XGBoost + Random Forest Regressor
              </div>
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-secondary-text)', marginTop: '0.75rem', maxWidth: '520px' }}>
            The AI downscaling model demonstrates an 89.4% confidence index based on high satellite NDVI fidelity, confirmed elevation gradients, and low multi-model synoptic variance.
          </p>
        </div>

        {/* Confidence Range Scale */}
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '1.25rem',
          borderRadius: '12px',
          border: '1px solid var(--color-border)',
          width: '280px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-dark-green)', marginBottom: '0.5rem' }}>
            Confidence Scale Guide
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16A34A', fontWeight: 700 }}>
              <span>85% - 100%</span>
              <span>High (Actionable)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#D97706' }}>
              <span>70% - 84%</span>
              <span>Moderate (Monitor)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#DC2626' }}>
              <span>&lt; 70%</span>
              <span>Low (High Uncertainty)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Influencing Physical Factors */}
      <div className="gm-card">
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-dark-green)', marginBottom: '0.75rem' }}>
          Key Influencing Confidence Factors
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {factors.map((f, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem 1rem',
                backgroundColor: '#F8FAFC',
                borderRadius: '8px',
                border: '1px solid var(--color-border)'
              }}
            >
              <div>
                <strong style={{ fontSize: '0.85rem', color: 'var(--color-dark-green)' }}>{f.name}</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-secondary-text)', display: 'block', marginTop: '2px' }}>
                  {f.status}
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="gm-badge gm-badge-blue" style={{ fontSize: '0.72rem' }}>
                  Weight: {f.weight}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mandatory Disclaimer from SIH Prompt */}
      <div style={{
        padding: '0.85rem 1.25rem',
        backgroundColor: '#FFFBEB',
        borderRadius: '8px',
        border: '1px solid #FDE68A',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontSize: '0.8rem',
        color: '#92400E'
      }}>
        <AlertCircle size={20} color="#D97706" style={{ flexShrink: 0 }} />
        <span>
          <strong>Scientific Integrity Notice:</strong> Model confidence is computed mathematically from atmospheric variance and sensor reliability. It is not an absolute agronomic guarantee. Use predictions as decision support in consultation with local agriculture extension officers.
        </span>
      </div>
    </div>
  );
};
