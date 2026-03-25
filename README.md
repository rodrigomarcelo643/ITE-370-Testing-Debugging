# 🔐 Secure Login System with Comprehensive Testing

## ITE 370 - Module 10: Testing and Debugging for Security

---

## 🛡️ Technology Stack & Security Badges

| Category       | Technologies & Badges                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Frontend**   | ![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-3178C6?style=flat-square&logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-4.0.0-646CFF?style=flat-square&logo=vite&logoColor=white)                                                                                    |
| **Security**   | ![SQL Injection Protection](https://img.shields.io/badge/SQL_Injection_Protection-Active-00C853?style=flat-square&logo=mysql&logoColor=white) ![XSS Protection](https://img.shields.io/badge/XSS_Protection-Active-00C853?style=flat-square&logo=javascript&logoColor=white) ![Input Sanitization](https://img.shields.io/badge/Input_Sanitization-Enabled-00C853?style=flat-square&logo=checkmarx&logoColor=white) ![Secure Logging](https://img.shields.io/badge/Secure_Logging-Enabled-00C853?style=flat-square&logo=datadog&logoColor=white) |
| **Testing**    | ![Unit Testing](https://img.shields.io/badge/Unit_Testing-Passed-4CAF50?style=flat-square&logo=jest&logoColor=white) ![Integration Testing](https://img.shields.io/badge/Integration_Testing-Passed-4CAF50?style=flat-square&logo=testing-library&logoColor=white) ![Security Testing](https://img.shields.io/badge/Security_Testing-Active-FF6B6B?style=flat-square&logo=owasp&logoColor=white)                                                                                                                                                 |
| **Compliance** | ![OWASP Top 10](https://img.shields.io/badge/OWASP_Top_10-Compliant-2E7D32?style=flat-square&logo=owasp&logoColor=white) ![CERT Secure Coding](https://img.shields.io/badge/CERT_Secure_Coding-Implemented-FF6B6B?style=flat-square&logo=cert&logoColor=white)                                                                                                                                                                                                                                                                                   |

---

## 📋 Table of Contents

1. [Project Overview](#-project-overview)
2. [Learning Objectives](#-learning-objectives-demonstrated)
3. [Key Security Features](#-key-security-features)
4. [Testing Framework](#-testing-framework)
5. [First-Time User Tutorial](#-first-time-user-tutorial)
6. [Installation and Setup](#-installation-and-setup)
7. [How to Use](#-how-to-use-the-application)
8. [Manual Testing Guide](#-manual-testing-guide)
9. [Test Credentials](#-test-credentials)
10. [Project Structure](#-project-structure)
11. [Troubleshooting](#-troubleshooting)

---

## 📖 Project Overview

This project is a **secure login system** built with **React TypeScript** and **Tailwind CSS** that demonstrates essential security testing concepts from **ITE 370 Module 10: Testing and Debugging for Security**. The application implements multiple layers of security testing including **unit testing**, **integration testing**, and **security testing**.

### What This Project Demonstrates

| Feature                     | Description                                     |
| --------------------------- | ----------------------------------------------- |
| **Secure Authentication**   | Password validation, input sanitization         |
| **Vulnerability Detection** | SQL injection detection, XSS pattern matching   |
| **Attack Prevention**       | Input sanitization, malicious pattern blocking  |
| **Comprehensive Testing**   | Automated test suites, manual testing interface |
| **Secure Debugging**        | Generic error messages, secure logging          |

---

## 🎯 Learning Objectives Demonstrated

| #     | Objective                                                                              | Status      |
| ----- | -------------------------------------------------------------------------------------- | ----------- |
| **1** | Conduct unit testing and integration testing                                           | ✅ Complete |
| **2** | Identify and fix security vulnerabilities                                              | ✅ Complete |
| **3** | Apply secure testing practices aligned with cybersecurity standards                    | ✅ Complete |
| **4** | Identify and resolve security vulnerabilities during debugging or attack-style testing | ✅ Complete |

---

## 🛡️ Key Security Features

### 1. SQL Injection Protection

| Attack Pattern        | Example                               | Response                   |
| --------------------- | ------------------------------------- | -------------------------- |
| Always True Condition | `admin' OR '1'='1`                    | Blocked with generic error |
| Comment Injection     | `admin' --`                           | Blocked with generic error |
| Union Attack          | `admin' UNION SELECT * FROM users --` | Blocked with generic error |
| Multiple Statements   | `admin'; DROP TABLE users; --`        | Blocked with generic error |

### 2. Cross-Site Scripting (XSS) Protection

| Attack Pattern      | Example                            | Protection        |
| ------------------- | ---------------------------------- | ----------------- |
| Script Injection    | `<script>alert('xss')</script>`    | Tags removed      |
| Event Handler       | `<img src=x onerror=alert('xss')>` | Handlers removed  |
| JavaScript Protocol | `javascript:alert('xss')`          | Protocol stripped |

### 3. Input Validation

| Validation Type    | Rules                                           |
| ------------------ | ----------------------------------------------- |
| Username Format    | 3-20 characters, alphanumeric + underscore only |
| Password Strength  | 8+ chars, 1 uppercase, 1 lowercase, 1 number    |
| Input Sanitization | Remove SQL chars, HTML tags, JavaScript         |

### 4. Secure Debugging Practices

| Practice               | Benefit                         |
| ---------------------- | ------------------------------- |
| Generic Error Messages | Prevents user enumeration       |
| Secure Logging         | Audit trail without exposure    |
| No Stack Traces        | Prevents information disclosure |

---

## ✨ First-Time User Tutorial

To enhance the user experience and provide immediate context, the application now includes a **tutorial modal** that appears on a user's first visit.

| Feature              | Description                                                                                                             |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Welcome Modal**    | A pop-up that guides new users through the application's purpose and key features.                                      |
| **One-Time Display** | The modal uses `localStorage` to ensure it only appears once per user, avoiding disruption on subsequent visits.        |
| **Key Information**  | It provides a quick overview of the security features, how to test them, and the credentials to use for manual testing. |

---

## 🧪 Testing Framework

### Unit Tests

| Test             | Input                  | Result  |
| ---------------- | ---------------------- | ------- |
| Valid Login      | admin / Admin123       | ✅ Pass |
| Invalid Password | admin / WrongPass      | ✅ Pass |
| Invalid Username | nonexistent / Admin123 | ✅ Pass |
| SQL Injection    | admin' OR '1'='1       | ✅ Pass |

### Integration Tests

| Test                            | Expected | Result  |
| ------------------------------- | -------- | ------- |
| Full Login Flow - Valid User    | Success  | ✅ Pass |
| Full Login Flow - Invalid User  | Failure  | ✅ Pass |
| Full Login Flow - SQL Injection | Blocked  | ✅ Pass |

### Security Tests

| Attack Type                    | Status       |
| ------------------------------ | ------------ |
| SQL Injection - OR 1=1         | 🛡️ Blocked   |
| SQL Injection - Comment Attack | 🛡️ Blocked   |
| SQL Injection - Union Select   | 🛡️ Blocked   |
| XSS - Script Tag               | 🛡️ Sanitized |
| XSS - Image OnError            | 🛡️ Sanitized |

---
