package com.pigeon.pigeon_chat.websocket.event;

import java.security.Principal;
import java.util.Map;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.pigeon.pigeon_chat.user.repository.UserRepository;

@Component
public class WebSocketEventListener {

    private final UserRepository userRepository;
    private final SimpMessagingTemplate messagingTemplate;

    public WebSocketEventListener(
            UserRepository userRepository,
            SimpMessagingTemplate messagingTemplate
    ) {
        this.userRepository = userRepository;
        this.messagingTemplate = messagingTemplate;
    }

    @EventListener
    public void handleWebSocketConnect(SessionConnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        Principal principal = accessor.getUser();
        if (principal == null) return;

        userRepository.findByUsername(principal.getName()).ifPresent(user -> {
            user.setOnline(true);
            userRepository.save(user);
            messagingTemplate.convertAndSend("/topic/online",
                (Object) Map.of("username", user.getUsername(), "online", true));
            System.out.println(user.getUsername() + " connected");
        });
    }

    @EventListener
    public void handleWebSocketDisconnect(SessionDisconnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        Principal principal = accessor.getUser();
        if (principal == null) return;

        userRepository.findByUsername(principal.getName()).ifPresent(user -> {
            user.setOnline(false);
            userRepository.save(user);
            messagingTemplate.convertAndSend("/topic/online",
                (Object) Map.of("username", user.getUsername(), "online", false));
            System.out.println(user.getUsername() + " disconnected");
        });
    }
}