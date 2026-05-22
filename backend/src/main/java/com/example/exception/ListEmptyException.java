
package com.example.exception;

public class ListEmptyException extends RuntimeException {

    public ListEmptyException(String message) {
        super(message);
    }
}
