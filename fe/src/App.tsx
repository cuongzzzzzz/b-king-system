import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import AllBookingByUSer from "./pages/AllBookingByUser";
import BookingInfomation from "./pages/BookingInfomation";
import Checkout from "./pages/Checkout";
import Conversation from "./pages/Conversation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Search from "./pages/Search";
import Thankyou from "./pages/Thankyou";

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ChatLayout from "./components/ChatLayout";
import AdminLayout from "./components/admin/AdminLayout";
import Station from "./pages/admin/Station";
import EditStation from "./pages/admin/AddStation";
import AddStation from "./pages/admin/AddStation";
import RoutePage from "./pages/admin/Route";
import EditRoute from "./pages/admin/EditRoute";
import AddRoute from "./pages/admin/AddRoute";
import Trip from "./pages/admin/Trip";
import AddTrip from "./pages/admin/AddTrip";
import EditTrip from "./pages/admin/EditTrip";
import RequireCarrier from "./components/admin/RequireCarrier";
import Profile from "./pages/Profile";
import ContentLayout from "./components/ContentLayout";
import Review from "./pages/Review";
import Vehicle from "./pages/admin/Vehicle";
import Dashboard from "./pages/admin/Dashboard";
import BecomePartner from "./pages/BecomePartner";
const stripePromise = loadStripe('pk_test_51P2V9N2L099IelWroAIHvVzS9Ej9YGquvWjmM9zZvPkzkfFWsFt6wQdEQIcHhmTek3UlPQwu0kOpGiJXcmTfRsJX00LWG6pmwY');


function App() {



  return (
    <>
      <Elements stripe={stripePromise}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/booking-infomation" element={<BookingInfomation />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/thankyou" element={<Thankyou />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/become-partner" element={<BecomePartner />} />
            <Route element={<ContentLayout />}>
              <Route path="/profile/info" element={<Profile />} />
              <Route path="/profile/booking" element={<AllBookingByUSer />} />
              <Route path="/profile/review" element={<Review />} />
            </Route>

            <Route path="*" element={<NotFound />} />
            <Route element={<RequireAuth />}>
              <Route element={<AllBookingByUSer />} path="/all-booking" />
              {/* <Route element={<Conversation />} path="/conversation" /> */}
            </Route>
          </Route>
          <Route element={<ChatLayout />}>
            <Route element={<RequireAuth />}>
              <Route element={<Conversation />} path="/conversation" />
            </Route>
          </Route>
          <Route element={<RequireCarrier />}>


            <Route element={<AdminLayout />}  >
              <Route element={<Dashboard />} path="/admin/dashboard"></Route>
              <Route element={<Station />} path="/admin/station"></Route>
              <Route element={<EditStation />} path="/admin/station/:id"></Route>
              <Route element={<AddStation />} path="/admin/station/add"></Route>
              <Route element={<RoutePage />} path="/admin/route"></Route>
              <Route element={<EditRoute />} path="/admin/route/:id"></Route>
              <Route element={<AddRoute />} path="/admin/route/add"></Route>
              <Route element={<Trip />} path="/admin/trip"></Route>
              <Route element={<AddTrip />} path="/admin/trip/add"></Route>
              <Route element={<EditTrip />} path="/admin/trip/:id"></Route>
              <Route element={<Vehicle />} path="/admin/vehicle"></Route>
            </Route>
          </Route>
          <Route element={<Login />} path="/login"></Route>
        </Routes >
      </Elements >
    </>
  );
}

export default App;
