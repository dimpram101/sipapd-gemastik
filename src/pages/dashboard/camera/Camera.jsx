import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import FormModal from "../components/FormModal";
import { IoMdAdd } from "react-icons/io";

const Camera = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <FormModal open={open} onClose={() => setOpen(false)}>
        <h1 className="text-2xl text-center font-semibold text-gray-800">
          Tambah Kamera
        </h1>
        <form className="w-[600px] px-6 py-4 flex flex-col space-y-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm text-gray-600">
              Nama Kamera
            </label>
            <input
              type="text"
              id="name"
              className="border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="lokasi" className="text-sm text-gray-600">
              Lokasi
            </label>
            <input
              type="text"
              id="lokasi"
              className="border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="status" className="text-sm text-gray-600">
              Status
            </label>
            <input
              type="text"
              id="status"
              className="border border-gray-300 p-2 rounded-md"
            />
          </div>
          <button className="px-4 py-2 bg-[#8F00FF] text-white rounded-md">
            Tambah
          </button>
        </form>
      </FormModal>
      <div className="rounded-xl bg-[#D6CBFF] p-2 max-w-[100rem] mx-auto">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex bg-white px-6 py-3 justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">List Kamera</h1>
            <button
              className="px-4 py-2 bg-[#8F00FF]  text-white rounded-md flex items-center gap-1"
              onClick={() => setOpen(true)}
            >
              <IoMdAdd className="text-xl" />
              Tambah Kamera
            </button>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Kamera
                </th>
                <th scope="col" className="px-6 py-3">
                  Lokasi
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, index) => (
                <tr
                  className="odd:bg-white  even:bg-gray-100  border-b "
                  key={index}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    Apple MacBook Pro 17
                  </th>
                  <td className="px-6 py-4">Kamera {index + 1}</td>
                  <td className="px-6 py-4">
                    {index % 2 === 0 ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Aktif
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Tidak Aktif
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 flex space-x-4">
                    <button
                      className="font-medium text-blue-600 hover:underline"
                      onClick={() => setOpen(true)}
                    >
                      Edit
                    </button>
                    <a
                      href="#"
                      className="font-medium text-red-600 hover:underline"
                    >
                      Hapus
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center items-center space-x-3 p-4 bg-gray-50">
            <button className="px-3 py-3 bg-[#8F00FF] text-white rounded-md">
              <FaChevronLeft />
            </button>
            <div className="py-3 px-4 border">1</div>
            <button className="px-3 py-3 bg-[#8F00FF] text-white rounded-md">
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Camera;
