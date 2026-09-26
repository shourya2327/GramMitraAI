-- ===================================================
-- GramMitraAI - Seed Data for SIH26074
-- ===================================================
USE grammitraai_db;

-- Roles
INSERT INTO roles (name, description) VALUES
('ROLE_FARMER', 'Standard farmer with field & advisory access'),
('ROLE_OFFICER', 'Agriculture Officer with Panchayat & block analytics'),
('ROLE_ADMIN', 'Platform Administrator & Model Registry Manager')
ON DUPLICATE KEY UPDATE description=VALUES(description);

-- Demo User (BCrypt password for 'farmer123': $2a$10$wK1Wk9n3T4/u4J0Uo7b.Re83mC3N5bFwBw0k/2.QGqEwM/9k3Wzvy)
INSERT INTO users (id, full_name, email, mobile_number, password_hash, preferred_language, state, district, block, panchayat)
VALUES 
(1, 'Ramesh Patel', 'ramesh.farmer@grammitra.ai', '9876543210', '$2a$10$7R6v78aU9gE8Pz9k4vIgeOmk1h2T3v4b5n6m7q8w9e0r1t2y3u4i5', 'hi', 'Madhya Pradesh', 'Indore', 'Sanwer', 'Dharampuri'),
(2, 'Dr. Anita Sharma', 'officer.anita@grammitra.ai', '9823456789', '$2a$10$7R6v78aU9gE8Pz9k4vIgeOmk1h2T3v4b5n6m7q8w9e0r1t2y3u4i5', 'en', 'Madhya Pradesh', 'Indore', 'Sanwer', 'Sanwer Central'),
(3, 'Admin System', 'admin@grammitra.ai', '9800000000', '$2a$10$7R6v78aU9gE8Pz9k4vIgeOmk1h2T3v4b5n6m7q8w9e0r1t2y3u4i5', 'en', 'Madhya Pradesh', 'Indore', 'Indore HQ', 'HQ')
ON DUPLICATE KEY UPDATE full_name=VALUES(full_name);

INSERT INTO user_roles (user_id, role_id) VALUES (1, 1), (2, 2), (3, 3)
ON DUPLICATE KEY UPDATE user_id=VALUES(user_id);

-- States & Districts
INSERT INTO states (id, code, name) VALUES (1, 'MP', 'Madhya Pradesh'), (2, 'MH', 'Maharashtra')
ON DUPLICATE KEY UPDATE name=VALUES(name);

INSERT INTO districts (id, state_id, name) VALUES 
(1, 1, 'Indore'),
(2, 1, 'Ujjain'),
(3, 1, 'Dhar'),
(4, 2, 'Nashik')
ON DUPLICATE KEY UPDATE name=VALUES(name);

INSERT INTO blocks (id, district_id, name) VALUES 
(1, 1, 'Sanwer'),
(2, 1, 'Depalpur'),
(3, 1, 'Mhow'),
(4, 2, 'Niphad')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Panchayats with real coordinate baselines
INSERT INTO panchayats (id, block_id, name, latitude, longitude, elevation_meters, soil_type_primary, ndvi_baseline, distance_to_water_km) VALUES
(1, 1, 'Dharampuri', 22.9734000, 75.8267000, 528.0, 'Black Clay Loam', 0.62, 1.2),
(2, 1, 'Kshipra', 22.9912000, 75.8645000, 535.0, 'Deep Black Vertisol', 0.58, 0.4),
(3, 1, 'Ajnod', 22.9450000, 75.8010000, 515.0, 'Medium Black', 0.54, 3.1),
(4, 2, 'Betma', 22.6841000, 75.6178000, 545.0, 'Clay Loam', 0.65, 2.0),
(5, 3, 'Manpur', 22.4285000, 75.6420000, 580.0, 'Laterite Loam', 0.70, 0.8)
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Sample Fields
INSERT INTO fields (id, user_id, panchayat_id, field_name, latitude, longitude, area_acres, crop_name, sowing_date, soil_type, irrigation_type) VALUES
(1, 1, 1, 'Khet 1 - Riverbank North', 22.9741000, 75.8273000, 3.20, 'Wheat', '2025-11-15', 'Black Clay Loam', 'Drip Irrigation'),
(2, 1, 1, 'Khet 2 - East Ridge', 22.9715000, 75.8290000, 4.50, 'Soybean', '2025-06-25', 'Medium Black', 'Sprinkler'),
(3, 1, 2, 'Khet 3 - Kshipra Basin', 22.9920000, 75.8650000, 2.10, 'Gram / Chickpea', '2025-11-20', 'Deep Black Vertisol', 'Flood / Furrow')
ON DUPLICATE KEY UPDATE field_name=VALUES(field_name);

-- Crop Profiles
INSERT INTO crop_profiles (id, crop_name, scientific_name, optimal_temp_min, optimal_temp_max, optimal_humidity_min, optimal_humidity_max, water_requirement_mm_per_week, critical_stages) VALUES
(1, 'Wheat', 'Triticum aestivum', 15.0, 25.0, 40, 70, 35.0, 'CRI (21 DAS), Tillering, Booting, Flowering, Grain filling'),
(2, 'Soybean', 'Glycine max', 20.0, 30.0, 50, 80, 45.0, 'Emergence, Flowering, Pod formation, Pod fill'),
(3, 'Gram / Chickpea', 'Cicer arietinum', 14.0, 24.0, 30, 60, 25.0, 'Pre-flowering, Pod development'),
(4, 'Maize', 'Zea mays', 18.0, 32.0, 45, 75, 50.0, 'Knee high, Tasseling, Silking, Grain fill'),
(5, 'Cotton', 'Gossypium hirsutum', 21.0, 35.0, 40, 75, 40.0, 'Squaring, Flowering, Boll formation')
ON DUPLICATE KEY UPDATE crop_name=VALUES(crop_name);

-- Weather Alerts
INSERT INTO weather_alerts (id, panchayat_id, event_type, severity, headline, description, mitigation_actions, starts_at, expires_at, is_active) VALUES
(1, 1, 'HEAVY_RAINFALL', 'ORANGE_ALERT', 'High Intensity Rain Expected (45-65mm) in next 24h', 'Convective cloud burst pattern moving across Sanwer block. High runoff expected on non-bunded fields.', 'Clear drainage furrows immediately; suspend urea top-dressing; delay spraying fungicide till 36 hours after rain.', NOW(), DATE_ADD(NOW(), INTERVAL 36 HOUR), TRUE)
ON DUPLICATE KEY UPDATE headline=VALUES(headline);

-- ML Model Registry
INSERT INTO ml_model_versions (id, model_name, model_family, version_tag, mae_score, rmse_score, r2_score, training_dataset_size, is_active_production) VALUES
(1, 'Block-to-Panchayat Downscaler', 'XGBoost-Regressor', 'v2.4.1', 0.7241, 1.0532, 0.9420, 185000, TRUE),
(2, 'Hyperlocal Microclimate Estimator', 'RandomForest-Ensemble', 'v1.8.0', 0.8120, 1.1870, 0.9180, 94000, TRUE),
(3, 'Extreme Weather Classifier', 'GradientBoostedTrees', 'v3.0.2', 0.0410, 0.0890, 0.9650, 420000, TRUE)
ON DUPLICATE KEY UPDATE is_active_production=VALUES(is_active_production);
