import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement } from 'chart.js';

// Register necessary components
ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement);

const ChartComponent = ({ userTestDetails }) => {
  // Create arrays to hold usernames (labels) and their average marks (data points)
  const labels = [];
  const dataPoints = [];

  // Check if userTestDetails is defined and is an array
  if (Array.isArray(userTestDetails)) {
    userTestDetails.forEach((user) => {
      // Check if the user has totalMarks and totalTests properties
      if (user.totalMarks !== undefined && user.totalTests !== undefined && user.totalTests > 0) {
        labels.push(user.username); // Add username as label
        dataPoints.push(user.totalMarks / user.totalTests); // Calculate average marks per user
      }
    });
  }

  const data = {
    labels, // Usernames as labels
    datasets: [
      {
        label: 'Average Test Scores per User',
        data: dataPoints, // Average marks per user
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
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw.toFixed(2)}`; // Show average with 2 decimal places
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Average Score',
        },
      },
      x: {
        title: {
          display: true,
          text: 'User',
        },
      },
    },
  };

  return (
    <div style={{ width: '1000px', height: '500px' }}> {/* Adjust size here */}
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartComponent;
