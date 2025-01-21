export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.toLowerCase);
};

export const validatePassword = (password) => {
  return password && password.length > 6;
};
