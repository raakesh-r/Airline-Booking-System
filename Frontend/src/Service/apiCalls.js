import axios from "axios";
import authHeader from "../Auth/AuthHeader";
const user = JSON.parse(localStorage.getItem("user"));

class apiCalls {
  saveUser(data) {
    return axios.post("http://10.66.25.15:8080/auth/register", data, {
      headers: authHeader(),
    });
  }

  async saveBooking(data) {
    return await axios.post("http://10.66.25.15:8080/booking/add", data, {
      headers: authHeader(),
    });
  }
  getBookingByUserId(profileId) {
    const res = axios.get("http://10.66.25.15:8080/booking/get/" + profileId, {
      headers: authHeader(),
    });
    return res;
  }
  async getAllFlights() {
    return await axios.get("http://10.66.25.15:8080/flights/all", {
      headers: authHeader(),
    });
  }
  async addFlight(data) {
    return await axios.post("http://10.66.25.15:8080/flights/add", data, {
      headers: authHeader(),
    });
  }
  async deleteFlightById(data) {
    return await axios.delete("http://10.66.25.15:8080/flights/delete/" + data, {
      headers: authHeader(),
    });
  }
  async updateFlightById(data) {
    return await axios.put("http://10.66.25.15:8080/flights/update", data, {
      headers: authHeader(),
    });
  }

  async getSeatByFlightId(data) {
    return await axios.get("http://10.66.25.15:8080/seat/getseats/" + data, {
      headers: authHeader(),
    });
  }

  async saveSeatType(data) {
    return await axios.post("http://10.66.25.15:8080/seat/add", data, {
      headers: authHeader(),
    });
  }
  async updateSeatType(data) {
    return await axios.put("http://10.66.25.15:8080/seat/update", data, {
      headers: authHeader(),
    });
  }
  async deleteSeatType(data) {
    return await axios.delete("http://10.66.25.15:8080/seat/delete/" + data, {
      headers: authHeader(),
    });
  }
  async getAllUsers() {
    return await axios.get("http://10.66.25.15:8080/user/getallusers", {
      headers: authHeader(),
    });
  }
  async addUser(data) {
    return await axios.post("http://10.66.25.15:8080/auth/register", data, {
      headers: authHeader(),
    });
  }
  async updateUser(data) {
    return await axios.put("http://10.66.25.15:8080/user/update", data, {
      headers: authHeader(),
    });
  }
  async deleteUser(data) {
    return await axios.delete("http://10.66.25.15:8080/user/delete/" + data, {
      headers: authHeader(),
    });
  }
  async getAllBookings() {
    return await axios.get("http://10.66.25.15:8080/booking/get", {
      headers: authHeader(),
    });
  }
  async deleteBooking(data) {
    return await axios.delete("http://10.66.25.15:8080/booking/delete/" + data, {
      headers: authHeader(),
    });
  }
  async updateBooking(data) {
    return await axios.put("http://10.66.25.15:8080/booking/update", data, {
      headers: authHeader(),
    });
  }
  async addBooking(data) {
    return await axios.post("http://10.66.25.15:8080/booking/add", data, {
      headers: authHeader(),
    });
  }

  async getUserByUserId(data) {
    return await axios.get("http://10.66.25.15:8080/user/userbyid/" + data, {
      headers: authHeader(),
    });
  }

  async getBookingsByUserId(data) {
    return await axios.get("http://10.66.25.15:8080/booking/get/" + data, {
      headers: authHeader(),
    });
  }

  async getFlightbyFlightId(data) {
    return await axios.get("http://10.66.25.15:8080/flights/all/" + data, {
      headers: authHeader(),
    });
  }
  async getSeatbySeatId(data) {
    return await axios.get("http://10.66.25.15:8080/seat/get/" + data, {
      headers: authHeader(),
    });
  }
  async getBookingbyBookingId(data) {
    return await axios.get("http://10.66.25.15:8080/booking/getbooking/" + data, {
      headers: authHeader(),
    });
  }
}
export default new apiCalls();
