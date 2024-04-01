import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";

const ListUser = () => {
  return (
    <div className="rounded-xl bg-[#D6CBFF] p-2 max-w-[100rem] mx-auto">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Jabatan
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
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center items-center space-x-3 p-4 bg-gray-50">
          <button className="px-3 py-3 bg-blue-500 text-white rounded-md">
            <FaChevronLeft />
          </button>
          <div className="py-3 px-4 border">1</div>
          <button className="px-3 py-3 bg-blue-500 text-white rounded-md">
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListUser;
