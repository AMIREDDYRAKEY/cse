import React, { useState } from "react";
import Notesdetails from "./Notesdetails";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const [open, setopen] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-[#0f0120] min-h-[200px]  lg:mt-[1px] pt-10">
      {/* Heading */}
      <div className="flex flex-col justify-start md:ml-[50px]">
        <h1 className="text-white font-semibold lg:text-5xl text-[40px] md:text-[35px] text-center">
          Class Notes
        </h1>
        <div className="h-[2px]  w-[80%] ml-[40px] lg:ml-[515px] lg:w-[20%] md:w-[60%] mt-5 bg-slate-400"></div>
      </div>

      {/* Buttons */}
      {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-[45px] text-[#251e4d] font-semibold text-[16px] justify-items-center lg:px-10">
        <button
          className="bg-[#A3E635] h-[45px] w-[140px] md:h-[50px] md:w-[150px] rounded-[10px]"
          onClick={() => navigate("/Notes")}
        >
          First Year
        </button>

        <button className="bg-[#A3E635] h-[45px] w-[140px] md:h-[50px] md:w-[150px] rounded-[10px]">
          Second Year
        </button>

        <button className="bg-[#A3E635] h-[45px] w-[140px] md:h-[50px] md:w-[150px] rounded-[10px]">
          Third Year
        </button>

        <button className="bg-[#A3E635] h-[45px] w-[140px] md:h-[50px] md:w-[150px] rounded-[10px]">
          Fourth Year
        </button>
      </div> */}

    </div>
  );
};

export default Notes;
