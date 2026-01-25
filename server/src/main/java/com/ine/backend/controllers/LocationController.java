package com.ine.backend.controllers;

import com.ine.backend.dto.ApiResponseDto;
import com.ine.backend.dto.LocationValidationRequest;
import com.ine.backend.services.LocationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for location endpoints.
 * Provides location data for frontend dropdowns, search, and validation.
 */
@RestController
@RequestMapping("/api/v1/locations")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class LocationController {

    private final LocationService locationService;

    /**
     * GET /api/v1/locations/strings
     * Returns flat list of locations for dropdowns.
     * Response: ["Remote", "Hybrid", "Casablanca, Morocco", ...]
     */
    @GetMapping("/strings")
    public ResponseEntity<ApiResponseDto<List<String>>> getLocationStrings() {
        try {
            List<String> locations = locationService.getAllLocationStrings();
            return ResponseEntity.ok(
                    ApiResponseDto.<List<String>>builder()
                            .message("OK")
                            .response(locations)
                            .isSuccess(true)
                            .build()
            );
        } catch (Exception e) {
            log.error("Failed to get location strings", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponseDto.<List<String>>builder()
                            .message(e.getMessage())
                            .response(null)
                            .isSuccess(false)
                            .build()
                    );
        }
    }

    /**
     * GET /api/v1/locations/search?q={query}
     * Search locations by query (case-insensitive, partial match).
     * Example: /search?q=casa returns ["Casablanca, Morocco"]
     */
    @GetMapping("/search")
    public ResponseEntity<ApiResponseDto<List<String>>> searchLocations(
            @RequestParam(value = "q", required = false) String query) {
        try {
            List<String> results = locationService.searchLocations(query);
            return ResponseEntity.ok(
                    ApiResponseDto.<List<String>>builder()
                            .message("OK")
                            .response(results)
                            .isSuccess(true)
                            .build()
            );
        } catch (Exception e) {
            log.error("Failed to search locations", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponseDto.<List<String>>builder()
                            .message(e.getMessage())
                            .response(null)
                            .isSuccess(false)
                            .build()
                    );
        }
    }

    /**
     * POST /api/v1/locations/validate
     * Validates if a location string exists in dataset.
     * Request body: { "location": "Casablanca, Morocco" }
     * Response: { "response": true/false }
     */
    @PostMapping("/validate")
    public ResponseEntity<ApiResponseDto<Boolean>> validateLocation(
            @RequestBody LocationValidationRequest request) {
        try {
            boolean isValid = locationService.isValidLocation(request.getLocation());
            return ResponseEntity.ok(
                    ApiResponseDto.<Boolean>builder()
                            .message(isValid ? "Valid location" : "Invalid location")
                            .response(isValid)
                            .isSuccess(true)
                            .build()
            );
        } catch (Exception e) {
            log.error("Failed to validate location", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponseDto.<Boolean>builder()
                            .message(e.getMessage())
                            .response(false)
                            .isSuccess(false)
                            .build()
                    );
        }
    }
}