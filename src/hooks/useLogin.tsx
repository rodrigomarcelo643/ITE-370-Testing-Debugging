import { useState } from "react";
import { AuthService } from "../services/authService";
import type { LoginCredentials, LoginResponse } from "../types";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<LoginResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const result = await AuthService.login(credentials);
      setResponse(result);

      if (!result.success) {
        setError(result.message);
      }

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResponse(null);
    setError(null);
    setLoading(false);
  };

  return {
    loading,
    response,
    error,
    handleLogin,
    reset,
  };
};
