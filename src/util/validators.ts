export const validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  let valid: boolean = true;

  const errors = { username: "", email: "", password: "", confirmPassword: "" };
  let currentLength = Object.keys(errors).length;

  if (username.trim().length === 0) {
    console.log("username", username.trim().length);
    errors.username = "username must not be empty";
    valid = false;
  }
  if (email.trim().length === 0) {
    errors.email = "Email must not be empty";
    valid = false;
  } else {
    const regEx =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(regEx)) {
      errors.email = "Invalid Email format";
      valid = false;
    }
  }
  if (password.trim().length === 0) {
    errors.password = "password must not be empty";
    valid = false;
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "passwords must match";
    valid = false;
  }
  let newLength = Object.keys(errors).length;

  return { errors, valid };
};
