package com.grammitraai.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class WeatherService {

    @Value("${grammitra.ai.service.url:http://localhost:8000}")
    private String aiServiceUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public Map<String, Object> getCurrentWeather(Double lat, Double lon) {
        Map<String, Object> response = new HashMap<>();
        response.put("latitude", lat != null ? lat : 22.9734);
        response.put("longitude", lon != null ? lon : 75.8267);
        response.put("temperature", 28.5);
        response.put("feels_like", 30.2);
        response.put("humidity", 72);
        response.put("rainfall_mm", 12.4);
        response.put("wind_speed_kmh", 14.2);
        response.put("wind_direction", "WSW");
        response.put("pressure_hpa", 1011.0);
        response.put("cloud_cover_pct", 65);
        response.put("uv_index", 5.2);
        response.put("rain_probability", 75);
        response.put("condition", "Scattered Showers");
        response.put("panchayat", "Dharampuri");
        response.put("block", "Sanwer");
        response.put("district", "Indore");
        response.put("state", "Madhya Pradesh");
        response.put("elevation_m", 528.0);
        response.put("timestamp", new Date());
        return response;
    }

    public List<Map<String, Object>> getHourlyForecast(Double lat, Double lon) {
        List<Map<String, Object>> hourly = new ArrayList<>();
        String[] times = {"06:00", "09:00", "12:00", "15:00", "18:00", "21:00", "00:00", "03:00"};
        double[] temps = {24.0, 27.5, 31.0, 32.5, 29.8, 27.0, 25.2, 23.8};
        int[] hums = {85, 76, 60, 55, 68, 78, 84, 88};
        double[] rains = {0.0, 0.5, 4.2, 8.5, 3.2, 0.2, 0.0, 0.0};
        int[] probs = {10, 25, 65, 80, 50, 20, 10, 5};

        for (int i = 0; i < times.length; i++) {
            Map<String, Object> item = new HashMap<>();
            item.put("time", times[i]);
            item.put("temp", temps[i]);
            item.put("humidity", hums[i]);
            item.put("rainfall_mm", rains[i]);
            item.put("probability", probs[i]);
            hourly.add(item);
        }
        return hourly;
    }

    public List<Map<String, Object>> getDailyForecast(Double lat, Double lon) {
        List<Map<String, Object>> daily = new ArrayList<>();
        String[] days = {"Mon (Today)", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"};
        double[] minTemps = {23.0, 22.5, 24.0, 23.5, 22.0, 21.5, 22.0};
        double[] maxTemps = {32.0, 31.0, 33.5, 32.0, 30.5, 31.0, 32.5};
        double[] rains = {12.4, 18.2, 4.5, 0.0, 2.0, 24.0, 10.5};
        int[] probs = {75, 85, 35, 10, 25, 80, 60};
        String[] conditions = {"Scattered Rain", "Thunderstorm", "Partly Cloudy", "Clear Sky", "Light Rain", "Heavy Rain", "Passing Showers"};

        for (int i = 0; i < days.length; i++) {
            Map<String, Object> item = new HashMap<>();
            item.put("day", days[i]);
            item.put("tempMin", minTemps[i]);
            item.put("tempMax", maxTemps[i]);
            item.put("rainfall_mm", rains[i]);
            item.put("rainProbability", probs[i]);
            item.put("condition", conditions[i]);
            daily.add(item);
        }
        return daily;
    }

    public Object forwardToAiService(String endpoint, Object requestBody) {
        try {
            ResponseEntity<Object> res = restTemplate.postForEntity(aiServiceUrl + endpoint, requestBody, Object.class);
            return res.getBody();
        } catch (Exception e) {
            // Return null so calling controller can apply realistic fallback
            return null;
        }
    }
}
