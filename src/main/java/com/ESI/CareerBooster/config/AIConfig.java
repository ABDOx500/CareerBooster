package com.ESI.CareerBooster.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import reactor.netty.http.client.HttpClient;
import java.time.Duration;
import io.netty.resolver.DefaultAddressResolverGroup;
import io.netty.handler.ssl.SslContext;
import io.netty.handler.ssl.SslContextBuilder;
import io.netty.handler.ssl.util.InsecureTrustManagerFactory;
import javax.net.ssl.SSLException;

@Configuration
public class AIConfig {
    
    @Value("${openrouter.api.key}")
    private String apiKey;
    
    @Value("${openrouter.app.name}")
    private String appName;
    
    @Bean("aiWebClient")
    public WebClient aiWebClient() throws SSLException {
        // Create SSL context that trusts all certificates (for development only)
        SslContext sslContext = SslContextBuilder
            .forClient()
            .trustManager(InsecureTrustManagerFactory.INSTANCE)
            .build();

        HttpClient httpClient = HttpClient.create()
            .responseTimeout(Duration.ofSeconds(30))
            .keepAlive(true)
            .resolver(DefaultAddressResolverGroup.INSTANCE)
            .followRedirect(true)
            .secure(sslContextSpec -> sslContextSpec.sslContext(sslContext));
            
        return WebClient.builder()
            .baseUrl("https://openrouter.ai/api/v1")
            .clientConnector(new ReactorClientHttpConnector(httpClient))
            .defaultHeader("Authorization", "Bearer " + apiKey)
            .defaultHeader("HTTP-Referer", "https://" + appName + ".app")
            .defaultHeader("X-Title", appName)
            .build();
    }
} 