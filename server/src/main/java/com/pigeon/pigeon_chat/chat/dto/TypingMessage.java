package com.pigeon.pigeon_chat.chat.dto;

public class TypingMessage {

    private String sender;

    private boolean typing;

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public boolean isTyping() {
        return typing;
    }

    public void setTyping(boolean typing) {
        this.typing = typing;
    }
}