import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { db } from "../../../config/firebase";
// import { useAuth } from "../../../contexts/AuthContext";
import DetectionCount from "./components/DetectionCount";
import NotificationCard from "./components/NotificationCard";

const atribut = {
  "No-Helmet": "Helmet",
  "No-Vest": "Vest",
  "No-Shoes": "Shoes",
  "No-Gloves": "Gloves",
};

const Home = () => {
  // const { username } = useAuth();
  // const [attributes, setAttributes] = useState([]);
  const [detections, setDetections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDetections = async () => {
    const exeQuery = query(
      collection(db, "detections"),
      orderBy("time", "desc"),
      limit(25)
    );
    const querySnapshot = await getDocs(exeQuery);
    setDetections(
      querySnapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }))
    );
    setIsLoading(false);
  };

  console.log(detections)

  // const fetchAttributes = async () => {
  //   const querySnapshot = await getDocs(collection(db, "attributes"));
  //   setAttributes(
  //     querySnapshot.docs.map((doc) => ({
  //       docId: doc.id,
  //       ...doc.data(),
  //     }))
  //   );
  // };

  useEffect(() => {
    // fetchAttributes();
    fetchDetections();
  }, []);

  const filteredDetections = useMemo(
    () =>
      detections.length > 0
        ? detections.map((detection) => ({
            attribute: detection.attribute.filter((attr) => attr in atribut),
            docId: detection.docId,
            image_url: detection.image_url,
            time: new Date(detection.time.seconds * 1000).toISOString().split('T')[0],
          }))
        : [],
    [detections]
  );

  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <div role="status">
        <svg
          aria-hidden="true"
          className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : (
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
