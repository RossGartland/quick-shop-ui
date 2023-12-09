import axios from "axios";
const API_URL = "http://localhost:8081/auth-service/api/auth/";
class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(username, forename, surname, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      forename,
      surname,
      email,
      password,
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
  getUserDetails = (userID) => {
    const url = "http://localhost:8081/auth-service/api/auth/users/";
    return axios.get(url + userID).then((res) => {
      return res.data;
    });
  };
  resetPassword(formData) {
    return axios.post(API_URL + "forgot_password", formData);
  }
}
export default new AuthService();
