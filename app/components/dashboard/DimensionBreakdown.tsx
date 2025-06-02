import { FC } from 'react';
import { Tab } from '@headlessui/react';
import { BreakdownType } from '@/types/dashboard';
import Card from '../shared/Card';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DIMENSIONS = [
  'Fee Categories',
  'Payment Methods',
  'Card Networks',
  'Regions',
  'Processors',
  'Business Units',
];

interface DimensionBreakdownProps {
  breakdown: BreakdownType;
  onDimensionChange: (dimension: string) => void;
}

const DimensionBreakdown: FC<DimensionBreakdownProps> = ({
  breakdown,
  onDimensionChange,
}) => {
  const totalAmount = breakdown.items.reduce((sum, item) => sum + item.amount, 0);
  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalAmount);

  const chartData = {
    labels: breakdown.items.map((item) => item.label),
    datasets: [
      {
        data: breakdown.items.map((item) => item.amount),
        backgroundColor: [
          '#2D68FF',
          '#FF4D4D',
          '#28A745',
          '#FFC107',
          '#6C757D',
          '#17A2B8',
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-section-title font-semibold">
            Breakdown on various dimensions
          </h3>
        </div>

        <Tab.Group
          onChange={(index) => onDimensionChange(DIMENSIONS[index].toLowerCase())}
        >
          <Tab.List className="flex space-x-2 rounded-lg bg-gray-100 p-1">
            {DIMENSIONS.map((dimension) => (
              <Tab
                key={dimension}
                className={({ selected }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    selected
                      ? 'bg-white text-brand-blue shadow'
                      : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'
                  }`
                }
              >
                {dimension}
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Chart */}
          <div className="relative">
            <div className="aspect-square">
              <Doughnut data={chartData} options={chartOptions} />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-sm text-text-muted">
                Total transaction costs
              </div>
              <div className="text-xs text-text-muted italic">
                (Excluding Processor operational costs)
              </div>
              <div className="mt-1 text-2xl font-semibold text-text-primary">
                {formattedTotal}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-3">
            {breakdown.items.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg p-2 hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: chartData.datasets[0].backgroundColor[index],
                    }}
                  />
                  <span className="font-medium">{item.label}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(item.amount)}
                  </span>
                  <span
                    className={`flex items-center text-sm ${
                      item.trend_pct > 0 ? 'text-brand-red' : 'text-brand-green'
                    }`}
                  >
                    {item.trend_pct > 0 ? (
                      <ArrowUpIcon className="mr-1 h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="mr-1 h-4 w-4" />
                    )}
                    {Math.abs(item.trend_pct)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DimensionBreakdown; 