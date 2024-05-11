import { useEffect, useState } from "react";
import AttributeControl from "./components/AttributeControl";
import DetectionCount from "./components/DetectionCount";
import NotificationCard from "./components/NotificationCard";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useAuth } from "../../../contexts/AuthContext";

const Home = () => {
  const { username } = useAuth();
  const [attributes, setAttributes] = useState([]);
  const [detections, setDetections] = useState([]);

  const fetchDetections = async () => {
    const exeQuery = query(
      collection(db, "detections"),
      orderBy("time", "desc")
    );
    const querySnapshot = await getDocs(exeQuery);
    setDetections(
      querySnapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }))
    );
  };

  const fetchAttributes = async () => {
    const querySnapshot = await getDocs(collection(db, "attributes"));
    setAttributes(
      querySnapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }))
    );
  };

  useEffect(() => {
    fetchAttributes();
    fetchDetections();
  }, []);

  return (
    <div className="max-w-[100rem] mx-auto flex flex-col h-[800px]">
      <div className="flex-1 flex flex-row gap-2 h-full">
        <div className="flex flex-col gap-2 w-8/12 h-full">
          <div className="flex-1 w-full rounded-3xl bg-second h-full relative">
            <img
              src="../dbimage.png"
              alt=""
              className="absolute w-full h-full object-cover rounded-3xl"
            />
            <div className="absolute top-0 left-0 p-7 text-white h-full">
              <div className="flex flex-col justify-end h-full drop-shadow-xl">
                <p className="font-bold text-3xl">
                  Kelompok A - Teknologi IOT - ITK
                </p>
                <p>
                  Welcome, <span className="font-bold">{username}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <DetectionCount detections={detections} />
            <AttributeControl attributes={attributes} />
          </div>
        </div>
        <NotificationCard detections={detections} />
      </div>
    </div>
  );
};

export default Home;
