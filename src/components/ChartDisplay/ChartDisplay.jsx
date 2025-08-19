import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { useSelector } from 'react-redux';

ChartJS.register(...registerables);

const ChartDisplay = () => {
  const { chartData, chartType } = useSelector((state) => state.charts);
  console.log("chartData", chartData)

  // Add this safety check
  if (!chartData || !chartData.labels || chartData.labels.length === 0) {
    return (
      <div className="alert alert-info alert-container my-5">
        <p>No chart data available. Please submit the form to generate a chart.</p>
      </div>
    );
  }

  return (
    <div className='my-5 chart-display'>
      {chartType === 'bar' ? (
        <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
      ) : (
        <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
      )}
    </div>
  );
};

export default ChartDisplay;