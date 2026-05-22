package com.example.exception;

public class UserListEmptyException extends RuntimeException {

    public UserListEmptyException(String message) {
        super(message);
    }
}
