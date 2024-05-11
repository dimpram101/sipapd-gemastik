import { MdAttribution } from "react-icons/md";
import { GiGloves } from "react-icons/gi";
import { FaVest } from "react-icons/fa";
import { GiRubberBoot } from "react-icons/gi";
import { FaHelmetSafety } from "react-icons/fa6";
import PropTypes from "prop-types";
import Loading from "react-loading";

function AttributeControl({ attributes }) {
  const atrIcon = {
    gloves: <GiGloves className="text-4xl text-black" />,
    vest: <FaVest className="text-4xl text-black" />,
    shoes: <GiRubberBoot className="text-4xl text-black" />,
    helmet: <FaHelmetSafety className="text-4xl text-black" />,
  };

  return (
    <div className="flex-1 h-[450px] rounded-3xl bg-second p-4 flex flex-col">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2 items-center">
          <div className="w-10 h-10 rounded-full bg-[#D6CBFF] flex items-center justify-center">
            <MdAttribution className="text-4xl text-[#9350FF]" />
          </div>
          <h1 className="text-xl font-bold text-black">Attributes</h1>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-around">
        {attributes.length > 0 ? (
          attributes.map((attribute, index) => (
            <div key={index} className="flex space-x-4">
              <div className="w-16 h-16 rounded-3xl bg-[#D6CBFF] flex justify-center items-center">
                {atrIcon[attribute.name.toLowerCase()]}
              </div>
              <div className="flex flex-col justify-center">
                <p className="font-semibold">{attribute.name}</p>
                <p
                  className={`text-${
                    attribute.is_active ? "green" : "red"
                  }-500 font-semibold`}
                >
                  {attribute.is_active ? "Active" : "Inactive"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="self-center">
            <Loading type="spin" color="#8F00FF" />
          </div>
        )}
        {/* <div className="flex space-x-4">
          <div className="w-16 h-16 rounded-3xl bg-[#D6CBFF] flex justify-center items-center">
            <GiGloves className="text-4xl text-black" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="font-semibold">Gloves</p>
            <p className="text-red-500 font-semibold">Inactive</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="w-16 h-16 rounded-3xl bg-[#D6CBFF] flex justify-center items-center">
            <FaVest className="text-4xl text-black" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="font-semibold">Vest</p>
            <p className="text-green-500 font-semibold">Active</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="w-16 h-16 rounded-3xl bg-[#D6CBFF] flex justify-center items-center">
            <GiRubberBoot className="text-4xl text-black" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="font-semibold">Boots</p>
            <p className="text-red-500 font-semibold">Inactive</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="w-16 h-16 rounded-3xl bg-[#D6CBFF] flex justify-center items-center">
            <FaHelmetSafety className="text-4xl text-black" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="font-semibold">Helmet</p>
            <p className="text-green-500 font-semibold">Inactive</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}

AttributeControl.propTypes = {
  attributes: PropTypes.array.isRequired,
};

export default AttributeControl;
