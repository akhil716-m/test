import { FC } from 'react';
import { SettlementType } from '@/types/dashboard';
import Card from '../shared/Card';
import { Tooltip } from 'react-tooltip';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, ChartTooltip, Legend);

interface SettlementBarProps {
  settlement: SettlementType;
}

const SettlementBar: FC<SettlementBarProps> = ({ settlement }) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const deductionsPercent = (settlement.total_deductions / settlement.total_revenue) * 100;
  const additionsPercent = (settlement.total_additions / settlement.total_revenue) * 100;
  const netSettledPercent = (settlement.net_settled / settlement.total_revenue) * 100;

  const chartData = {
    labels: ['Net Settlement', 'Deductions', 'Additions'],
    datasets: [
      {
        data: [netSettledPercent, deductionsPercent, additionsPercent],
        backgroundColor: ['#4F46E5', '#EF4444', '#22C55E'],
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
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            return `${value.toFixed(1)}% of Total Revenue`;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Card>
      <div className="space-y-8">
        <div className="border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="text-3xl font-semibold text-text-primary">
              {formatter.format(settlement.net_settled)}
            </div>
            <div 
              data-tooltip-id="net-settled-tooltip"
              className="cursor-help"
            >
              <InformationCircleIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <Tooltip
            id="net-settled-tooltip"
            className="max-w-xs"
            place="right"
          >
            <p>Final amount settled after all deductions and additions are applied to your total revenue</p>
          </Tooltip>
          <div className="mt-1 text-sm text-text-muted">
            Net Settlement Amount
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Donut Chart */}
          <div className="relative h-[300px]">
            <Doughnut data={chartData} options={chartOptions} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-sm text-gray-500">Total Revenue</div>
              <div className="text-xl font-semibold text-gray-900">
                {formatter.format(settlement.total_revenue)}
              </div>
            </div>
          </div>

          {/* Settlement Details */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Net Settlement */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-indigo-600" />
                  <span className="font-medium">Net Settlement</span>
                </div>
                <span className="font-semibold">{formatter.format(settlement.net_settled)}</span>
              </div>
              <div className="text-sm text-gray-500">
                {netSettledPercent.toFixed(1)}% of total revenue
              </div>
            </div>

            {/* Deductions */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <span className="font-medium">Total Deductions</span>
                </div>
                <span className="font-semibold text-red-600">
                  -{formatter.format(settlement.total_deductions)}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {deductionsPercent.toFixed(1)}% of total revenue
              </div>
            </div>

            {/* Additions */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="font-medium">Total Additions</span>
                </div>
                <span className="font-semibold text-green-600">
                  +{formatter.format(settlement.total_additions)}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {additionsPercent.toFixed(1)}% of total revenue
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Total Revenue */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Total Revenue</span>
                <span className="font-semibold">
                  {formatter.format(settlement.total_revenue)}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                Gross amount before adjustments
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SettlementBar; 