import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import FormModal from "../components/FormModal";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../config/firebase";
import Loading from "react-loading";
import { timestampToDatetime } from "../../../utils/timestampToDatetime";

const atribut = {
  "No-Helmet": "Helmet",
  "No-Vest": "Vest",
  "No-Shoes": "Shoes",
  "No-Gloves": "Gloves",
};

const Detect = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [detections, setDetections] = useState([]);

  const fetchDetections = async () => {
    const exeQuery = query(collection(db, "detections"), orderBy("time", "desc"));
    const querySnapshot = await getDocs(exeQuery);
    setDetections(
      querySnapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }))
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchDetections();
  }, []);

  if (loading) {
    return <Loading type="spin" color="#8F00FF" />;
  }

  return (
    <>
      <FormModal open={open} onClose={() => setOpen(false)}>
        <h1 className="text-2xl text-center font-semibold text-gray-800">
          Tambah Akun
        </h1>
        <form className="w-[600px] px-6 py-4 flex flex-col space-y-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm text-gray-600">
              Nama
            </label>
            <input
              type="text"
              id="name"
              className="border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="jabatan" className="text-sm text-gray-600">
              Jabatan
            </label>
            <input
              type="text"
              id="jabatan"
              className="border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="Password" className="text-sm text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="Password"
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
            <h1 className="text-2xl font-bold text-gray-800">
              List Pendeteksian
            </h1>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Atribut
                </th>
                <th scope="col" className="px-6 py-3">
                  Waktu - Tanggal
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  Lokasi
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Gambar
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  Action
                </th> */}
              </tr>
            </thead>
            <tbody>
              {detections.map((detection) => (
                <tr
                  className="odd:bg-white  even:bg-gray-100  border-b "
                  key={detection["time"]}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {Array.from(new Set(detection['attribute'])).map(name => atribut[name]).join(", ")}
                  </th>
                  <td className="px-6 py-4">{timestampToDatetime(detection["time"])}</td>
                  {/* <td className="px-6 py-4">Lapangan 1</td> */}
                  <td className="px-6 py-4 underline">
                    <a href={detection["image_url"]} target="_blank">Gambar</a>
                  </td>
                  {/* <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-red-600 hover:underline"
                    >
                      Hapus
                    </a>
                  </td> */}
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

export default Detect;
