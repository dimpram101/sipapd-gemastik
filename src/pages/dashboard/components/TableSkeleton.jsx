import { IoMdAdd } from "react-icons/io";
import Loading from "react-loading";
import PropTypes from "prop-types";

const TableSkeleton = ({ title, buttonText, headers }) => {
  return (
    <div className="rounded-xl p-2 max-w-[100rem] mx-auto animate-pulse relative">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex bg-white px-6 py-3 justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <button
            disabled
            className="px-4 py-2 bg-[#8F00FF]  text-white rounded-md flex items-center gap-1 cursor-not-allowed"
          >
            <IoMdAdd className="text-xl" />
            {buttonText}
          </button>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
              {headers.map((header, index) => (
                <th
                  scope="col"
                  className={`px-6 py-3 ${index === 0 && "w-96"}`}
                  key={index}
                >
                  {header}
                </th>
              ))}
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(10)].map((_, index) => (
              <tr
                className="odd:bg-white  even:bg-gray-100  border-b h-14"
                key={index}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                ></th>
                {headers.map((_, index) => (
                  <td className="px-6 py-4 whitespace-nowrap" key={index+new Date().toString()}></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <Loading type="spin" color="#8F00FF" height={50} width={50} />
      </div>
    </div>
  );
};

TableSkeleton.propTypes = {
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  headers: PropTypes.array.isRequired,
};

export default TableSkeleton;
