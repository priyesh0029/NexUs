// Install Highcharts
// npm install highcharts


import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const GenderGraphPie: React.FC = () => {
  // Data for the days of the week
  const daysOfWeekData = [
    { day: 'Monday', value: 4 },
    { day: 'Tuesday', value: 6 },
    { day: 'Wednesday', value: 3 },
    { day: 'Thursday', value: 7 },
    { day: 'Friday', value: 5 },
    { day: 'Saturday', value: 8 },
    { day: 'Sunday', value: 9 },
  ];

  const chartData = daysOfWeekData.map((item) => ({
    name: item.day,
    y: item.value,
  }));

  const chartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Donut Chart of Days of the Week',
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
