/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const ChartComponent = ({ attendedTests }) => {
  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (Array.isArray(attendedTests) && attendedTests.length > 0) {
      // Only process if attendedTests is a valid array
      const labels = attendedTests.map((test) => test.attendedDate || 'N/A'); // Use attendedDate or fallback to 'N/A'
      const data = attendedTests.map(
        (test) =>
          test.totalQuestions > 0
            ? (test.totalMarks / test.totalQuestions) * 100
            : 0 // Avoid division by 0
      );
      setChartLabels(labels);
      setChartData(data);
      console.log(data);
    }
  }, [attendedTests]);

  const data = {
    labels: chartLabels, // Dynamic labels (attended dates)
    datasets: [
      {
        label: 'Marks Percentage per Test',
        data: chartData, // Dynamic percentage data
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 2,
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw.toFixed(
              2
            )}%`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return `${value}%`; // Add % symbol to y-axis values
          },
        },
      },
    },
  };

  return (
    <div
      className='chart-container'
      style={{ maxWidth: '800px', height: '400px' }}
    >
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartComponent;
