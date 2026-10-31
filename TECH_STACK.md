# Technical Stack

# Personal Expense Tracker for Effective Financial Management

## 1. Frontend

### React

Use React with Vite.

Purpose:

- Build the user interface
- Create reusable components
- Manage frontend state
- Handle forms
- Display transaction data
- Communicate with REST APIs

Use:

- React
- JSX
- React Hooks
- React Router

Avoid unnecessary frontend frameworks.

---

## 2. Styling

Use:

- CSS
- CSS Modules or organized CSS files

Do not use a large UI framework unless absolutely necessary.

The design should be simple and understandable for a college project.

Avoid:

- Excessive gradients
- Glassmorphism
- Excessive animations
- 3D effects
- Complex design systems

---

## 3. Backend

### Kotlin + Spring Boot

Use Kotlin as the backend programming language.

Use Spring Boot to create REST APIs.

Main technologies:

- Kotlin
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- Bean Validation

---

## 4. Database

### MySQL

Use MySQL as the relational database.

Main tables:

- users
- expenses
- income
- budgets

Relationships:

User
  |
  ├── Expenses
  |
  ├── Income
  |
  └── Budget

Each financial record must belong to a specific user.

---

## 5. ORM

### Hibernate / JPA

Use Spring Data JPA and Hibernate.

Purpose:

- Map Kotlin classes to database tables
- Perform CRUD operations
- Manage relationships
- Reduce manual SQL

Example entities:

User
Expense
Income
Budget

---

## 6. Authentication

### JWT

Use JSON Web Tokens for authentication.

Authentication flow:

Register
↓
Login
↓
Validate credentials
↓
Generate JWT
↓
React receives token
↓
Token sent with protected API requests
↓
Spring Security validates token

---

## 7. Password Security

Use BCrypt password hashing.

Never store plain-text passwords.

Example:

User enters:

mypassword123

Database stores a BCrypt hash instead.

---

## 8. API Communication

Frontend communicates with backend using HTTP REST APIs.

Methods:

GET
POST
PUT
DELETE

Example:

GET /api/expenses

POST /api/expenses

PUT /api/expenses/1

DELETE /api/expenses/1

---

## 9. API Client

Use Axios or the native Fetch API.

Prefer Axios if it makes the implementation simpler.

Create a centralized API client such as:

src/api/apiClient.js

The API client should handle:

- Base URL
- JWT token
- HTTP requests
- Basic error handling

---

## 10. Development Tools

Recommended tools:

- VS Code
- IntelliJ IDEA Community Edition if required for Kotlin
- Node.js
- npm
- Java JDK
- Gradle
- MySQL
- MySQL Workbench
- Postman
- Git

---

# 11. Frontend Project Structure

Recommended structure:

frontend/

src/
│
├── components/
│   ├── Navbar.jsx
│   ├── SummaryCard.jsx
│   ├── ExpenseForm.jsx
│   ├── IncomeForm.jsx
│   ├── TransactionTable.jsx
│   ├── BudgetCard.jsx
│   └── ProtectedRoute.jsx
│
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── Transactions.jsx
│   ├── AddExpense.jsx
│   ├── AddIncome.jsx
│   └── Budget.jsx
│
├── services/
│   └── api.js
│
├── context/
│   └── AuthContext.jsx
│
├── styles/
│   ├── global.css
│   ├── login.css
│   ├── dashboard.css
│   └── transactions.css
│
├── App.jsx
└── main.jsx

---

# 12. Backend Project Structure

Recommended structure:

backend/

src/main/kotlin/

com/expense/tracker/

├── controller/
│   ├── AuthController.kt
│   ├── ExpenseController.kt
│   ├── IncomeController.kt
│   └── BudgetController.kt
│
├── service/
│   ├── AuthService.kt
│   ├── ExpenseService.kt
│   ├── IncomeService.kt
│   └── BudgetService.kt
│
├── repository/
│   ├── UserRepository.kt
│   ├── ExpenseRepository.kt
│   ├── IncomeRepository.kt
│   └── BudgetRepository.kt
│
├── entity/
│   ├── User.kt
│   ├── Expense.kt
│   ├── Income.kt
│   └── Budget.kt
│
├── dto/
│   ├── LoginRequest.kt
│   ├── RegisterRequest.kt
│   ├── ExpenseRequest.kt
│   └── IncomeRequest.kt
│
├── security/
│   ├── JwtService.kt
│   ├── JwtAuthenticationFilter.kt
│   └── SecurityConfig.kt
│
├── exception/
│   ├── GlobalExceptionHandler.kt
│   └── ResourceNotFoundException.kt
│
└── ExpenseTrackerApplication.kt

---

# 13. API Response Format

Use simple JSON responses.

Example expense:

{
  "id": 1,
  "title": "Lunch",
  "amount": 250,
  "category": "Food",
  "date": "2026-10-07",
  "note": "College lunch"
}

---

# 14. HTTP Status Codes

Use standard status codes.

200 OK
Successful GET/PUT request

201 Created
Successful POST request

400 Bad Request
Invalid input

401 Unauthorized
Missing/invalid authentication

403 Forbidden
User does not have permission

404 Not Found
Resource does not exist

500 Internal Server Error
Unexpected server error

---

# 15. Environment Configuration

Do not hard-code sensitive configuration.

Use environment/configuration variables for:

- Database URL
- Database username
- Database password
- JWT secret
- Backend URL

Do not commit real passwords or secrets to Git.

---

# 16. Versioning Philosophy

Use stable versions of:

- Java
- Kotlin
- Spring Boot
- React
- Node.js
- MySQL

Do not add packages simply because they are popular.

Every dependency should have a clear purpose.

---

# 17. Code Quality Requirements

Code must be:

- Readable
- Modular
- Beginner-friendly
- Properly named
- Commented where useful

Avoid:

- Huge files
- Extremely long functions
- Duplicate code
- Unnecessary abstractions
- Over-engineering

---

# 18. Academic Demonstration Requirements

The implementation should make it easy to demonstrate:

### React

- Components
- JSX
- useState
- useEffect
- Forms
- Validation
- Routing

### Kotlin

- Classes
- Data classes
- Functions
- Collections
- Exception handling
- OOP

### Spring Boot

- Controllers
- Services
- Repositories
- REST APIs
- CRUD

### JPA/Hibernate

- Entities
- Repositories
- Database CRUD

### JWT

- Login
- Token generation
- Protected endpoints

### Postman

Demonstrate:

- Register
- Login
- Create expense
- Get expenses
- Update expense
- Delete expense