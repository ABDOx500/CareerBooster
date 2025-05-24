package com.ESI.CareerBooster.cv.service;

import com.ESI.CareerBooster.cv.dto.CVAnalysisResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import java.util.List;
import java.util.Map;
import java.net.ConnectException;
import java.net.SocketTimeoutException;

@Slf4j
@Service
@RequiredArgsConstructor
public class AIService {
    @Qualifier("aiWebClient")
    private final WebClient webClient;
    private final ObjectMapper objectMapper;
    
    @Value("${openrouter.api.key}")
    private String apiKey;

    public CVAnalysisResponse getRecommendations(String content) {
        log.info("Starting AI analysis for CV content length: {}", content.length());
        log.debug("CV content preview: {}", content.substring(0, Math.min(200, content.length())) + "...");
        
        String prompt = generatePrompt(content);
        log.debug("Generated prompt for AI: {}", prompt);
        
        try {
            log.info("Sending request to OpenRouter API with model: deepseek/deepseek-prover-v2:free");
            
            // Create the request body exactly as per OpenRouter API documentation
            Map<String, Object> requestBody = Map.of(
                "model", "deepseek/deepseek-prover-v2:free",
                "messages", List.of(Map.of(
                    "role", "user",
                    "content", prompt
                ))
            );
            
            log.debug("Request body: {}", requestBody);

            Map<String, Object> response = webClient.post()
                .uri("/chat/completions")
                .bodyValue(requestBody)
                .retrieve()
                .onStatus(status -> status.is4xxClientError() || status.is5xxServerError(),
                    clientResponse -> clientResponse.bodyToMono(String.class)
                        .flatMap(errorBody -> {
                            log.error("OpenRouter API error: {}", errorBody);
                            return Mono.error(new RuntimeException("OpenRouter API error: " + errorBody));
                        }))
                .bodyToMono(Map.class)
                .doOnError(e -> {
                    if (e instanceof ConnectException) {
                        log.error("Connection error to OpenRouter API: {}", e.getMessage());
                    } else if (e instanceof SocketTimeoutException) {
                        log.error("Timeout connecting to OpenRouter API: {}", e.getMessage());
                    } else {
                        log.error("Error calling OpenRouter API: {}", e.getMessage(), e);
                    }
                })
                .block();

            log.info("Received response from OpenRouter API");
            log.debug("Raw API response: {}", response);

            if (response == null) {
                log.error("Null response received from OpenRouter API");
                throw new RuntimeException("Null response from AI service");
            }

            if (!response.containsKey("choices")) {
                log.error("Invalid response structure. Missing 'choices' field. Response: {}", response);
                throw new RuntimeException("Invalid response structure from AI service");
            }

            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
            if (choices.isEmpty()) {
                log.error("Empty choices array in response");
                throw new RuntimeException("No recommendations generated");
            }

            Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
            if (message == null || !message.containsKey("content")) {
                log.error("Invalid message structure in response. Message: {}", message);
                throw new RuntimeException("Invalid message structure in AI response");
            }

            String aiResponse = (String) message.get("content");
            log.debug("AI response content: {}", aiResponse);

            // Parse the JSON response from the AI
            CVAnalysisResponse analysisResponse = objectMapper.readValue(aiResponse, CVAnalysisResponse.class);
            
            if (analysisResponse.getRecommendations() == null || analysisResponse.getRecommendations().isEmpty()) {
                log.error("No recommendations in parsed response");
                throw new RuntimeException("No recommendations in AI response");
            }
            
            log.info("Successfully generated {} recommendations", analysisResponse.getRecommendations().size());
            log.debug("Full analysis response: {}", analysisResponse);
            
            return analysisResponse;
        } catch (ConnectException e) {
            log.error("Failed to connect to OpenRouter API: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to connect to AI service. Please check your internet connection and try again.");
        } catch (SocketTimeoutException e) {
            log.error("Timeout connecting to OpenRouter API: {}", e.getMessage(), e);
            throw new RuntimeException("Connection to AI service timed out. Please try again.");
        } catch (Exception e) {
            log.error("Error getting AI recommendations: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to get AI recommendations: " + e.getMessage());
        }
    }

    private String generatePrompt(String content) {
        return """
            As an AI career advisor, analyze this CV and provide personalized course recommendations based on the following criteria:

            PROBLEM STATEMENT:
            The user has uploaded their CV and needs AI-powered course recommendations that will:
            1. Address skill gaps identified in their CV
            2. Align with their career goals and experience level
            3. Provide practical, industry-relevant learning paths
            4. Consider current market demands and trends

            CV CONTENT:
            %s

            REQUIREMENTS:
            1. Analyze the CV for:
               - Current technical skills and proficiency levels
               - Work experience and industry focus
               - Educational background
               - Career progression and goals
               - Identified skill gaps or areas for improvement

            2. Provide 3 course recommendations in the following JSON format:
            {
              "skills": ["skill1", "skill2", ...],
              "gaps": ["gap1", "gap2", ...],
              "recommendations": [
                {
                  "title": "Course Name",
                  "provider": "Provider Name",
                  "matchScore": 95,
                  "reason": "Detailed explanation",
                  "skillGapAddressed": "Specific skill gap",
                  "estimatedTimeToComplete": "X weeks/months",
                  "difficultyLevel": "Beginner/Intermediate/Advanced",
                  "prerequisites": ["Required skills"],
                  "careerImpact": "Impact description"
                }
              ]
            }

            IMPORTANT: 
            1. Respond ONLY with the JSON object, no additional text or explanation.
            2. Make sure to analyze the CV content thoroughly and provide personalized recommendations.
            3. The recommendations should be based on the actual content of the CV.
            4. Include specific skills and gaps identified from the CV.
            5. DO NOT use any pre-defined or static recommendations.
            """.formatted(content);
    }
} 