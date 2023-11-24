import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact, { HighchartsReactRefObject } from 'highcharts-react-official';


// Import the necessary Highcharts modules
import accessibility from 'highcharts/modules/accessibility';
import { getPostCount, getUserCount } from '../../../api/apiConnections/Admin/adminDashBoardConnections';
accessibility(Highcharts);

const YearlyGraph = () => {

  const [users, setusers] = useState([])
  const [posts, setposts] = useState([])

  useEffect(() => {
    getHandleUserCount();
    getHandlePostCount();
  }, []);

  const getHandleUserCount = async () => {
    const response = await getUserCount();
    console.log("response of gendegetUserCountrs : ", response);
    setusers(response);
  };

  const getHandlePostCount = async () => {
    const response = await getPostCount();
    console.log("response of genders : ", response);
    setposts(response);
  };


    const chartRef = useRef<HighchartsReactRefObject | null>(null);


  // Define a default color array
  const defaultColors = Highcharts.getOptions().colors || [
    '#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9',
    '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'
  ];

  const chartOptions = {
    chart: {
      type: 'line', // Specify the chart type as 'line'
    },
    title: {
      text: 'Yearly graph showing users and post',
      align: 'left',
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yAxis: [
      {
        title: {
          text: 'Users (per year)',
        },
      },
      {
        title: {
          text: 'Posts (per year)',
        },
        opposite: true, // Display this yAxis on the opposite side of the chart
      },
    ],
    tooltip: {
      shared: true,
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
    },
    // ... (other options)

    series: [
      {
        name: 'Users',
        data: users,
        tooltip: {
          valueSuffix: 'users',
        },
        color: defaultColors[1],
        yAxis: 0, // Assign this series to the first yAxis
      },
      {
        name: 'Posts',
        data: posts,
        tooltip: {
          valueSuffix: 'posts',
        },
        color: defaultColors[0],
        yAxis: 1, // Assign this series to the second (opposite) yAxis
      },
    ],
  };

  useEffect(() => {
    if (chartRef.current) {
      // Access the Highcharts chart instance and update its dimensions
      chartRef.current.chart.reflow();
    }
  }, []);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} ref={chartRef} />
    </div>
  );
};

export default YearlyGraph;


