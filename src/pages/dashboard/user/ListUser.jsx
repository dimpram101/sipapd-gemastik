import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import FormModal from "../components/FormModal";
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../../config/firebase";
import TableSkeleton from "../components/TableSkeleton";
import Loading from "react-loading";

const ListUser = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    jabatan: "",
    password: "",
  });

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    setUsers(
      querySnapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }))
    );
    setLoading(false);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const onCreateNewUser = async (e) => {
    e.preventDefault();
    setPostLoading(true);
    createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          name: newUser.name,
          email: newUser.email,
          jabatan: newUser.jabatan,
        });
        setUsers([...users, newUser]);
        setOpen(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      })
      .finally(() => {
        setPostLoading(false);
      });
  };

  const onEditUser = async (e) => {
    e.preventDefault();
    setPostLoading(true);
    updateDoc(doc(db, "users", newUser.docId), {
      name: newUser.name,
      email: newUser.email,
      jabatan: newUser.jabatan,
    })
      .then(() => {
        setPostLoading(false);
        setOpen(false);
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      })
      .finally(() => {
        setLoading(true);
        fetchUsers();
      });
  };

  if (loading) {
    return <TableSkeleton />;
  }

  return (
    <>
      <FormModal open={open} onClose={() => setOpen(false)}>
        <h1 className="text-2xl text-center font-semibold text-gray-800">
          {isEditing ? "Edit" : "Tambah"} Akun
        </h1>
        <form
          className="w-[600px] px-6 py-4 flex flex-col space-y-3"
          onSubmit={isEditing ? onEditUser : onCreateNewUser}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm text-gray-600">
              Nama
            </label>
            <input
              type="text"
              id="name"
              className="border border-gray-300 p-2 rounded-md"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
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
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
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
              value={newUser.jabatan}
              onChange={(e) =>
                setNewUser({ ...newUser, jabatan: e.target.value })
              }
            />
          </div>
          {!isEditing && (
            <div className="flex flex-col gap-2">
              <label htmlFor="Password" className="text-sm text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="Password"
                className="border border-gray-300 p-2 rounded-md"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
            </div>
          )}
          <button
            disabled={postLoading}
            className="px-4 py-2 bg-[#8F00FF] text-white rounded-md flex items-center justify-center"
          >
            {postLoading ? (
              <Loading type="spin" color="white" height={20} width={20}/>
            ) : isEditing ? (
              "Edit"
            ) : (
              "Tambah"
            )}
          </button>
        </form>
      </FormModal>
      <div className="rounded-xl bg-[#D6CBFF] p-2 max-w-[100rem] mx-auto">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex bg-white px-6 py-3 justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">List User</h1>
            <button
              className="px-4 py-2 bg-[#8F00FF]  text-white rounded-md flex items-center gap-1"
              onClick={() => {
                setOpen(true);
                setIsEditing(false);
                setNewUser({ name: "", email: "", jabatan: "", password: "" });
              }}
            >
              <IoMdAdd className="text-xl" />
              Tambah User
            </button>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
              <tr>
                <th scope="col" className="px-6 py-3 w-96">
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
              {!loading &&
                users.length > 0 &&
                users.map((user) => (
                  <tr
                    className="odd:bg-white  even:bg-gray-100  border-b "
                    key={user.email}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {user.name}
                    </th>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.jabatan.toUpperCase()}</td>
                    <td className="px-6 py-4 flex space-x-4">
                      <button
                        className="font-medium text-blue-600 hover:underline"
                        onClick={() => {
                          setIsEditing(true);
                          setNewUser(user);
                          setOpen(true);
                        }}
                      >
                        Edit
                      </button>
                      <button className="font-medium text-red-600 hover:underline">
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

export default ListUser;
