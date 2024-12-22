import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { db } from "../../../config/firebase";
import { useAuth } from "../../../contexts/AuthContext";
import DetectionCount from "./components/DetectionCount";
import NotificationCard from "./components/NotificationCard";

const atribut = {
  "No-Helmet": "Helmet",
  "No-Vest": "Vest",
  "No-Shoes": "Shoes",
  "No-Gloves": "Gloves",
};

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
  console.log(filteredDetections);
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
                <p className="font-bold text-3xl drop-shadow-2xl">
                  SafElarm - Institut Teknologi Kalimantan
                </p>
                <p>
                  Welcome, <span className="font-bold">Dimas Pramudya</span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <DetectionCount detections={filteredDetections} />
            {/* <AttributeControl attributes={attributes} /> */}
          </div>
        </div>
        <NotificationCard detections={filteredDetections} />
      </div>
    </div>
  );
};

export default Home;
