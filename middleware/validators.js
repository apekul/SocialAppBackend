const validateUsername = (username) => {
  // Username must not be empty and should be between 3 and 20 characters
  return username && username.length >= 3 && username.length <= 20;
};

const validateEmail = (email) => {
  // Regular expression to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  // Password must not be empty and should be at least 8 characters long
  return password && password.length >= 8;
};

module.exports = { validateUsername, validateEmail, validatePassword };
