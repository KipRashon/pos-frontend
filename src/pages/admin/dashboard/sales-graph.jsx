import React, {useEffect, useState} from 'react';
import ApexCharts from 'apexcharts';
import {getMapDisplayDate} from '../../../services/utility';

export default function SalesGraph(props) {
  const {barSales, restaurantSales, period} = props;
  const [chart, setChart] = useState(null);

  const prepData = () => {
    let labels = [],
      bar = [],
      restaurant = [];
    for (let i = 0; i < barSales.length; i++) {
      labels.push(getMapDisplayDate(barSales[i].date, period));
      bar.push(barSales[i].count || 0);
      restaurant.push(restaurantSales[i].count || 0);
    }

    return {
      labels,
      bar,
      restaurant,
    };
  };

  useEffect(() => {
    const chartData = prepData();

    if (chart) {
      let newOptions = chart.options;
      newOptions['series'] = [
        {
          name: 'Bar',
          data: chartData.bar,
          //radius: 12,
        },
        {
          name: 'Restaurant',
          data: chartData.restaurant,
        },
      ];
      newOptions['xaxis'] = {
        categories: chartData.labels,
      };
      chart.updateOptions(newOptions, false, true);
    } else {
      var options = {
        series: [
          {
            name: 'Bar',
            data: chartData.bar,
            //radius: 12,
          },
          {
            name: 'Restaurant',
            data: chartData.restaurant,
          },
        ],
        chart: {
          type: 'area',
          height: 350,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded',
          },
        },
        colors: ['#2f4cdd', '#b519ec'],
        dataLabels: {
          enabled: false,
        },
        markers: {
          shape: 'circle',
        },

        legend: {
          show: true,
          fontSize: '12px',

          labels: {
            colors: '#000000',
          },
          position: 'top',
          horizontalAlign: 'left',
          markers: {
            width: 19,
            height: 19,
            strokeWidth: 0,
            strokeColor: '#fff',
            fillColors: undefined,
            radius: 4,
            offsetX: -5,
            offsetY: -5,
          },
        },
        stroke: {
          show: true,
          width: 4,
          colors: ['#2f4cdd', '#b519ec'],
        },

        grid: {
          borderColor: '#eee',
        },
        xaxis: {
          categories: chartData.labels,
          labels: {
            style: {
              colors: '#3e4954',
              fontSize: '13px',
              fontFamily: 'Poppins',
              fontWeight: 100,
              cssClass: 'apexcharts-xaxis-label',
            },
          },
          crosshairs: {
            show: false,
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: '#3e4954',
              fontSize: '13px',
              fontFamily: 'Poppins',
              fontWeight: 100,
              cssClass: 'apexcharts-xaxis-label',
            },
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + ' sales';
            },
          },
        },
      };

      let barChart = new ApexCharts(
        document.querySelector('#chartBar'),
        options
      );
      setChart(barChart);
      barChart.render();
    }
  }, [barSales, restaurantSales]);
  return (
    <div className='card'>
      <div className='card-header border-0 pb-0 d-sm-flex d-block'>
        <div>
          <h4 className='card-title mb-1'>Sales</h4>
        </div>
      </div>
      <div className='card-body revenue-chart px-3'>
        <div id='chartBar'></div>
      </div>
    </div>
  );
}
