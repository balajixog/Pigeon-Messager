package com.pigeon.pigeon_chat.chat.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.pigeon.pigeon_chat.chat.entity.Message;
import com.pigeon.pigeon_chat.chat.repository.MessageRepository;

@Service

public class MessageService {

    private final MessageRepository
            messageRepository;

    public MessageService(
            MessageRepository
                    messageRepository
    ) {

        this.messageRepository =
                messageRepository;
    }

    // SAVE MESSAGE

    public Message saveMessage(
            Message message
    ) {

        return messageRepository
                .save(message);
    }

    // GET ALL MESSAGES

    public List<Message> getMessages() {

        return messageRepository
                .findAll();
    }
}