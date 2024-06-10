import { useCallback, useEffect, useMemo, useState } from "react";
import { collection, getDocs, orderBy, query, Timestamp, where } from "firebase/firestore";
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
  const [loading, setLoading] = useState(true);
  const [detections, setDetections] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const fetchDetections = useCallback(async () => {
    const startDate = Timestamp.fromDate(new Date(date + "T00:00:00"));
    const endDate = Timestamp.fromDate(new Date(date + "T23:59:59"));
    const exeQuery = query(
      collection(db, "detections"),
      where("time", "<", endDate),
      where("time", ">=", startDate),
      orderBy("time", "desc")
    );
    const querySnapshot = await getDocs(exeQuery);
    // const detections = querySnapshot.docs.filter(doc => doc.data().time >= Timestamp.fromDate(new Date(date + "T00:00:00")));
    setDetections(
      querySnapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }))
    );
    setLoading(false);
  }, [date]);

  useEffect(() => {
    fetchDetections();
  }, [fetchDetections]);

  const filteredDetections = useMemo(
    () =>
      detections.length > 0
        ? detections.map((detection) => ({
            attribute: detection.attribute.filter((attr) => attr in atribut),
            docId: detection.docId,
            image_url: detection.image_url,
            time: detection.time,
          }))
        : [],
    [detections]
  );

  if (loading) {
    return (
      <div className="flex flex-col w-full h-[calc(100vh-16px)] justify-center items-center">
        <Loading type="spin" color="#8F00FF" />;
      </div>
    );
  }

  return (
    <>
      <div className="rounded-xl bg-[#D6CBFF] p-2 mb-4 max-w-[100rem] mx-auto">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex bg-white px-6 py-3 justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              List Pendeteksian
            </h1>
            <input
              type="date"
              className="px-3 py-2 border border-gray-300 rounded-lg"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setLoading(true);
              }}
              max={new Date().toISOString().split("T")[0]}
            />
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
              {filteredDetections.length > 0 ? (
                filteredDetections.map((detection) => (
                  <tr
                    className="odd:bg-white  even:bg-gray-100  border-b "
                    key={detection["time"]}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {detection["attribute"]
                        .map((name) => atribut[name])
                        .join(", ")}
                    </th>
                    <td className="px-6 py-4">
                      {timestampToDatetime(detection["time"])}
                    </td>
                    {/* <td className="px-6 py-4">Lapangan 1</td> */}
                    <td className="px-6 py-4 underline">
                      <a href={detection["image_url"]} target="_blank">
                        Gambar
                      </a>
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
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center bg-gray-100 py-4">
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* <div className="flex justify-center items-center space-x-3 p-4 bg-gray-50">
            <button className="px-3 py-3 bg-[#8F00FF] text-white rounded-md">
              <FaChevronLeft />
            </button>
            <div className="py-3 px-4 border">1</div>
            <button className="px-3 py-3 bg-[#8F00FF] text-white rounded-md">
              <FaChevronRight />
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Detect;
