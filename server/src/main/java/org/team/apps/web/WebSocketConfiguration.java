package org.team.apps.web;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.team.apps.board.BoardRepository;
import org.team.apps.game.GameRepository;
import org.team.apps.game.GameService;
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer {

    public WebSocketConfiguration() {
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic");
        registry.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/live").setAllowedOrigins("*").withSockJS();
    }


    @Bean
    GameService gameService(GameRepository gameRepository,  BoardRepository boardRepository) {
        return new GameService(gameRepository, boardRepository);
    }



}
