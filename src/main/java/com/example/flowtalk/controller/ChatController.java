package com.example.flowtalk.controller;

import com.example.flowtalk.model.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Controller
public class ChatController {

    private static final DateTimeFormatter TIME_FORMAT =
            DateTimeFormatter.ofPattern("HH:mm");


    @MessageMapping("/chat.send")
    @SendTo("/topic/messages")
    public ChatMessage sendMessage(
            ChatMessage message) {

        message.setType("CHAT");

        message.setTimestamp(
                LocalTime.now()
                        .format(TIME_FORMAT)
        );

        return message;
    }


    @MessageMapping("/chat.join")
    @SendTo("/topic/messages")
    public ChatMessage join(
            ChatMessage message) {

        message.setType("JOIN");

        message.setContent(
                message.getSender()
                        + " joined the chat"
        );

        message.setTimestamp(
                LocalTime.now()
                        .format(TIME_FORMAT)
        );

        return message;
    }


    @MessageMapping("/chat.leave")
    @SendTo("/topic/messages")
    public ChatMessage leave(
            ChatMessage message) {

        message.setType("LEAVE");

        message.setContent(
                message.getSender()
                        + " left the chat"
        );

        message.setTimestamp(
                LocalTime.now()
                        .format(TIME_FORMAT)
        );

        return message;
    }


    @MessageMapping("/chat.typing")
    @SendTo("/topic/typing")
    public ChatMessage typing(
            ChatMessage message) {

        return message;
    }
}