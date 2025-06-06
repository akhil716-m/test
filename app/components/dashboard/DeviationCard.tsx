'use client';

import { FC } from 'react';
import { DeviationType } from '@/types/dashboard';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface DeviationCardProps {
  deviation: DeviationType;
  onClick: () => void;
}

const DeviationCard: FC<DeviationCardProps> = ({ deviation, onClick }) => {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(deviation.amount);

  return (
    <button
      onClick={onClick}
      className="w-full rounded-lg bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-semibold text-gray-900">{formattedAmount}</div>
            <div className="mt-1 text-sm font-medium text-gray-900">{deviation.fee_category}</div>
            <div className="text-xs text-gray-500">{deviation.fee_type}</div>
          </div>
          <div className="flex items-center gap-1">
            <span className={`text-sm font-medium ${deviation.deviation_pct > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {deviation.deviation_pct > 0 ? '+' : '-'}{Math.abs(deviation.deviation_pct)}%
            </span>
            <ArrowRightIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    </button>
  );
};

export default DeviationCard; 