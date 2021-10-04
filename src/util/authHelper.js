const TOKEN_KEY = 'jwt';
import jwtDecode from 'jwt-decode';

export const login = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isLogin = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true;
  }

  return false;
};

export const isAdmin = () => {
  try {
    // valid token format
    const { role } = jwtDecode(localStorage.getItem(TOKEN_KEY));
    return role === 'admin';
  } catch (error) {
    // invalid token format
    return logout();
  }
};
