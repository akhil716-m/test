'use client';

import { FC } from 'react';
import { ArrowUpIcon, ArrowDownIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import Card from '../shared/Card';

interface KPICardProps {
  label: string;
  value: string;
  trendPercentage: number;
  tooltipText?: string;
}

const KPICard: FC<KPICardProps> = ({
  label,
  value,
  trendPercentage,
  tooltipText,
}) => {
  const isPositive = trendPercentage > 0;

  return (
    <Card>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-600">{label}</span>
            {tooltipText && (
              <div className="group relative">
                <InformationCircleIcon className="h-4 w-4 text-gray-400" />
                <div className="absolute bottom-full left-1/2 mb-2 hidden w-48 -translate-x-1/2 rounded-lg bg-gray-900 p-2 text-xs text-white group-hover:block">
                  {tooltipText}
                  <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-gray-900"></div>
                </div>
              </div>
            )}
          </div>
          <span className="text-xs text-gray-500">Last Month</span>
        </div>

        <div className="flex items-end justify-between">
          <div className="text-2xl font-semibold text-gray-900">{value}</div>
          <div
            className={`flex items-center text-sm font-medium ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {isPositive ? (
              <ArrowUpIcon className="mr-1 h-4 w-4" />
            ) : (
              <ArrowDownIcon className="mr-1 h-4 w-4" />
            )}
            {Math.abs(trendPercentage)}%
          </div>
        </div>
      </div>
    </Card>
  );
};

export default KPICard; 