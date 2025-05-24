package com.ESI.CareerBooster.cv.controller;

import com.ESI.CareerBooster.cv.dto.CVAnalysisResponse;
import com.ESI.CareerBooster.cv.service.CVService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.HashMap;

@Slf4j
@RestController
@RequestMapping("/api/cv")
@RequiredArgsConstructor
public class CVController {
    private final CVService cvService;

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadCV(
            @RequestParam("file") MultipartFile file,
            HttpServletRequest request) {
        log.info("=== CV Upload Request Received ===");
        log.info("Request URL: {}", request.getRequestURL());
        log.info("Content Type: {}", request.getContentType());
        
        // Log file details
        log.info("File Details:");
        log.info("- Name: {}", file.getOriginalFilename());
        log.info("- Size: {} bytes", file.getSize());
        log.info("- Content Type: {}", file.getContentType());
        
        try {
            // Validate file
            if (file == null || file.isEmpty()) {
                log.error("No file uploaded or file is empty");
                return ResponseEntity.badRequest()
                    .body(Map.of(
                        "error", "No file uploaded",
                        "message", "Please select a PDF file to upload"
                    ));
            }

            if (!file.getContentType().equals("application/pdf")) {
                log.error("Invalid file type: {}", file.getContentType());
                return ResponseEntity.badRequest()
                    .body(Map.of(
                        "error", "Invalid file type",
                        "message", "Only PDF files are allowed",
                        "receivedType", file.getContentType()
                    ));
            }

            // Process the file
            log.info("Starting CV analysis for file: {}", file.getOriginalFilename());
            CVAnalysisResponse result = cvService.analyzeCV(file);
            
            if (result == null || result.getRecommendations() == null || result.getRecommendations().isEmpty()) {
                log.error("No recommendations generated");
                return ResponseEntity.internalServerError()
                    .body(Map.of(
                        "error", "Analysis failed",
                        "message", "Could not generate recommendations"
                    ));
            }
            
            log.info("CV analysis completed successfully. Generated {} recommendations", 
                result.getRecommendations().size());
            
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            log.error("Error processing CV: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError()
                .body(Map.of(
                    "error", "Error processing CV",
                    "message", e.getMessage(),
                    "type", e.getClass().getSimpleName()
                ));
        }
    }
} 