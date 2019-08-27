package org.team.apps;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.team.apps.game.Game;
import org.team.apps.game.GameInputMessage;
import org.team.apps.game.GameOutputMessage;
import org.team.apps.game.JoinGameInputMessage;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompFrameHandler;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandler;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.socket.WebSocketHttpHeaders;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.Transport;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;

import static org.junit.jupiter.api.Assertions.fail;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class GameIntegrationTests {

	@LocalServerPort
	private int port;

	private SockJsClient sockJsClient;

	private WebSocketStompClient stompClient;

	private final WebSocketHttpHeaders headers = new WebSocketHttpHeaders();

	@BeforeEach
	public void setup() {
		List<Transport> transports = new ArrayList<>();
		transports.add(new WebSocketTransport(new StandardWebSocketClient()));
		this.sockJsClient = new SockJsClient(transports);

		this.stompClient = new WebSocketStompClient(sockJsClient);
		this.stompClient.setMessageConverter(new MappingJackson2MessageConverter());
	}

	@Test
	public void createAndJoinGame() throws Exception {

		final CountDownLatch latch = new CountDownLatch(1);
		final AtomicReference<Throwable> failure = new AtomicReference<>();

		StompSessionHandler handler = new TestSessionHandler(failure) {

			@Override
			public void afterConnected(final StompSession session, StompHeaders connectedHeaders) {
				session.subscribe("/topic/game/created", new StompFrameHandler() {
					@Override
					public Type getPayloadType(StompHeaders headers) {
						return GameOutputMessage.class;
					}

					@Override
					public void handleFrame(StompHeaders headers, Object payload) {
						GameOutputMessage gameOutputMessage = (GameOutputMessage) payload;
						try {
							System.out.println("Games Created : "+gameOutputMessage.getGames());

							JoinGameInputMessage joinGame = new JoinGameInputMessage();
							joinGame.setGameId(gameOutputMessage.getGames().get(1).getGameId());
							joinGame.setUsername("SuperUser");
							session.send("/app/game/join", joinGame);
						}
						catch (Throwable t) {
							failure.set(t);
						}
						finally {
							//session.disconnect();
							//latch.countDown();
						}
					}
				});

				session.subscribe("/topic/game/join", new StompFrameHandler() {
					@Override
					public Type getPayloadType(StompHeaders headers) {
						return Game.class;
					}

					@Override
					public void handleFrame(StompHeaders headers, Object payload) {
						Game currentGame = (Game) payload;
						try {
							System.out.println(String.format("Game : %d is hosted by %s and guest %s has joined.", currentGame.getGameId(), currentGame.getHost().getUsername(), currentGame.getGuest().getUsername()));
						}
						catch (Throwable t) {
							failure.set(t);
						}
						finally {
							session.disconnect();
							latch.countDown();
						}
					}
				});

				try {
					session.send("/app/game/create", new GameInputMessage("Spring"));
				}
				catch (Throwable t) {
					failure.set(t);
					latch.countDown();
				}
			}
		};


		System.out.println(this.port);
		this.stompClient.connect("ws://localhost:{port}/live", this.headers, handler, this.port);

		if (latch.await(60, TimeUnit.SECONDS)) {
			if (failure.get() != null) {
				throw new AssertionError("", failure.get());
			}
		}
		else {
			fail("Greeting not received");
		}
	}

	private class TestSessionHandler extends StompSessionHandlerAdapter {

		private final AtomicReference<Throwable> failure;


		public TestSessionHandler(AtomicReference<Throwable> failure) {
			this.failure = failure;
		}

		@Override
		public void handleFrame(StompHeaders headers, Object payload) {
			this.failure.set(new Exception(headers.toString()));
		}

		@Override
		public void handleException(StompSession s, StompCommand c, StompHeaders h, byte[] p, Throwable ex) {
			this.failure.set(ex);
		}

		@Override
		public void handleTransportError(StompSession session, Throwable ex) {
			this.failure.set(ex);
		}
	}
}
