import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const MainDashboard = () => {
  const navigate = useNavigate();

  //   useEffect(() => {
  //     const token = localStorage.getItem("token");

  //     if (!token) {
  //       navigate("/login");
  //     }
  //   }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-40 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default MainDashboard;
