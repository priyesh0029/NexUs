
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "@material-tailwind/react";
import SignUpForm from "./pages/User/Auths/SignUp";
import LoginForm from "./pages/User/Auths/Login";
import Home from "./pages/User/Home/Home";
import { useSelector } from "react-redux";

const App = () => {
  const token = useSelector((store:{token:{token:string}}) => store.token.token)
  console.log(token);
  
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={token ? <Home/> :<LoginForm />} />
        </Routes>
        <Routes>
          <Route path="/signup" element={<SignUpForm/>} />
        </Routes>
        <Routes>
          <Route path="/home" element={token ? <Home/> :<LoginForm />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
};

export default App;
