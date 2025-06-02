import { FC } from 'react';
import { SettlementType } from '@/types/dashboard';
import Card from '../shared/Card';

interface SettlementBarProps {
  settlement: SettlementType;
}

const SettlementBar: FC<SettlementBarProps> = ({ settlement }) => {
  const formattedNetSettled = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(settlement.net_settled);

  // Calculate percentages for bar segments
  const totalWidth = settlement.total_revenue;
  const deductionsPercent = (settlement.total_deductions / totalWidth) * 100;
  const additionsPercent = (settlement.total_additions / totalWidth) * 100;
  const settledPercent = 100 - deductionsPercent + additionsPercent;

  return (
    <Card>
      <div className="space-y-4">
        <div>
          <div className="text-3xl font-semibold text-text-primary">
            {formattedNetSettled}
          </div>
          <div className="text-sm text-text-muted">
            Settled after Adjustments & Deductions
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-text-secondary">
            Total Sale Gross (Revenue)
          </div>
          <div className="h-8 w-full overflow-hidden rounded-lg bg-gray-100">
            <div className="flex h-full">
              <div
                className="bg-brand-green"
                style={{ width: `${settledPercent}%` }}
              />
              <div
                className="bg-brand-red"
                style={{ width: `${deductionsPercent}%` }}
              />
              <div
                className="bg-gray-300"
                style={{ width: `${additionsPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-brand-green" />
              <span>
                Settled amount/Profit –{' '}
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(settlement.net_settled)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-brand-red" />
              <span>
                Deductions –{' '}
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(settlement.total_deductions)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-gray-300" />
              <span>
                Additions –{' '}
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(settlement.total_additions)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SettlementBar; 