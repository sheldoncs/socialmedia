export const validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  let currentLength = JSON.stringify(errors).length;

  if (username.trim().length === 0) {
    errors.username = "username must not be empty";
  }
  if (email.trim().length === 0) {
    errors.email = "Email must not be empty";
  } else {
    const regEx =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(regEx)) {
      errors.email = "Invalid Email format";
    }
  }
  if (password.trim().length === 0) {
    errors.password = "password must not be empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "passwords must match";
  }
  let newLength = JSON.stringify(errors).length;

  return { errors, valid: newLength === currentLength };
};

export const validateLogin = (username: String, password: String) => {
  const errors = { username: "", password: "", general: "" };
  let currentLength = JSON.stringify(errors).length;

  if (username.trim().length === 0) {
    errors.username = "username must not be empty";
  }

  if (password.trim().length === 0) {
    errors.password = "password must not be empty";
  }
  let newLength = JSON.stringify(errors).length;
  return { errors, valid: newLength === currentLength };
};
