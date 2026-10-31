package com.expense.tracker.exception

// Custom exception for when a resource (expense, income, etc.) is not found
class ResourceNotFoundException(message: String) : RuntimeException(message)

// Custom exception for business logic violations
class BadRequestException(message: String) : RuntimeException(message)
