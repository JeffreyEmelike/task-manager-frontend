const ACCESS_KEY = "tm_access_token";
const REFRESH_KEY = "tm_refresh_token";

// Save both tokens after login or register
export const saveTokens = (access: string, refresh: string): void => {
  localStorage.setItem(ACCESS_KEY, access);
  localStorage.setItem(REFRESH_KEY, refresh);
};

// Read the access token - used by Axios interceptor on every request
export const getAccessToken = (): string | null =>
  localStorage.getItem(ACCESS_KEY);

// Read the refresh token - used when the access token expires
export const getRefreshToken = (): string | null =>
  localStorage.getItem(REFRESH_KEY);

// Clear both on logout
export const clearTpkens = (): void => {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
};

// Quick check - does the user have a stored token?
// Used by ProtectedRoute to decide whether to show the app or redirect
export const isAuthenticated = (): boolean => !!getAccessToken();
