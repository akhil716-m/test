import { FC } from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import { DeviationType } from '@/types/dashboard';
import Card from '../shared/Card';

interface DeviationCardProps {
  deviation: DeviationType;
  onClick?: () => void;
}

const DeviationCard: FC<DeviationCardProps> = ({ deviation, onClick }) => {
  const isPositive = deviation.deviation_pct > 0;
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(deviation.amount);

  return (
    <Card
      hoverable
      onClick={onClick}
      className="flex items-center justify-between border-l-4 border-l-brand-red p-4"
    >
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-section-title font-semibold">
            {formattedAmount}
          </span>
          <span
            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
              isPositive
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'
            }`}
          >
            {isPositive ? (
              <ArrowUpIcon className="mr-1 h-3 w-3" />
            ) : (
              <ArrowDownIcon className="mr-1 h-3 w-3" />
            )}
            {Math.abs(deviation.deviation_pct)}%
          </span>
        </div>
        <h3 className="mt-1 font-medium text-text-primary">
          {deviation.fee_category}
        </h3>
        <p className="text-sm text-text-muted">{deviation.fee_type}</p>
      </div>
      <div className="ml-4">
        <ArrowUpIcon
          className="h-6 w-6 text-text-muted"
          aria-hidden="true"
        />
      </div>
    </Card>
  );
};

export default DeviationCard; 