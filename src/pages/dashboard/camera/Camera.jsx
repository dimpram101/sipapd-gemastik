import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import FormModal from "../components/FormModal";
import { IoMdAdd } from "react-icons/io";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../config/firebase";
import TableSkeleton from "../components/TableSkeleton";

const Camera = () => {
  const [open, setOpen] = useState(false);
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newCamera, setNewCamera] = useState({
    name: "",
    location: "",
    is_active: false,
  });

  const fetchCamera = async () => {
    const querySnapshot = await getDocs(collection(db, "cameras"));
    setCameras(
      querySnapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }))
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchCamera();
  }, []);

  const onCreateNewCamera = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "cameras"), {
      name: newCamera.name,
      location: newCamera.location,
      is_active: newCamera.is_active,
    });
    setOpen(false);
    setLoading(true);
    fetchCamera();
  };

  const onEditCamera = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "cameras", newCamera.docId), {
      name: newCamera.name,
      location: newCamera.location,
      is_active: newCamera.is_active,
    });
    setOpen(false);
    setLoading(true);
    fetchCamera();
  };

  const onDeleteCamera = async (docId) => {
    await deleteDoc(doc(db, "cameras", docId));
    setLoading(true);
    setSelectedCamera(null);
    fetchCamera();
  };

  if (loading) {
    return (
      <TableSkeleton
        title="List Kamera"
        buttonText="Tambah Kamera"
        headers={["Kamera", "Lokasi", "Status"]}
      />
    );
  }

  return (
    <>
      {/* Add or Edit */}
      <FormModal open={open} onClose={() => setOpen(false)}>
        <h1 className="text-2xl text-center font-semibold text-gray-800">
          Tambah Kamera
        </h1>
        <form
          className="w-[600px] px-6 py-4 flex flex-col space-y-3"
          onSubmit={isEditing ? onEditCamera : onCreateNewCamera}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm text-gray-600">
              Nama Kamera
            </label>
            <input
              type="text"
              id="name"
              className="border border-gray-300 p-2 rounded-md"
              value={newCamera.name}
              onChange={(e) =>
                setNewCamera({ ...newCamera, name: e.target.value })
              }
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
              value={newCamera.location}
              onChange={(e) =>
                setNewCamera({ ...newCamera, location: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="status" className="text-sm text-gray-600">
              Status
            </label>
            <select
              id="status"
              className="border border-gray-300 p-2 rounded-md"
              value={newCamera.is_active}
              onChange={(e) =>
                setNewCamera({ ...newCamera, is_active: e.target.value })
              }
            >
              <option value={true}>Aktif</option>
              <option value={false}>Tidak Aktif</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-[#8F00FF] text-white rounded-md"
          >
            {isEditing ? "Edit" : "Tambah"}
          </button>
        </form>
      </FormModal>
      {/* Delete Modal */}
      <FormModal
        open={!!selectedCamera}
        onClose={() => setSelectedCamera(null)}
      >
        <h1 className="text-2xl text-center font-semibold text-gray-800">
          Hapus Kamera
        </h1>
        <p className="text-center text-gray-600">
          Apakah anda yakin ingin menghapus kamera ini?
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <button
            className="px-4 py-2 bg-[#8F00FF] text-white rounded-md"
            onClick={() => setSelectedCamera(null)}
          >
            Batal
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md"
            onClick={() => {
              onDeleteCamera(selectedCamera?.docId);
              setOpen(false);
            }}
          >
            Hapus
          </button>
        </div>
      </FormModal>
      <div className="rounded-xl bg-[#D6CBFF] p-2 max-w-[100rem] mx-auto">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex bg-white px-6 py-3 justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">List Kamera</h1>
            <button
              className="px-4 py-2 bg-[#8F00FF]  text-white rounded-md flex items-center gap-1"
              onClick={() => {
                setOpen(true);
                setIsEditing(false);
                setNewCamera({ name: "", location: "", is_active: false });
              }}
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
              {!loading &&
                cameras.length > 0 &&
                cameras.map((camera) => (
                  <tr
                    className="odd:bg-white  even:bg-gray-100  border-b "
                    key={camera.docId}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {camera.name}
                    </th>
                    <td className="px-6 py-4">{camera.location}</td>
                    <td className="px-6 py-4">
                      {camera.is_active ? (
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
                        onClick={() => {
                          setIsEditing(true);
                          setNewCamera(camera);
                          setOpen(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setSelectedCamera(camera)}
                        className="font-medium text-red-600 hover:underline"
                      >
                        Hapus
                      </button>
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
