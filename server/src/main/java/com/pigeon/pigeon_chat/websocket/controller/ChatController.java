package com.pigeon.pigeon_chat.websocket.controller;

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

    private final MessageService
            messageService;

    public ChatController(
            MessageService
                    messageService
    ) {

        this.messageService =
                messageService;
    }

    @MessageMapping("/chat.send")
    @SendTo("/topic/messages")
    public ChatMessage send(
            ChatMessage message
    ) {

        // ADD TIMESTAMP

        message.setTimestamp(
            Instant.now()
                .toString()
        );

        // DEBUG

        System.out.println(
            "clientId received: "
            + message.getClientId()
        );

        // CREATE ENTITY

        Message savedMessage =
                new Message();

        savedMessage.setClientId(
            message.getClientId()
        );

        savedMessage.setSender(
            message.getSender()
        );

        savedMessage.setContent(
            message.getContent()
        );

        savedMessage.setType(
            message.getType()
        );

        savedMessage.setTimestamp(
            message.getTimestamp()
        );

        // SAVE TO DATABASE

        messageService.saveMessage(savedMessage);

        // BROADCAST BACK

        return message;
    }

    @MessageMapping("/chat.typing")
    @SendTo("/topic/typing")
    public TypingMessage typing(
            TypingMessage message
    ) {

        return message;
    }
}