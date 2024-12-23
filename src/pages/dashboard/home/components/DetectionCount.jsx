import { Chart } from "chart.js/auto";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import BarChart from "./BarChart";

Chart.register();

const atribut = {
  "No-Helmet": "Helmet",
  "No-Vest": "Vest",
  "No-Shoes": "Shoes",
  "No-Gloves": "Gloves",
};

const DetectionCount = ({ detections }) => {
  const countEveryAttribute = useCallback((detections) => {
    const attribute = detections.reduce((acc, detection) => {
      detection.attribute.forEach((attr) => {
        if (acc[attr]) {
          acc[attr] += 1;
        } else {
          acc[attr] = 1;
        }
      });
      return acc;
    }, {});
    return attribute;
  }, []);

  const chartData = {
    labels: Object.keys(atribut),
    datasets: [
      {
        label: "Attribute Detected",
        data: countEveryAttribute(detections),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="min-h-[450px] w-full rounded-3xl bg-second p-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2 items-center">
          <div className="w-10 h-10 rounded-full bg-[#D6CBFF] flex items-center justify-center">
            <RiErrorWarningLine className="text-4xl text-[#9350FF]" />
          </div>
          <h1 className="text-xl font-bold text-black">Number of Violations</h1>
        </div>
      </div>

      <div className="h-full">
        <BarChart chartData={chartData} />
      </div>
    </div>
  );
};

DetectionCount.propTypes = {
  detections: PropTypes.array.isRequired,
};

export default DetectionCount;
