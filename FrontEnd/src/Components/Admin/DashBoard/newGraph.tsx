import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact, { HighchartsReactRefObject } from 'highcharts-react-official';


// Import the necessary Highcharts modules
import accessibility from 'highcharts/modules/accessibility';
accessibility(Highcharts);

const KarasjokWeatherChart = () => {
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
      text: 'Karasjok weather, 2021',
      align: 'left',
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yAxis: [
      {
        title: {
          text: 'Precipitation (mm)',
        },
      },
      {
        title: {
          text: 'Temperature (°C)',
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
        name: 'Precipitation',
        data: [27.6, 28.8, 21.7, 34.1, 29.0, 28.4, 45.6, 51.7, 39.0, 60.0, 28.6, 32.1],
        tooltip: {
          valueSuffix: ' mm',
        },
        color: defaultColors[1],
        yAxis: 0, // Assign this series to the first yAxis
      },
      {
        name: 'Temperature',
        data: [-13.6, -14.9, -5.8, -0.7, 3.1, 13.0, 14.5, 10.8, 5.8, -0.7, -11.0, -16.4],
        tooltip: {
          valueSuffix: '°C',
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

export default KarasjokWeatherChart;
