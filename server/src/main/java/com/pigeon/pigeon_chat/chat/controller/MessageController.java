package com.pigeon.pigeon_chat.chat.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pigeon.pigeon_chat.chat.entity.Message;
import com.pigeon.pigeon_chat.chat.service.MessageService;

@CrossOrigin(
        origins =
        "http://localhost:5173"
    )
@RestController
@RequestMapping("/messages")

public class MessageController {

    private final MessageService
            messageService;

    public MessageController(
            MessageService
                    messageService
    ) {

        this.messageService =
                messageService;
    }

    @GetMapping

    public List<Message>
        getMessages() {

        return messageService
                .getMessages();
    }
}