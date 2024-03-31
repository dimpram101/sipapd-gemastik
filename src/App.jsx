import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/login/LoginForm";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />}></Route>
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
