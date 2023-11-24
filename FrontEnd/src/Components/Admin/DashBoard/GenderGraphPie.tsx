// Install Highcharts
// npm install highcharts


import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getGenders } from '../../../api/apiConnections/Admin/adminDashBoardConnections';

interface Igenders {
  _id: string;
  count: number;
}

const GenderGraphPie: React.FC = () => {

  const [genders, setgenders] = useState<Igenders[]>([])

  useEffect(() => {
    getHandleGenders();
  }, []);

  const getHandleGenders = async () => {
    const response = await getGenders();
    console.log("response of genders : ", response);
     setgenders(response);
  };
  // Data for the days of the week
  const daysOfWeekData = genders;

  const chartData = daysOfWeekData.map((item) => ({
    name: item._id,
    y: item.count,
  }));

  const chartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'User Demographics - Gender',
    },
    plotOptions: {
      pie: {
        innerSize: '30%', // Adjust the inner size to control the donut hole
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      {
        type: 'pie',
        name: 'Values',
        data: chartData,
      },
    ],
  };

  return (
    <div className="App">
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default GenderGraphPie;
