package com.example.flowtalk.listener;

import com.example.flowtalk.model.UserStatus;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class WebSocketEventListener {

    private final SimpMessagingTemplate messagingTemplate;

    private final Map<String, String> sessions =
            new ConcurrentHashMap<>();

    public WebSocketEventListener(
            SimpMessagingTemplate messagingTemplate) {

        this.messagingTemplate = messagingTemplate;
    }

    @EventListener
    public void handleSubscribe(SessionSubscribeEvent event) {

        StompHeaderAccessor accessor =
                StompHeaderAccessor.wrap(event.getMessage());

        String sessionId = accessor.getSessionId();

        String username =
                accessor.getFirstNativeHeader("username");

        if (sessionId != null &&
                username != null &&
                !username.isBlank()) {

            sessions.put(sessionId, username);

            broadcastUsers();
        }
    }

    @EventListener
    public void handleDisconnect(SessionDisconnectEvent event) {

        String sessionId = event.getSessionId();

        sessions.remove(sessionId);

        broadcastUsers();
    }

    private void broadcastUsers() {

        messagingTemplate.convertAndSend(
                "/topic/users",
                new UserStatus(
                        new ArrayList<>(sessions.values())
                )
        );
    }
}