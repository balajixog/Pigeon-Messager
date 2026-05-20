package com.pigeon.pigeon_chat.websocket.controller;

import java.security.Principal;
import java.time.Instant;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.pigeon.pigeon_chat.chat.dto.TypingMessage;
import com.pigeon.pigeon_chat.chat.entity.Message;
import com.pigeon.pigeon_chat.chat.service.MessageService;
import com.pigeon.pigeon_chat.websocket.dto.ChatMessage;

@Controller
public class ChatController {

    private final MessageService messageService;

    public ChatController(MessageService messageService) {
        this.messageService = messageService;
    }

    @MessageMapping("/chat.send")
    @SendTo("/topic/messages")
    public ChatMessage send(
            ChatMessage message,
            Principal principal          // JWT authenticated user
    ) {
        // SET SENDER FROM JWT — never trust frontend
        message.setSender(principal.getName());

        // ADD TIMESTAMP
        message.setTimestamp(Instant.now().toString());

        // SAVE TO DATABASE
        Message savedMessage = new Message();
        savedMessage.setClientId(message.getClientId());
        savedMessage.setSender(message.getSender());
        savedMessage.setContent(message.getContent());
        savedMessage.setType(message.getType());
        savedMessage.setTimestamp(message.getTimestamp());
        messageService.saveMessage(savedMessage);

        return message;
    }

    @MessageMapping("/chat.typing")
    @SendTo("/topic/typing")
    public TypingMessage typing(
            TypingMessage message,
            Principal principal
    ) {
        message.setSender(principal.getName());  // also secure typing
        return message;
    }
}