package com.pigeon.pigeon_chat.websocket.service;

import org.springframework.stereotype.Service;

import com.pigeon.pigeon_chat.websocket.dto.ChatMessage;

@Service
public class ChatService {

    public ChatMessage processMessage(
            ChatMessage message
    ) {

        // future logic:
        // save to database
        // Redis Pub/Sub
        // notifications
        // profanity filtering

        return message;
    }
}