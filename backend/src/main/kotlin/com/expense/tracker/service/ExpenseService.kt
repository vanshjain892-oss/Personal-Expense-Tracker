package com.expense.tracker.service

import com.expense.tracker.dto.ExpenseRequest
import com.expense.tracker.dto.ExpenseResponse
import com.expense.tracker.entity.Expense
import com.expense.tracker.exception.BadRequestException
import com.expense.tracker.exception.ResourceNotFoundException
import com.expense.tracker.repository.ExpenseRepository
import com.expense.tracker.repository.UserRepository
import org.springframework.stereotype.Service
import java.time.format.DateTimeFormatter

@Service
class ExpenseService(
    private val expenseRepository: ExpenseRepository,
    private val userRepository: UserRepository
) {

    // Get all expenses for the logged-in user
    fun getAllExpenses(userEmail: String): List<ExpenseResponse> {
        val user = findUserByEmail(userEmail)
        return expenseRepository.findByUserId(user.id)
            .sortedByDescending { it.date } // Sort newest first
            .map { it.toResponse() }
    }

    // Get a single expense by ID (only if it belongs to this user)
    fun getExpenseById(id: Long, userEmail: String): ExpenseResponse {
        val user = findUserByEmail(userEmail)
        val expense = expenseRepository.findById(id)
            .orElseThrow { ResourceNotFoundException("Expense not found.") }

        // Security check: ensure this expense belongs to the current user
        if (expense.user.id != user.id) {
            throw BadRequestException("You are not authorized to access this expense.")
        }

        return expense.toResponse()
    }

    // Create a new expense for the logged-in user
    fun createExpense(request: ExpenseRequest, userEmail: String): ExpenseResponse {
        val user = findUserByEmail(userEmail)

        val expense = Expense(
            title = request.title,
            amount = request.amount,
            category = request.category,
            date = request.date,
            note = request.note,
            user = user
        )

        return expenseRepository.save(expense).toResponse()
    }

    // Update an existing expense
    fun updateExpense(id: Long, request: ExpenseRequest, userEmail: String): ExpenseResponse {
        val user = findUserByEmail(userEmail)
        val expense = expenseRepository.findById(id)
            .orElseThrow { ResourceNotFoundException("Expense not found.") }

        // Security check: only the owner can update
        if (expense.user.id != user.id) {
            throw BadRequestException("You are not authorized to update this expense.")
        }

        // Create updated expense (Kotlin data classes are immutable, so we use copy())
        val updatedExpense = expense.copy(
            title = request.title,
            amount = request.amount,
            category = request.category,
            date = request.date,
            note = request.note
        )

        return expenseRepository.save(updatedExpense).toResponse()
    }

    // Delete an expense
    fun deleteExpense(id: Long, userEmail: String) {
        val user = findUserByEmail(userEmail)
        val expense = expenseRepository.findById(id)
            .orElseThrow { ResourceNotFoundException("Expense not found.") }

        // Security check: only the owner can delete
        if (expense.user.id != user.id) {
            throw BadRequestException("You are not authorized to delete this expense.")
        }

        expenseRepository.delete(expense)
    }

    // Helper: find a user by email or throw an exception
    private fun findUserByEmail(email: String) =
        userRepository.findByEmail(email)
            .orElseThrow { ResourceNotFoundException("User not found.") }

    // Helper: convert an Expense entity to an ExpenseResponse DTO
    private fun Expense.toResponse() = ExpenseResponse(
        id = id,
        title = title,
        amount = amount,
        category = category,
        date = date,
        note = note,
        createdAt = createdAt.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME)
    )
}
