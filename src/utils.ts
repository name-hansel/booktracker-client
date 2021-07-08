import axios from "axios";

export const setAuthToken = (token: string) => {
  if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete axios.defaults.headers.common["Authorization"];
};

export const registerValidation = (
  username: string,
  email: string,
  password: string
) => {
  if (
    !username ||
    username.length < 6 ||
    username.length > 32 ||
    !username.match(/^(?=[a-zA-Z0-9._]{6,32}$)(?!.*[_.]{2})[^_].*[^_.]$/)
  )
    return "Username can contain only letter, number and underscore. Length should be between 6 and 32.";
  if (
    !email ||
    !email.match(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    )
  )
    return "Invalid email";
  if (
    !password ||
    !password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
  )
    return "Invalid password type. Must contain minimum eight characters, at least one letter and one number.";
  return;
};

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

export default instance;
