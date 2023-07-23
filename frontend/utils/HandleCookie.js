import Cookies from 'js-cookie';

// Function to set the token in the cookie
export const setTokenCookie = (token) => {
  Cookies.set('token', token, { expires: 7 }); // Set the token cookie with a 7-day expiration
};

// Function to get the token from the cookie
export const getTokenCookie = () => {
  return Cookies.get('token');
};

// Function to remove the token from the cookie
export const removeTokenCookie = () => {
  Cookies.remove('token');
};
