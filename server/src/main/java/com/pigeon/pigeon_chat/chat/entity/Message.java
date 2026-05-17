package com.pigeon.pigeon_chat.chat.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "messages")

public class Message {

    @Id
    @GeneratedValue(
        strategy =
        GenerationType.IDENTITY
    )

    private Long id;

    private String sender;

    private String content;

    private String clientId;

    private String type;

    private String timestamp;

    public Long getId() {
        return id;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(
            String sender
    ) {
        this.sender = sender;
    }

    public String getContent() {
        return content;
    }

    public void setContent(
            String content
    ) {
        this.content = content;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(
            String clientId
    ) {
        this.clientId = clientId;
    }

    public String getType() {
        return type;
    }

    public void setType(
            String type
    ) {
        this.type = type;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(
            String timestamp
    ) {
        this.timestamp = timestamp;
    }
}