package com.pigeon.pigeon_chat.websocket.controller;

import java.time.LocalTime;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.pigeon.pigeon_chat.chat.dto.TypingMessage;
import com.pigeon.pigeon_chat.websocket.dto.ChatMessage;

@Controller
public class ChatController {

    @MessageMapping("/chat.send")
    @SendTo("/topic/messages")
    public ChatMessage send(ChatMessage message) {
        message.setTimestamp(java.time.Instant.now().toString());
        System.out.println("clientId received: " + message.getClientId()); // verify
        return message; // ← must return the full object
    }
    @MessageMapping("/chat.typing")
    @SendTo("/topic/typing")
    public TypingMessage typing(
            TypingMessage message
    ) {
        return message;
    }

    
    
}