package org.team.apps;

import java.lang.reflect.Type;
import java.net.URL;
import java.util.List;
import java.util.Scanner;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandler;
import org.springframework.web.socket.client.WebSocketClient;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.team.apps.game.Game;
import org.team.apps.web.WebSocketConfiguration;

@SpringBootTest
@Import(WebSocketConfiguration.class)
class GameControllerTest {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Test
    public void gameController_test() {
        WebSocketClient client = new StandardWebSocketClient();
        WebSocketStompClient stompClient = new WebSocketStompClient(client);
        stompClient.setMessageConverter(new MappingJackson2MessageConverter());
        StompSessionHandler sessionHandler = new MyStompSessionHandler();
        stompClient.connect("ws://localhost:8080", sessionHandler);
        new Scanner(System.in).nextLine();
    }

    private class MyStompSessionHandler implements StompSessionHandler {

        @Override
        public void afterConnected(StompSession stompSession, StompHeaders stompHeaders) {
            stompSession.subscribe("/topic/game/created", this);
            stompSession.send("/game/create", "toto");
        }

        @Override
        public void handleException(StompSession stompSession, StompCommand stompCommand, StompHeaders stompHeaders, byte[] bytes,
            Throwable throwable) {

        }

        @Override
        public void handleTransportError(StompSession stompSession, Throwable throwable) {

        }

        @Override
        public Type getPayloadType(StompHeaders stompHeaders) {
            return null;
        }

        @Override
        public void handleFrame(StompHeaders stompHeaders, Object o) {
            List<Game> msg = (List<Game>) o;
            if(msg != null) {
                msg.stream().forEach( (game) ->
                    logger.info(String.format("Game if %s",game.getGameId()))
                );
            }
        }
    }
}