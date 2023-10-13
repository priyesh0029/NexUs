import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact, { HighchartsReactRefObject } from 'highcharts-react-official';
import accessibility from 'highcharts/modules/accessibility';
accessibility(Highcharts);

const PostGraph = () => {
  const chartRef = useRef<HighchartsReactRefObject | null>(null);

  const chartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Mobile vendor market share, 2021',
    },
    xAxis: {
      categories: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
      ],
    },
    series: [
      {
        data: [
          ['Samsung', 27.79],
          ['Apple', 27.34],
          ['Xiaomi', 10.87],
          ['Huawei', 8.48],
          ['Oppo', 5.38],
          ['Vivo', 4.17],
          ['Realme', 2.57],
          ['Unknown', 2.45],
          ['Motorola', 2.22],
          ['LG', 1.53],
          ['Other', 7.2],
        ],
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

export default PostGraph;


