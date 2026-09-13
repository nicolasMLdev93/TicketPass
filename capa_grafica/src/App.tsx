import "./App.css";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/start";
import Register from "./pages/register";
import Login from "./pages/login";
import NotFound from "./pages/NotFound"; 
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/home"
        element={
          <DashboardLayout>
            <DashboardHome />
          </DashboardLayout>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;