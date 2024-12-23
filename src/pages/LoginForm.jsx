import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // const user = userCredential.user;
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      navigate("/dashboard");
    }
  });

  console.log(isLoading);

  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center bg-[#09006F]">
        <form
          onSubmit={handleLogin}
          className="p-8 sm:p-8 md:p-16 lg:p-20 xl:p-24 bg-gray-100 mx-auto border shadow-xl border-gray-200 rounded-lg hover:bg-gray-100 "
        >
          <p className="block text-center text-4xl mb-2 ustify-center font-bold">
            Masuk
          </p>

          <label className="block mb-2 text-sm font-medium text-gray-900">
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="2 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2a7 7 0 0 0-7 7 3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1c.6 0 1-.4 1-1V9a5 5 0 1 1 10 0v7a3 3 0 0 1-3 3 2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v1c0 1.1.9 2 2 2h1a2 2 0 0 0 1.7-1h.4a5 5 0 0 0 4.8-4h.1a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3 7 7 0 0 0-7-7Zm1.5 3.3a4 4 0 0 0-4.4 1 1 1 0 0 0 1.4 1.3 2 2 0 0 1 2.9 0A1 1 0 1 0 14.8 6a4 4 0 0 0-1.3-.8Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              className="px-64 invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500 focus:ring-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-red-500 block ps-10 p-2.5"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <label className="block my-2 text-sm font-medium text-gray-900">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 20"
              >
                <path d="M14 7h-1.5V4.5a4.5 4.5 0 1 0-9 0V7H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-5 8a1 1 0 1 1-2 0v-3a1 1 0 1 1 2 0v3Zm1.5-8h-5V4.5a2.5 2.5 0 1 1 5 0V7Z" />
              </svg>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              className="invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500 focus:ring-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-red-500 block w-full ps-10 p-2.5"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="submit"
            className="text-white bg-[#8F00FF] w-full text-center mt-10 place-content-center hover:bg-[#C277FD] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 disabled:opacity-50 "
            disabled={isLoading}
          >
            Masuk
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
