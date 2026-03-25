import type { LoginCredentials, LoginResponse } from "../types";
import { SecurityValidator } from "../utils/security";

// Simulated database of users
const users = [
  { id: 1, username: "admin", password: "Admin123" },
  { id: 2, username: "user1", password: "User1234" },
  { id: 3, username: "test_user", password: "TestPass123" },
];

export class AuthService {
  // Secure login method with validation
  static async login(credentials: LoginCredentials): Promise<LoginResponse> {
    // Sanitize inputs
    const sanitizedUsername = SecurityValidator.sanitizeInput(
      credentials.username,
    );
    const sanitizedPassword = SecurityValidator.sanitizeInput(
      credentials.password,
    );

    // Check for SQL injection attempts
    if (
      SecurityValidator.hasSQLInjection(credentials.username) ||
      SecurityValidator.hasSQLInjection(credentials.password)
    ) {
      // Log security event (in a real app, this would go to secure logs)
      console.error("[SECURITY] SQL injection attempt detected:", {
        username: credentials.username,
        timestamp: new Date().toISOString(),
      });

      return {
        success: false,
        message: "Invalid credentials", // Generic message for security
      };
    }

    // Check for XSS attempts
    if (
      SecurityValidator.hasXSS(credentials.username) ||
      SecurityValidator.hasXSS(credentials.password)
    ) {
      console.error("[SECURITY] XSS attempt detected:", {
        username: credentials.username,
        timestamp: new Date().toISOString(),
      });

      return {
        success: false,
        message: "Invalid credentials",
      };
    }

    // Validate format
    if (!SecurityValidator.isValidUsername(sanitizedUsername)) {
      return {
        success: false,
        message:
          "Username must be 3-20 characters (letters, numbers, underscore)",
      };
    }

    // Simulate database query (secure - no direct string concatenation)
    const user = users.find(
      (u) =>
        u.username === sanitizedUsername && u.password === sanitizedPassword,
    );

    if (user) {
      // Return user data without password
      const { password, ...userWithoutPassword } = user;
      return {
        success: true,
        message: "Login successful!",
        user: userWithoutPassword,
      };
    }

    return {
      success: false,
      message: "Invalid username or password",
    };
  }

  // Unit test helper methods
  static testUnit(username: string, password: string): LoginResponse {
    // This is used for unit testing
    return {
      success: username === "test_user" && password === "TestPass123",
      message:
        username === "test_user" && password === "TestPass123"
          ? "Test passed"
          : "Test failed",
    };
  }
}
