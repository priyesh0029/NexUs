import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "@material-tailwind/react";
import SignUpForm from "./pages/User/Auths/SignUp";
import LoginForm from "./pages/User/Auths/Login";
import Home from "./pages/User/Home/Home";
import { useSelector } from "react-redux";
import Profile from "./pages/User/Profile/Profile";
import Settings from "./pages/User/Settings/settings";
import Inbox from "./pages/User/Message/Inbox";
import AdminLogin from "./pages/Admin/adminAuth/adminLogin";
import Dashboard from "./pages/Admin/DashBoard/Dashboard";

const App = () => {
  const token = useSelector(
    (store: { token: { token: string } }) => store.token.token
  );
  console.log("user token",token);

  const adminToken = useSelector(
    (store: { adminToken: { token: string } }) => store.adminToken.token
  );
  console.log("admin token",adminToken);

  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={token ? <Home /> : <LoginForm />} />

          <Route path="/signup" element={<SignUpForm />} />

          <Route path="/home" element={token ? <Home /> : <LoginForm />} />

          <Route
            path="/profile/:proId"
            element={token ? <Profile /> : <LoginForm />}
          />
          <Route path="/settings" element={token ? <Settings/> :  <LoginForm />} />

          <Route path="/messages" element={token ? <Inbox/> :  <LoginForm />} />
          <Route path="/admin" element={adminToken ? <Dashboard/> : <AdminLogin />} />
          <Route path="/dashboard" element={adminToken ? <Dashboard/> : <AdminLogin />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
};

export default App;
