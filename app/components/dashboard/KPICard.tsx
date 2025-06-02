import { FC } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import Card from '../shared/Card';

interface KPICardProps {
  label: string;
  value: string | number;
  trendPercentage: number;
  tooltipText: string;
}

const KPICard: FC<KPICardProps> = ({
  label,
  value,
  trendPercentage,
  tooltipText,
}) => {
  const isPositive = trendPercentage > 0;

  return (
    <Card className="flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-label font-medium text-text-secondary">
            {label}
          </span>
          <div className="group relative">
            <InformationCircleIcon className="h-4 w-4 text-text-muted" />
            <div className="absolute left-1/2 top-full z-10 mt-2 hidden -translate-x-1/2 rounded-lg bg-gray-900 px-3 py-2 text-xs text-white group-hover:block">
              {tooltipText}
              <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-gray-900" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-baseline">
        <span className="text-kpi-value font-semibold text-text-primary">
          {value}
        </span>
        <span
          className={`ml-2 inline-flex items-center text-sm font-medium ${
            isPositive ? 'text-brand-green' : 'text-brand-red'
          }`}
        >
          {isPositive ? (
            <ArrowUpIcon className="mr-1 h-3 w-3" />
          ) : (
            <ArrowDownIcon className="mr-1 h-3 w-3" />
          )}
          {Math.abs(trendPercentage)}%
        </span>
      </div>

      <span className="mt-1 text-subtext text-text-muted">Last Month</span>
    </Card>
  );
};

export default KPICard; 