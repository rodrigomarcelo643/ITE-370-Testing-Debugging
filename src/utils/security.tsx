// src/utils/security.ts
export class SecurityValidator {
  // SQL injection patterns detection
  static hasSQLInjection(input: string): boolean {
    const sqlPatterns = [
      /(\bSELECT\b.*\bFROM\b)/i,
      /(\bINSERT\b.*\bINTO\b)/i,
      /(\bUPDATE\b.*\bSET\b)/i,
      /(\bDELETE\b.*\bFROM\b)/i,
      /(\bDROP\b.*\bTABLE\b)/i,
      /(\bUNION\b.*\bSELECT\b)/i,
      /('.*--)/,
      /('.*;)/,
      /(\bOR\b.*=.*)/i,
      /(\bAND\b.*=.*)/i,
      /--/,
      /;/,
      /('.*\bOR\b.*=)/i,
    ];
    
    return sqlPatterns.some(pattern => pattern.test(input));
  }
  
  // XSS patterns detection
  static hasXSS(input: string): boolean {
    const xssPatterns = [
      /<script[^>]*>.*<\/script>/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /<iframe[^>]*>/i,
      /<img[^>]*on\w+\s*=/i,
      /<body[^>]*on\w+\s*=/i,
      /eval\s*\(/i,
      /document\./i,
      /window\./i,
      /alert\s*\(/i,
    ];
    
    return xssPatterns.some(pattern => pattern.test(input));
  }
  
  // Sanitize input
  static sanitizeInput(input: string): string {
    if (!input) return '';
    
    let sanitized = input;
    // Remove SQL patterns
    sanitized = sanitized.replace(/['";\\-]/g, '');
    // Remove HTML tags
    sanitized = sanitized.replace(/<[^>]*>/g, '');
    // Remove script patterns
    sanitized = sanitized.replace(/javascript:/gi, '');
    sanitized = sanitized.replace(/on\w+\s*=/gi, '');
    
    return sanitized.trim();
  }
  
  // Validate username format
  static isValidUsername(username: string): boolean {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
  }
  
  // Validate password strength
  static isStrongPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  }
}