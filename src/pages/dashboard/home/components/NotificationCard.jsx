import { FaRegBell } from "react-icons/fa6";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Loading from "react-loading";
import { timestampToDatetime } from "../../../../utils/timestampToDatetime";

const atribut = {
  "No-Helmet": "Helmet",
  "No-Vest": "Vest",
  "No-Shoes": "Shoes",
  "No-Gloves": "Gloves",
};

const NotificationCard = ({ detections }) => {
  return (
    <div className="rounded-3xl flex-1 bg-second px-6 py-5 flex flex-col h-full">
      <div className="flex flex-row justify-between">
        <div className="flex space-x-2 items-center">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#D6CBFF]">
            <FaRegBell className="text-2xl text-[#9350FF]" />
          </div>
          <h1 className="text-xl font-bold text-black">Notifikasi</h1>
        </div>
        <Link
          to={"./deteksi"}
          relative="path"
          className="text-black italic text-sm"
        >
          Lihat Semua
        </Link>
      </div>
      <div className="flex flex-col space-y-5 overflow-y-auto h-full mt-6">
        {detections.length > 0 ? (
          detections.map(
            (detection, index) =>
              detection["attribute"].length > 0 && (
                <div
                  key={index}
                  className="flex flex-row items-center space-x-4"
                >
                  <div className="h-4 w-4 rounded-full bg-[#9350FF]"></div>
                  <div className="flex flex-col justify-center">
                    <p className="text-lg font-bold">
                      {Array.from(new Set(detection["attribute"]))
                        .map((name) => atribut[name])
                        .join(", ")}
                    </p>
                    <p className="text-sm italic font-semibold">
                      {timestampToDatetime(detection["time"])}
                    </p>
                  </div>
                </div>
              )
          )
        ) : detections.length === 0 ? (
          <div className="self-center h-full flex flex-col justify-center">
            <p className="text-xs font-bold">Tidak ada notifikasi</p>
          </div>
        ) : (
          <div className="self-center">
            <Loading type="spin" color="#8F00FF" />
          </div>
        )}
        {/* <div className="flex flex-row items-center space-x-4">
          <div className="h-4 w-4 rounded-full bg-[#9350FF]"></div>
          <div className="flex flex-col justify-center">
            <p className="text-lg font-bold">Not wearing Vest detected</p>
            <p className="text-sm italic font-semibold">12.45 | Lapangan 1</p>
          </div>
        </div>
        <div className="flex flex-row items-center space-x-4">
          <div className="h-4 w-4 rounded-full bg-[#9350FF]"></div>
          <div className="flex flex-col justify-center">
            <p className="text-lg font-bold">Not wearing Gloves detected</p>
            <p className="text-sm italic font-semibold">12.45 | Lapangan 1</p>
          </div>
        </div>
        <div className="flex flex-row items-center space-x-4">
          <div className="h-4 w-4 rounded-full bg-[#9350FF]"></div>
          <div className="flex flex-col justify-center">
            <p className="text-lg font-bold">Not wearing Helmet detected</p>
            <p className="text-sm italic font-semibold">12.45 | Lapangan 1</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

NotificationCard.propTypes = {
  detections: PropTypes.array.isRequired,
};

export default NotificationCard;
