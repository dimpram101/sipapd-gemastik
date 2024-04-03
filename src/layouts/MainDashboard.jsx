import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { auth } from "../config/firebase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

const MainDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
    });
  }, [navigate]);
  // const navigate = useNavigate();

  //   useEffect(() => {
  //     const token = localStorage.getItem("token");

  //     if (!token) {
  //       navigate("/login");
  //     }
  //   }, [navigate]);

  return (
    <div className="min-h-screen ">
      <Sidebar />
      <Navbar />
      <div className="pl-40 pt-16">
        <div className="pl-4 pt-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
