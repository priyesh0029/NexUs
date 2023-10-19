import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact, { HighchartsReactRefObject } from 'highcharts-react-official';
import accessibility from 'highcharts/modules/accessibility';
import { getUserAgeGraph } from '../../../api/apiConnections/Admin/adminDashBoardConnections';
accessibility(Highcharts);

interface IageData{
  _id: number
  count: number
}

const AgeGraph = () => {

  useEffect(() => {
    handleGetAgeGraph();
  }, []);

  const [ageData, setageData] = useState<(string | number)[][]>([])

  const handleGetAgeGraph = async () => {
    const response : IageData[] = await getUserAgeGraph();
    console.log("response of getUserAgeGraph : ", response);
    const outputArray = response.map(item  => [String(item._id), item.count])
    setageData(outputArray)
  };

  const chartRef = useRef<HighchartsReactRefObject | null>(null);

  const chartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'User Demographics - Age',
    },
    series: [
      {
        data: ageData,
      },
    ],
  };

  useEffect(() => {
    if (chartRef.current && chartRef.current.chart) {
      chartRef.current.chart.reflow();
    }
  }, []);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} ref={chartRef} />
    </div>
  );
};

export default AgeGraph;


