import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyData } from '../../api';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData();

      setDailyData(initialDailyData);
    };

    fetchMyAPI();
  }, []);

  const barChart = (
    confirmed ? (
      <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
              data: [confirmed.value, recovered.value, deaths.value],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in ${country}` },
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                    fontColor:'white'
                }
            }],
            xAxes: [{
                ticks: {
                    fontColor:'white'
                }
            }]
        }
        }}
      />
    ) : null
  );

  const lineChart = (
    dailyData[0] ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()).reverse(),
          datasets: [{
            data: dailyData.map((data) => data.confirmed).reverse(),
            label: 'Infected',
            borderColor: '#0A8BA2',
            pointBorderColor:'#0A8BA2',
            pointRadius: 1,
            fill: true,
            }, {
            data: dailyData.map((data) => data.deaths).reverse(),
            label: 'Deaths',
            borderColor: '#DD3722',
            pointBorderColor:'#DD3722',
            pointRadius: 1,
            fill: true,
          },  {
            data: dailyData.map((data) => data.recovered).reverse(),
            label: 'Recovered',
            borderColor: '#0AA23F',
            pointBorderColor:'#0AA23F',
            pointRadius: 1,
            fill: true,
          },
          ],
        }}
        options={ {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        fontColor:'white'
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor:'white'
                    }
                }]
            }
        }}
      />
    ) : null
  );

  return (
    <div className={styles.container}>
      {country ? barChart : lineChart}
    </div>
  );
};

export default Chart;