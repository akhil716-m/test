import { FC } from 'react';
import { SettlementComponentsType, SettlementComponentItem } from '@/types/dashboard';
import Card from '../shared/Card';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';

interface SettlementComponentsProps {
  components: SettlementComponentsType;
}

const ComponentCard: FC<{
  label: string;
  amount: number;
  type: 'deduction' | 'addition';
  trend?: number;
}> = ({ label, amount, type, trend }) => {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return (
    <div
      className={`rounded-lg p-4 transition-all duration-200 hover:shadow-sm ${
        type === 'deduction' 
          ? 'bg-red-50 hover:bg-red-100' 
          : 'bg-green-50 hover:bg-green-100'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="text-sm text-text-muted">{label}</div>
          <div className="text-lg font-semibold text-text-primary">
            {formattedAmount}
          </div>
        </div>
        {trend !== undefined && (
          <div
            className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
              trend > 0
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'
            }`}
          >
            {trend > 0 ? (
              <ArrowTrendingUpIcon className="h-3 w-3" />
            ) : (
              <ArrowTrendingDownIcon className="h-3 w-3" />
            )}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
    </div>
  );
};

const SettlementComponents: FC<SettlementComponentsProps> = ({ components }) => {
  return (
    <Card>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">
            Settlement Components
          </h3>
          <p className="text-sm text-text-muted">
            Breakdown of major additions and deductions affecting your settlement
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Deductions */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-text-secondary">
                Top Deductions
              </div>
              <div className="text-xs text-text-muted">
                vs. Last Period
              </div>
            </div>
            <div className="space-y-3">
              {components.deductions.map((deduction: SettlementComponentItem, index: number) => (
                <ComponentCard
                  key={index}
                  label={deduction.label}
                  amount={deduction.amount}
                  type="deduction"
                  trend={deduction.trend_pct ?? 5} // Use actual trend if available
                />
              ))}
            </div>
          </div>

          {/* Additions */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-text-secondary">
                Top Additions
              </div>
              <div className="text-xs text-text-muted">
                vs. Last Period
              </div>
            </div>
            <div className="space-y-3">
              {components.additions.map((addition: SettlementComponentItem, index: number) => (
                <ComponentCard
                  key={index}
                  label={addition.label}
                  amount={addition.amount}
                  type="addition"
                  trend={addition.trend_pct ?? -3} // Use actual trend if available
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SettlementComponents; 