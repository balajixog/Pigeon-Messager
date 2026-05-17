package com.pigeon.pigeon_chat.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pigeon.pigeon_chat.chat.entity.Message;

public interface MessageRepository
        extends JpaRepository<
            Message,
            Long
        > {
}