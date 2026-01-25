package com.ine.backend.external;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

/**
 * External API client for fetching location data from CountriesNow API.
 * Handles HTTP communication with https://countriesnow.space
 */
@Component
@Slf4j
@RequiredArgsConstructor
public class LocationApiClient {

    private static final String BASE_URL = "https://countriesnow.space/api/v0.1";
    private final HttpClient httpClient = HttpClient.newBuilder()
            .followRedirects(HttpClient.Redirect.NORMAL)
            .build();
    private final ObjectMapper objectMapper;

    /**
     * Fetch all countries from the API.
     * Returns list of country names: ["Morocco", "Spain", ...]
     */
    public List<String> getAllCountries() {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + "/countries"))
                .GET()
                .build();

            HttpResponse<String> response = httpClient.send(request, 
                HttpResponse.BodyHandlers.ofString());

            JsonNode root = objectMapper.readTree(response.body());
            JsonNode dataArray = root.get("data");

            List<String> countries = new ArrayList<>();
            if (dataArray != null && dataArray.isArray()) {
                dataArray.forEach(node -> {
                    JsonNode countryNode = node.get("country");
                    if (countryNode != null) {
                        countries.add(countryNode.asText());
                    }
                });
            }
            
            return countries;
        } catch (Exception e) {
            log.error("Failed to fetch countries from external API", e);
            return List.of();
        }
    }

    /**
     * Fetch cities for a specific country.
     * Returns list of city names: ["Casablanca", "Rabat", ...]
     */
    public List<String> getCitiesByCountry(String country) {
        try {
            String encodedCountry = URLEncoder.encode(country, StandardCharsets.UTF_8);
            String url = BASE_URL + "/countries/cities/q?country=" + encodedCountry;
            
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .GET()
                .build();

            HttpResponse<String> response = httpClient.send(request, 
                HttpResponse.BodyHandlers.ofString());

            JsonNode root = objectMapper.readTree(response.body());
            JsonNode dataArray = root.get("data");

            List<String> cities = new ArrayList<>();
            if (dataArray != null && dataArray.isArray()) {
                dataArray.forEach(node -> cities.add(node.asText()));
            }
            
            return cities;
        } catch (Exception e) {
            log.error("Failed to fetch cities for country: {}", country, e);
            return List.of();
        }
    }
}