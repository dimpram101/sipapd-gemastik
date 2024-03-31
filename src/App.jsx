import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/login/LoginForm";
import MainDashboard from "./pages/dashboard/MainDashboard";
import Home from "./pages/dashboard/home/Home";
import Detect from "./pages/dashboard/detection/Detect";
import ListUser from "./pages/dashboard/user/ListUser";
import Camera from "./pages/dashboard/camera/Camera";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="/dashboard" element={<MainDashboard />}>
            <Route index={true} element={<Home />}></Route>
            <Route path="deteksi">
              <Route index={true} element={<Detect />}></Route>
            </Route>
            <Route path="camera">
              <Route index={true} element={<Camera />}></Route>
            </Route>
            <Route path="user">
              <Route index={true} element={<ListUser />}></Route>
            </Route>
          </Route>
          <Route
            path="*"
            element={<div>Tidak ada Halaman ini - Error 404</div>}
          />
        </Routes>
      </Router>
      {/* <LoginForm /> */}
    </>
  );
}

export default App;
