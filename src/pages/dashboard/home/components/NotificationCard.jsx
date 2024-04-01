const NotificationCard = () => {
  return (
    <div className="rounded-3xl flex-1 bg-second px-6 py-5 flex flex-col h-full">
      <div className="flex flex-row justify-between">
        <h1 className="text-xl font-bold text-black">Notifikasi</h1>
        <button className="text-black italic text-sm">Lihat Semua</button>
      </div>
      <div className="flex flex-col space-y-5 overflow-y-auto h-full mt-6">
        <div className="flex flex-row items-center space-x-4">
          <div className="h-4 w-4 rounded-full bg-[#9350FF]"></div>
          <div className="flex flex-col justify-center">
            <p className="text-lg font-bold">Terdeteksi tidak menggunakan Vest</p>
            <p className="text-sm italic font-semibold">12.45 | Lapangan 1</p>
          </div>
        </div>
        <div className="flex flex-row items-center space-x-4">
          <div className="h-4 w-4 rounded-full bg-[#9350FF]"></div>
          <div className="flex flex-col justify-center">
            <p className="text-lg font-bold">Terdeteksi tidak menggunakan Vest</p>
            <p className="text-sm italic font-semibold">12.45 | Lapangan 1</p>
          </div>
        </div>
        <div className="flex flex-row items-center space-x-4">
          <div className="h-4 w-4 rounded-full bg-[#9350FF]"></div>
          <div className="flex flex-col justify-center">
            <p className="text-lg font-bold">Terdeteksi tidak menggunakan Vest</p>
            <p className="text-sm italic font-semibold">12.45 | Lapangan 1</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
