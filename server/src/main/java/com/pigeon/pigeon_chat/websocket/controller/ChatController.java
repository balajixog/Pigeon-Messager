package com.pigeon.pigeon_chat.websocket.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.pigeon.pigeon_chat.websocket.dto.ChatMessage;

@Controller
public class ChatController {

    @MessageMapping("/chat.send")

    @SendTo("/topic/messages")
    public ChatMessage sendMessage(
            ChatMessage message
    ) {

        return message;
    }
}