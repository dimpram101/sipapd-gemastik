import "./App.css";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import MainDashboard from "./layouts/MainDashboard";
import Home from "./pages/dashboard/home/Home";
import Detect from "./pages/dashboard/detection/Detect";
import ListUser from "./pages/dashboard/user/ListUser";
import Camera from "./pages/dashboard/camera/Camera";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/dashboard",
    element: <MainDashboard />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "deteksi",
        element: <Detect />,
      },
      {
        path: "camera",
        element: <Camera />,
      },
      {
        path: "user",
        element: <ListUser />,
      },
    ],
  },
  {
    path: "/*",
    element: <div>Tidak ada Halaman ini - Error 404</div>
  }
])


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
