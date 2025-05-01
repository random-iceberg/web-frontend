import axios from "axios";

/**
 * Handles API errors, logs them, and returns a user-friendly message.
 * Created this to replace all the error handling with one unified validator
 *
 * @param error The error object caught (expected to be from Axios or general Error).
 * @param context A string describing the context where the error occurred (e.g., "fetching models, random TS syntax").
 * @returns A user-friendly error message string, MUST BE USER FRIENDLY(ALL TEAM MEMBERS PLS).
 */
export const handleApiError = (error: unknown, context?: string): string => {
  const prefix = context ? `Error ${context}` : "An error occurred";
  let userMessage = "An unexpected error occurred. Please try again later.";

  console.error(`${prefix}:`, error); // Log the full error for debugging, helpful for other devs too

  if (axios.isAxiosError(error)) {
    if (
      error.code === "ECONNREFUSED" ||
      error.message.includes("Network Error")
    ) {
      userMessage =
        "Cannot connect to the backend server. Please make sure it is running.";
    } else if (error.response) {
      // Handle specific HTTP status codes if needed
      if (error.response.status === 404) {
        userMessage =
          "API endpoint not found. Please check the server configuration.";
      } else if (error.response.status >= 500) {
        userMessage =
          "A server error occurred. Please try again later or contact support.";
      } else if (error.response.data?.detail) {
        // Use detail from FastAPI validation errors if available
        userMessage = `Server error: ${error.response.data.detail}`;
      } else {
        userMessage = `Server error: ${error.response.status} ${error.response.statusText}`;
      }
    } else {
      // Error without a response (e.g., timeout)
      userMessage =
        "Failed to get a response from the server. Please try again.";
    }
  } else if (error instanceof Error) {
    // This is for General JavaScript errors, dunno what else to use
    userMessage = `An unexpected error occurred: ${error.message}`;
  }

  return userMessage;
};
