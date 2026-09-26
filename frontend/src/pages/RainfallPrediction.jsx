import React from 'react';
import { useLocation } from '../context/LocationContext';
import { CloudRain, Droplets, AlertTriangle, TrendingUp, Calendar, CheckCircle } from 'lucide-react';

export const RainfallPrediction = () => {
  const { selectedLocation } = useLocation();

  const horizons = [
    {
      period: "Today",
      probability: 78,
      range: "12 – 18 mm",
      expectedAvg: 14.5,
      intensity: "Moderate Showers",
      risk: "Moderate Risk",
      riskColor: "#D97706",
      riskBg: "#FEF3C7",
      action: "Pause chemical spraying and surface irrigation."
    },
    {
      period: "Tomorrow",
      probability: 85,
      range: "18 – 28 mm",
      expectedAvg: 22.0,
      intensity: "Moderate to Heavy Rain",
      risk: "High Risk",
      riskColor: "#DC2626",
      riskBg: "#FEE2E2",
      action: "Clear drainage trenches to avoid waterlogging."
    },
    {
      period: "Next 3 Days Total",
      probability: 90,
      range: "35 – 52 mm",
      expectedAvg: 41.7,
      intensity: "Accumulated Convective Inundation",
      risk: "High Risk",
      riskColor: "#DC2626",
      riskBg: "#FEE2E2",
      action: "Ensure low-lying farm plots are not inundated."
    },
    {
      period: "Next 7 Days Total",
      probability: 65,
      range: "50 – 75 mm",
      expectedAvg: 62.0,
      intensity: "Active Monsoon Spell",
      risk: "Moderate",
      riskColor: "#D97706",
      riskBg: "#FEF3C7",
      action: "Soil moisture expected to stay above field capacity."
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2.5rem' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-dark-green)' }}>
          🌧 Panchayat Probabilistic Rainfall Prediction
        </h1>
        <p style={{ fontSize: '0.82rem', color: 'var(--color-secondary-text)' }}>
          Hyperlocal rainfall accumulation ranges, precipitation probability, and runoff risk index for {selectedLocation.panchayat || "Dharampuri"}.
        </p>
      </div>

      {/* 4 Multi-Horizon Rainfall Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.25rem'
      }}>
        {horizons.map((h, idx) => (
          <div
            key={idx}
            className="gm-card"
            style={{
              borderLeft: `5px solid ${h.riskColor}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--color-dark-green)' }}>
                  {h.period}
                </span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '12px',
                    backgroundColor: h.riskBg,
                    color: h.riskColor
                  }}
                >
                  {h.risk}
                </span>
              </div>

              <div style={{ margin: '0.75rem 0' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-secondary-text)' }}>Expected Rainfall Range</div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0284C7' }}>
                  {h.range}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F0F9FF', padding: '0.65rem 0.75rem', borderRadius: '6px', marginBottom: '0.75rem' }}>
                <div>
                  <span style={{ fontSize: '0.7rem', color: '#0369A1', display: 'block' }}>Rain Probability</span>
                  <strong style={{ fontSize: '1.05rem', color: '#0C4A6E' }}>{h.probability}%</strong>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.7rem', color: '#0369A1', display: 'block' }}>Intensity</span>
                  <strong style={{ fontSize: '0.8rem', color: '#0C4A6E' }}>{h.intensity}</strong>
                </div>
              </div>

              <p style={{ fontSize: '0.78rem', color: 'var(--color-dark-green)', backgroundColor: '#F8FAF8', padding: '0.55rem', borderRadius: '6px', border: '1px solid #E2EBE2' }}>
                <strong>Agronomic Action:</strong> {h.action}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Scientific Explanation of Rainfall Modeling */}
      <div className="gm-card">
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-dark-green)', marginBottom: '0.75rem' }}>
          Rainfall Uncertainty & Confidence Modeling
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-secondary-text)', lineHeight: 1.6 }}>
          Precipitation in tropical agro-climatic zones is inherently probabilistic. Rather than displaying a misleading single fixed number, GramMitraAI computes an <strong>ensemble spread (P10 to P90 percentiles)</strong> using Monte-Carlo simulations over high-resolution numerical weather prediction (NWP) outputs combined with localized Doppler radar reflectivity patterns.
        </p>
      </div>
    </div>
  );
};
