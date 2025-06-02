'use client';

import { useState } from 'react';
import FilterBar from './components/dashboard/FilterBar';
import DeviationCard from './components/dashboard/DeviationCard';
import KPICard from './components/dashboard/KPICard';
import TrendChart from './components/dashboard/TrendChart';
import SettlementBar from './components/dashboard/SettlementBar';
import SettlementComponents from './components/dashboard/SettlementComponents';
import DimensionBreakdown from './components/dashboard/DimensionBreakdown';
import { DashboardFilters } from './types/dashboard';
import { useDashboardData } from './hooks/useDashboardData';

export default function DashboardPage() {
  const [filters, setFilters] = useState<DashboardFilters>({
    dateRange: {
      start: new Date(),
      end: new Date(),
    },
    breakdownDimension: 'card_networks',
  });

  const { data, loading, error } = useDashboardData(filters);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg text-text-muted">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg text-brand-red">Error: {error}</div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="space-y-section-gap">
      <div className="flex items-center justify-between">
        <h1 className="text-page-title font-semibold text-text-primary">
          Welcome back
        </h1>
        <FilterBar filters={filters} onFiltersChange={setFilters} />
      </div>

      {/* Deviations Section */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-section-title font-semibold">
            Top 3 Deviations we noticed
          </h2>
          <button className="text-sm font-medium text-brand-red hover:underline">
            View All
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.deviations.map((deviation) => (
            <DeviationCard
              key={deviation.category_id}
              deviation={deviation}
              onClick={() => console.log('Navigate to deviation details')}
            />
          ))}
        </div>
      </div>

      {/* KPIs Section */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KPICard
          label="Total Sale volume"
          value={new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            notation: 'compact',
          }).format(data.kpis.total_sale.amount)}
          trendPercentage={data.kpis.total_sale.trend_pct}
          tooltipText="Total revenue processed via card payments during selected period"
        />
        <KPICard
          label="Total Payment Costs"
          value={new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            notation: 'compact',
          }).format(data.kpis.total_cost.amount)}
          trendPercentage={data.kpis.total_cost.trend_pct}
          tooltipText="Sum of all fees before netting"
        />
        <KPICard
          label="Cost of processing as % of GMV"
          value={`${data.kpis.cost_pct_gmv.amount}%`}
          trendPercentage={data.kpis.cost_pct_gmv.trend_pct}
          tooltipText="Total costs divided by total sale volume (%)"
        />
      </div>

      {/* Trend Chart */}
      <TrendChart data={data.trend} />

      {/* Settlement Section */}
      <div className="grid gap-4 lg:grid-cols-2">
        <SettlementBar settlement={data.settlement} />
        <SettlementComponents components={data.settlement_components} />
      </div>

      {/* Dimension Breakdown */}
      <DimensionBreakdown
        breakdown={data.breakdown}
        onDimensionChange={(dimension) =>
          setFilters((prev) => ({ ...prev, breakdownDimension: dimension }))
        }
      />
    </div>
  );
} 