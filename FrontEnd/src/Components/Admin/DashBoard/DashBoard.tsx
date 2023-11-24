import React, { useEffect, useState } from "react";
import BarGraphReg from "./BarGraphReg";
import GenderGraphPie from "./GenderGraphPie";
import { dashBoardDetails } from "../../../api/apiConnections/Admin/adminDashBoardConnections";
import AgeGraph from "./AgeGraph";
import YearlyGraph from "./YearlyGraph";

interface IdashBoardInfo {
  totalUsers: number;
  totalReportedPosts: number;
  totalReportedComments: number;
  totalReportedReplies: number;
  totalReportedUsers: number;
}

interface IDashBoardComponent{
  selectedTab : string
}

const DashBoardComponent:React.FC<IDashBoardComponent> = ({selectedTab}) => {
  const [dashBoardInfo, setdashBoardInfo] = useState<IdashBoardInfo[]>([]);

  useEffect(() => {
    handleDashboard();
  }, [selectedTab]);
  const handleDashboard = async () => {
    const response = await dashBoardDetails();
    setdashBoardInfo(response);
    
  };

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-wrap justify-center gap-4">
        {dashBoardInfo.map((params,index) =>  (
            <div className="flex items-center justify-center rounded-xl min-w-[14em] h-48 bg-blue-500 hover:bg-blue-800 p-4" key={index}>
              <div className="flex flex-col items-center">
                <p className="text-white text-xl font-semibold">{Object.keys(params)}</p>
                <p className="text-white text-xl font-semibold">{Object.values(params)}</p>
              </div>
            </div>
          )
        )}
      </div>
      <div className="mt-24 gap-8 ">
        <BarGraphReg />
      </div>
      <div>
        <GenderGraphPie />
      </div>
      <div>
        <AgeGraph/>
      </div>
      <div className="mb-16">
        <YearlyGraph />
      </div>
    </div>
  );
};

export default DashBoardComponent;
