import axios from "axios";
import authHeader from "./AuthHeader";
import { useNavigate } from "react-router-dom";
const API_URL = "http://10.66.25.15:8080/auth/login";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL, {
        username: username,
        password: password,
      })
      .then((response) => {
        // console.log("Here");
        localStorage.setItem("user", JSON.stringify(response.data.jwt));
        localStorage.setItem(
          "profileId",
          JSON.stringify(response.data.user.userId)
        );
        localStorage.setItem(
          "roleId",
          JSON.stringify(response.data.user.authorities[0].roleId)
        );
        localStorage.setItem(
          "roleName",
          JSON.stringify(response.data.user.authorities[0].authority)
        );
        // console.log(JSON.stringify(response.data.profile.profileId))
        console.log("USERId :" + response.data.user.userId);
        console.log("USERNAME :" + response.data.user.username);
        console.log("ROLEId :" + response.data.user.authorities[0].roleId);
        console.log("ROLENAME :" + response.data.user.authorities[0].authority);
        return response.data.user.authorities[0].roleId;
      });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("profileId");
    localStorage.removeItem("roleId");
    localStorage.removeItem("roleName");
  }
}

export default new AuthService();
