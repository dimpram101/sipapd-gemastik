import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";

const BarChart = ({ chartData }) => {
  return (
    <div className="chart-container">
      {/* <h2 style={{ textAlign: "center" }}>Bar Chart</h2> */}
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Number of violations",
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};

BarChart.propTypes = {
  chartData: PropTypes.object.isRequired,
};

export default BarChart;