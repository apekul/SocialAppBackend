const validateEmail = (email) => {
  // Regular expression to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  // Password must not be empty and should be at least 8 characters long
  return password && password.length >= 8;
};

module.exports = { validateEmail, validatePassword };
