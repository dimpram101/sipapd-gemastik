import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { username } = useAuth();
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-16 z-40">
      <div className="flex justify-end items-center h-full space-x-4">
        <p>{username}</p>
        <button
          onClick={handleLogout}
          className="px-4 text-red-400 hover:text-red-500"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
