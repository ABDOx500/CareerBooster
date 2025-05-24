package com.ESI.CareerBooster.cv.service;

import com.ESI.CareerBooster.cv.dto.CVAnalysisResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

@Slf4j
@Service
@RequiredArgsConstructor
public class CVService {
    private final AIService aiService;
    
    public CVAnalysisResponse analyzeCV(MultipartFile file) throws IOException {
        log.info("Starting CV analysis for file: {}", file.getOriginalFilename());
        
        // Validate file
        if (file == null || file.isEmpty()) {
            log.error("File is null or empty");
            throw new IllegalArgumentException("File is null or empty");
        }
        
        log.info("File details - Size: {} bytes, Content Type: {}", 
            file.getSize(), file.getContentType());
        
        // Read PDF content
        String content;
        try (InputStream inputStream = file.getInputStream()) {
            PDDocument document = PDDocument.load(inputStream);
            PDFTextStripper stripper = new PDFTextStripper();
            content = stripper.getText(document);
            document.close();
            
            log.info("Document parsed successfully, content length: {}", content.length());
            log.debug("Document content preview: {}", 
                content.length() > 100 ? content.substring(0, 100) + "..." : content);
            
            if (content.trim().isEmpty()) {
                log.error("Extracted content is empty");
                throw new IllegalArgumentException("Could not extract text from PDF");
            }
        } catch (Exception e) {
            log.error("Error processing PDF file: {}", e.getMessage(), e);
            throw new IOException("Error processing PDF file: " + e.getMessage());
        }

        // Get AI-powered recommendations
        log.info("Sending content to AI service for analysis...");
        CVAnalysisResponse response = aiService.getRecommendations(content);
        
        if (response == null || response.getRecommendations() == null || response.getRecommendations().isEmpty()) {
            log.error("No recommendations received from AI service");
            throw new RuntimeException("Failed to generate recommendations. Please try again.");
        }
        
        log.info("AI analysis completed. Generated {} recommendations", response.getRecommendations().size());
        return response;
    }
} 