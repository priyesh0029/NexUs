
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const BarGraphReg: React.FC = () => {
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

  // Prepare data for Highcharts
  const chartData = daysOfWeekData.map((item) => ({
    name: item.day,
    y: item.value,
  }));

  // Highcharts configuration options
  const options: Highcharts.Options = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Days of the Week Bar Chart',
    },
    xAxis: {
      categories: daysOfWeekData.map((item) => item.day),
    },
   series: [
  {
    type: 'bar', // Specify the chart type as 'bar'
    name: 'Values',
    data: chartData,
  },
],

  };

  return (
    <div className="App">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default BarGraphReg;
