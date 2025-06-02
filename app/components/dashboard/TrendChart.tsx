import { FC } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { TrendDataPoint } from '@/types/dashboard';
import Card from '../shared/Card';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TrendChartProps {
  data: TrendDataPoint[];
}

const TrendChart: FC<TrendChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((point) => point.period),
    datasets: [
      {
        label: 'Cost of Processing as % of GMV',
        data: data.map((point) => point.cost_pct),
        borderColor: '#2D68FF',
        backgroundColor: '#2D68FF20',
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.parsed.y}%`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => `${value}%`,
          stepSize: 0.5,
          font: {
            size: 12,
          },
        },
        grid: {
          color: '#E5E7EB',
        },
      },
    },
  };

  return (
    <Card>
      <div className="flex flex-col space-y-4">
        <h3 className="text-section-title font-semibold">
          Cost of processing as % of GMV Trend
        </h3>
        <div className="h-[300px]">
          <Line data={chartData} options={options} />
        </div>
      </div>
    </Card>
  );
};

export default TrendChart; 