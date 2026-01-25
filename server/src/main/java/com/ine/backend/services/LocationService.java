package com.ine.backend.services;

import com.ine.backend.external.LocationApiClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for managing location data.
 * Fetches data from external API and provides search/validation functionality.
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class LocationService {

    private final LocationApiClient locationApiClient;

    /**
     * Get all location strings for dropdowns.
     * Format: ["Remote", "Hybrid", "Casablanca, Morocco", ...]
     * Cached to avoid repeated external API calls.
     */
    @Cacheable("locationStrings")
    public List<String> getAllLocationStrings() {
        List<String> locations = new ArrayList<>();
        
        locations.add("Remote");
        locations.add("Hybrid");

        List<String> countries = locationApiClient.getAllCountries();
        
        for (String country : countries) {
            List<String> cities = locationApiClient.getCitiesByCountry(country);
            for (String city : cities) {
                locations.add(String.format("%s, %s", city, country));
            }
        }

        return locations;
    }

    /**
     * Search locations by query (case-insensitive, partial match).
     * Example: query="casa" returns ["Casablanca, Morocco"]
     */
    public List<String> searchLocations(String query) {
        List<String> allLocations = getAllLocationStrings();
        
        if (query == null || query.trim().isEmpty()) {
            return allLocations;
        }

        String lowerQuery = query.toLowerCase().trim();
        return allLocations.stream()
            .filter(loc -> loc.toLowerCase().contains(lowerQuery))
            .limit(50)
            .collect(Collectors.toList());
    }

    /**
     * Validate if location string exists in our dataset.
     * Returns true if location is valid, false otherwise.
     */
    public boolean isValidLocation(String location) {
        if (location == null || location.trim().isEmpty()) {
            return false;
        }
        return getAllLocationStrings().contains(location);
    }
}