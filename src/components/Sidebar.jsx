import { IoIosWarning } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { RiFolderUserFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="fixed w-40 h-screen bg-[#09006F] z-50 flex flex-col">
      <div className="flex items-center font-bold justify-center p-4 text-white h-40">
        <img src="/logo.jpg" alt="logo" className="w-20 h-20 rounded-full" />
      </div>
      <ul className="font-md px-3 text-lg flex-1 flex flex-col gap-10 justify-start mt-4">
        <div className="space-y-2">
          <li>
            <Link to={"/dashboard/"}>
              <div className="flex flex-col items-center p-2 text-gray-900 rounded-lg group hover:text-[#8F00FF] hover:bg-[#3D0099] hover:scale-105 transition duration-300 ease-in-out">
                <IoHome className="w-12 h-12 text-white group-hover:text-[#8F00FF]" />
                <span className="flex-1 whitespace-nowrap text-white group-hover:text-[#8F00FF]">
                  Beranda
                </span>
              </div>
            </Link>
          </li>
        </div>
        <div className="space-y-2">
          <li>
            <Link to={"/dashboard/deteksi"}>
              <div className="flex flex-col items-center p-2 text-gray-900 rounded-lg group hover:text-[#8F00FF] hover:bg-[#3D0099] hover:scale-105 transition duration-300 ease-in-out">
                <IoIosWarning className="w-12 h-12 text-white group-hover:text-[#8F00FF]" />
                <span className="flex-1 whitespace-nowrap text-white group-hover:text-[#8F00FF]">
                  Daftar Deteksi
                </span>
              </div>
            </Link>
          </li>
        </div>
        {/* <div className="space-y-2">
          <li>
            <Link to={"/dashboard/camera"}>
              <div className="flex flex-col items-center p-2 text-gray-900 rounded-lg group hover:text-[#8F00FF] hover:bg-[#3D0099] hover:scale-105 transition duration-300 ease-in-out">
                <HiVideoCamera className="w-12 h-12 text-white group-hover:text-[#8F00FF]" />
                <span className="flex-1 whitespace-nowrap text-white group-hover:text-[#8F00FF]">
                  Kamera
                </span>
              </div>
            </Link>
          </li>
        </div> */}
        <div className="space-y-2">
          <li>
            <Link to={"/dashboard/user"}>
              <div className="flex flex-col items-center p-2 text-gray-900 rounded-lg group hover:text-[#8F00FF] hover:bg-[#3D0099] hover:scale-105 transition duration-300 ease-in-out">
                <RiFolderUserFill className="w-12 h-12 text-white group-hover:text-[#8F00FF]" />
                <span className="flex-1 whitespace-nowrap text-white group-hover:text-[#8F00FF]">
                  Akun
                </span>
              </div>
            </Link>
          </li>
        </div>
      </ul>
    </aside>
  );
};

export default Sidebar;
