import { RiErrorWarningLine } from "react-icons/ri";

const DetectionCount = () => {
  return (
    <div className="h-[450px] w-8/12 rounded-3xl bg-second p-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2 items-center">
          <div className="w-10 h-10 rounded-full bg-[#D6CBFF] flex items-center justify-center">
            <RiErrorWarningLine className="text-4xl text-[#9350FF]" />
          </div>
          <h1 className="text-xl font-bold text-black">Number of Violations</h1>
        </div>
        <select defaultValue={"week"} className="bg-transparent w-28 border-transparent focus:border-transparent focus:outline-none focus:ring-0 rounded">
          <option value="day">This day</option>
          <option value="week">
            This week
          </option>
          <option value="day">This month</option>
        </select>
      </div>

      <div className=""></div>
    </div>
  );
};

export default DetectionCount;
