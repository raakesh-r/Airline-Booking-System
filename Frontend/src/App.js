import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import AdminDashboard from "./Components/Dashboards/AdminDashboard/AdminDashboard";
import UserDashboard from "./Components/Dashboards/UserDashboard/UserDashboard";
import Flight from "./Components/Flight/Flight";
import User from "./Components/User/User";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import AddFlight from "./Components/Flight/AddFlight";
import UpdateFlight from "./Components/Flight/UpdateFlight";
import SeatTypes from "./Components/SeatDetails/SeatTypes";
import AddSeatType from "./Components/SeatDetails/AddSeatType";
import UpdateSeatType from "./Components/SeatDetails/UpdateSeatType";
import AddBooking from "./Components/BookingDetails/AddBooking";
import UpdateBooking from "./Components/BookingDetails/UpdateBooking";
import ViewBooking from "./Components/BookingDetails/ViewBooking";
import UpdateUser from "./Components/User/UpdateUser";
import ManagerDashboard from "./Components/Dashboards/ManagerDashboard/ManagerDashboard";
import Confirmed from "./Components/BookingDetails/Confirmed";
import SpecificProfile from "./Components/User/SpecificProfile";

const ProfileIdContext = createContext();
function App() {
  const [isLoaded, setIsLoaded] = useState(true);
  return (
    <>
      {isLoaded && (
        <ProfileIdContext.Provider className="App">
          <BrowserRouter>
            <ToastContainer />
            <Header />
            <div className="main-body" style={{ minHeight: "85vh" }}>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path={`/${window.btoa('register')}`} element={<Register />} />
                <Route path={`/${window.btoa('adminDashboard')}`} element={<AdminDashboard />} />
                <Route path={`/${window.btoa('userDashboard')}`} element={<UserDashboard />} />
                <Route path={`/${window.btoa('success')}`} element={<Confirmed />} />
                <Route
                  path={`/${window.btoa('managerDashboard')}`}
                  element={<ManagerDashboard />}
                />
                <Route path={`/${window.btoa('seatTypes')}`} element={<SeatTypes />} />
                <Route path={`/${window.btoa('flights')}`} element={<Flight />} />
                <Route path={`/${window.btoa('addUser')}`} element={<Register />} />
                <Route path={`/${window.btoa('addFlight')}`} element={<AddFlight />} />
                <Route path={`/${window.btoa('updateFlight')}`} element={<UpdateFlight />} />
                <Route path={`/${window.btoa('seatTypes')}`} element={<SeatTypes />} />
                <Route path={`/${window.btoa('addSeatTypes')}`} element={<AddSeatType />} />
                <Route path={`/${window.btoa('updateSeatTypes')}`} element={<UpdateSeatType />} />
                <Route path={`/${window.btoa('AddBooking')}`} element={<AddBooking />} />
                <Route path={`/${window.btoa('updateBooking')}`} element={<UpdateBooking />} />
                <Route path={`/${window.btoa('viewBooking')}`} element={<ViewBooking />} />
                <Route path={`/${window.btoa('updateUser')}`} element={<UpdateUser />} />
                <Route path={`/${window.btoa('viewAllUsers')}`} element={<User />} />
                <Route path={`/${window.btoa('myprofile')}`} element={<SpecificProfile />} />
              </Routes>
            </div>
            <Footer />
          </BrowserRouter>
        </ProfileIdContext.Provider>
      )}
    </>
  );
}

export { App, ProfileIdContext };
