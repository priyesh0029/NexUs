
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "@material-tailwind/react";
import LoginForm from "./User/Auths/Login";
import SignUpForm from "./User/Auths/SignUp";

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<LoginForm/>} />
        </Routes>
        <Routes>
          <Route path="/signup" element={<SignUpForm/>} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
};

export default App;
