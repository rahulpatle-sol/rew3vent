// This file is for common backend utility functions that might be shared across different parts
// of your backend services (e.g., Firebase functions, scripts, Genkit flows running server-side).

/**
 * Delays execution for a specified number of milliseconds.
 * @param ms The number of milliseconds to wait.
 * @returns A promise that resolves after the specified delay.
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generates a simple random ID.
 * Not cryptographically secure, use for non-sensitive identifiers.
 * @param length The desired length of the ID.
 * @returns A random string ID.
 */
export function generateRandomId(length: number = 8): string {
  return Math.random().toString(36).substring(2, 2 + length);
}

/**
 * Parses a JSON string safely.
 * @param jsonString The JSON string to parse.
 * @returns The parsed object, or null if parsing fails.
 */
export function safeJsonParse<T = any>(jsonString: string): T | null {
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error("Failed to parse JSON string:", error);
    return null;
  }
}

// Add other backend-specific utilities here as needed.
// For example, error handling wrappers, data transformation functions, etc.
