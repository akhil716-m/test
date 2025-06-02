import { FC } from 'react';
import { SettlementComponentsType } from '@/types/dashboard';
import Card from '../shared/Card';

interface SettlementComponentsProps {
  components: SettlementComponentsType;
}

const ComponentCard: FC<{ label: string; amount: number; type: 'deduction' | 'addition' }> = ({
  label,
  amount,
  type,
}) => {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return (
    <div
      className={`rounded-lg p-3 ${
        type === 'deduction' ? 'bg-red-50' : 'bg-green-50'
      }`}
    >
      <div className="text-sm text-text-muted">{label}</div>
      <div className="text-base font-semibold text-text-primary">
        {formattedAmount}
      </div>
    </div>
  );
};

const SettlementComponents: FC<SettlementComponentsProps> = ({ components }) => {
  return (
    <Card>
      <div className="space-y-4">
        <h3 className="text-base font-semibold">
          Top Components from Deductions & Additions
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Deductions */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-text-secondary">
              Top Deductions
            </div>
            <div className="space-y-2">
              {components.deductions.map((deduction, index) => (
                <ComponentCard
                  key={index}
                  label={deduction.label}
                  amount={deduction.amount}
                  type="deduction"
                />
              ))}
            </div>
          </div>

          {/* Additions */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-text-secondary">
              Top Additions
            </div>
            <div className="space-y-2">
              {components.additions.map((addition, index) => (
                <ComponentCard
                  key={index}
                  label={addition.label}
                  amount={addition.amount}
                  type="addition"
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