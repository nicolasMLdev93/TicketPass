import "./App.css";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/start";
import Register from "./pages/register";
import Login from "./pages/login";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import ProtectedRoute from "./components/protected_route";
import Events from "./pages/Events";
import MyTickets from "./pages/MyTickets";
import User_info from "./pages/User_info";
import About from "./pages/About";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/home"
          element={
            <DashboardLayout>
              <DashboardHome />
            </DashboardLayout>
          }
        />
      </Route>
      <Route
        path="/events"
        element={
          <DashboardLayout>
            <Events />
          </DashboardLayout>
        }
      />
      <Route
        path="/reservations"
        element={
          <DashboardLayout>
            <MyTickets />
          </DashboardLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <DashboardLayout>
            <User_info />
          </DashboardLayout>
        }
      />
      <Route
        path="/about"
        element={
          <DashboardLayout>
            <About />
          </DashboardLayout>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
