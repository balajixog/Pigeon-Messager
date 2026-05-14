package com.pigeon.pigeon_chat.websocket.dto;

public class ChatMessage {

    private String clientId;

    private String sender;

    private String content;

    private String type;

    private String timestamp;

    public String getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(
        String timestamp
) {
    this.timestamp = timestamp;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    public String getClientId() {

        return clientId;
    }
    public void setClientId(
        String clientId
) {

    this.clientId = clientId;
}
}