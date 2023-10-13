import React from "react";
import BarGraphReg from "./BarGraphReg";
import GenderGraphPie from "./GenderGraphPie";
import PostGraph from "./PostGraph";
import KarasjokWeatherChart from "./newGraph";

const DashBoardComponent = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap justify-center gap-4">
        <div className="flex items-center justify-center rounded-xl min-w-[14em] h-48 bg-blue-500 hover:bg-blue-800 p-4">
          <div className="flex flex-col items-center">
            <p className="text-white text-xl font-semibold">Users</p>
            <p className="text-white text-xl font-semibold">10</p>
          </div>
        </div>
        <div className="flex items-center justify-center rounded-xl min-w-[14em] h-48  bg-blue-500 hover:bg-blue-800 p-4">
          <div className="flex flex-col items-center">
            <p className="text-white text-xl font-semibold">Post Reports</p>
            <p className="text-white text-xl font-semibold">10</p>
          </div>
        </div>
        <div className="flex items-center justify-center rounded-xl min-w-[14em] h-48  bg-blue-500 hover:bg-blue-800 p-4">
          <div className="flex flex-col items-center">
            <p className="text-white text-xl font-semibold">Comment Reports</p>
            <p className="text-white text-xl font-semibold">10</p>
          </div>
        </div>
        <div className="flex items-center justify-center rounded-xl min-w-[14em] h-48  bg-blue-500 hover:bg-blue-800 p-4">
          <div className="flex flex-col items-center">
            <p className="text-white text-xl font-semibold">User Reports</p>
            <p className="text-white text-xl font-semibold">10</p>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <BarGraphReg/>
      </div>
      <div>
        <GenderGraphPie/>
      </div>
      <div>
        <PostGraph/>
      </div>
      <div>
        <KarasjokWeatherChart/>
      </div>
    </div>
  );
};

export default DashBoardComponent;
