package com.expense.tracker.service

import com.expense.tracker.dto.IncomeRequest
import com.expense.tracker.dto.IncomeResponse
import com.expense.tracker.entity.Income
import com.expense.tracker.exception.BadRequestException
import com.expense.tracker.exception.ResourceNotFoundException
import com.expense.tracker.repository.IncomeRepository
import com.expense.tracker.repository.UserRepository
import org.springframework.stereotype.Service
import java.time.format.DateTimeFormatter

@Service
class IncomeService(
    private val incomeRepository: IncomeRepository,
    private val userRepository: UserRepository
) {

    // Get all income records for the logged-in user
    fun getAllIncome(userEmail: String): List<IncomeResponse> {
        val user = findUserByEmail(userEmail)
        return incomeRepository.findByUserId(user.id)
            .sortedByDescending { it.date }
            .map { it.toResponse() }
    }

    // Get a single income record by ID
    fun getIncomeById(id: Long, userEmail: String): IncomeResponse {
        val user = findUserByEmail(userEmail)
        val income = incomeRepository.findById(id)
            .orElseThrow { ResourceNotFoundException("Income record not found.") }

        if (income.user.id != user.id) {
            throw BadRequestException("You are not authorized to access this income record.")
        }

        return income.toResponse()
    }

    // Create a new income record
    fun createIncome(request: IncomeRequest, userEmail: String): IncomeResponse {
        val user = findUserByEmail(userEmail)

        val income = Income(
            source = request.source,
            amount = request.amount,
            date = request.date,
            note = request.note,
            user = user
        )

        return incomeRepository.save(income).toResponse()
    }

    // Update an existing income record
    fun updateIncome(id: Long, request: IncomeRequest, userEmail: String): IncomeResponse {
        val user = findUserByEmail(userEmail)
        val income = incomeRepository.findById(id)
            .orElseThrow { ResourceNotFoundException("Income record not found.") }

        if (income.user.id != user.id) {
            throw BadRequestException("You are not authorized to update this income record.")
        }

        val updatedIncome = income.copy(
            source = request.source,
            amount = request.amount,
            date = request.date,
            note = request.note
        )

        return incomeRepository.save(updatedIncome).toResponse()
    }

    // Delete an income record
    fun deleteIncome(id: Long, userEmail: String) {
        val user = findUserByEmail(userEmail)
        val income = incomeRepository.findById(id)
            .orElseThrow { ResourceNotFoundException("Income record not found.") }

        if (income.user.id != user.id) {
            throw BadRequestException("You are not authorized to delete this income record.")
        }

        incomeRepository.delete(income)
    }

    private fun findUserByEmail(email: String) =
        userRepository.findByEmail(email)
            .orElseThrow { ResourceNotFoundException("User not found.") }

    private fun Income.toResponse() = IncomeResponse(
        id = id,
        source = source,
        amount = amount,
        date = date,
        note = note,
        createdAt = createdAt.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME)
    )
}
