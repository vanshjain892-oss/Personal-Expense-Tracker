package com.expense.tracker.exception

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

// This class catches exceptions from all controllers and returns clean error responses
@RestControllerAdvice
class GlobalExceptionHandler {

    // Handle resource not found (404)
    @ExceptionHandler(ResourceNotFoundException::class)
    fun handleNotFound(ex: ResourceNotFoundException): ResponseEntity<Map<String, String>> {
        val error = mapOf("error" to (ex.message ?: "Resource not found"))
        return ResponseEntity(error, HttpStatus.NOT_FOUND)
    }

    // Handle bad requests (400)
    @ExceptionHandler(BadRequestException::class)
    fun handleBadRequest(ex: BadRequestException): ResponseEntity<Map<String, String>> {
        val error = mapOf("error" to (ex.message ?: "Bad request"))
        return ResponseEntity(error, HttpStatus.BAD_REQUEST)
    }

    // Handle validation errors from @Valid annotations (400)
    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun handleValidation(ex: MethodArgumentNotValidException): ResponseEntity<Map<String, String>> {
        // Collect all field validation error messages
        val errors = ex.bindingResult.fieldErrors
            .associate { it.field to (it.defaultMessage ?: "Invalid value") }
        return ResponseEntity(errors, HttpStatus.BAD_REQUEST)
    }

    // Handle any unexpected errors (500)
    @ExceptionHandler(Exception::class)
    fun handleGeneral(ex: Exception): ResponseEntity<Map<String, String>> {
        val error = mapOf("error" to "Something went wrong. Please try again.")
        return ResponseEntity(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}
