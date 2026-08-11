/**
 * Centralized API Client Service.
 * Responsible for wrapping fetch requests, attaching Bearer JWT tokens, and handling API errors.
 */
import { ApiResponse } from '@/types';
import { APP_CONSTANTS } from '@/constants';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || APP_CONSTANTS.DEFAULT_API_BASE_URL;

/**
 * Centralized API client wrapper supporting JWT Bearer authentication headers.
 */
export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem(APP_CONSTANTS.AUTH.STORAGE_KEYS.TOKEN)
      : null;

  const headers: Record<string, string> = {
    [APP_CONSTANTS.HEADERS.CONTENT_TYPE_KEY]: APP_CONSTANTS.HEADERS.APPLICATION_JSON,
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers[APP_CONSTANTS.HEADERS.AUTHORIZATION_KEY] = APP_CONSTANTS.HEADERS.BEARER(token);
  }

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        message: data.message || APP_CONSTANTS.MESSAGES.ERRORS.DEFAULT_API_ERROR,
        errors: data.errors,
      };
    }

    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || APP_CONSTANTS.MESSAGES.ERRORS.NETWORK_FAILURE,
    };
  }
}
