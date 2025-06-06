'use client';

import { useState } from 'react';
import FilterBar from './components/dashboard/FilterBar';
import DeviationCard from './components/dashboard/DeviationCard';
import KPICard from './components/dashboard/KPICard';
import TrendChart from './components/dashboard/TrendChart';
import SettlementBar from './components/dashboard/SettlementBar';
import SettlementComponents from './components/dashboard/SettlementComponents';
import DimensionBreakdown from './components/dashboard/DimensionBreakdown';
import { DashboardFilters, DeviationType } from './types/dashboard';
import { useDashboardData } from './hooks/useDashboardData';
import TestDataForm from './components/TestDataForm';

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
    <div className="min-h-screen bg-gray-50 pl-[240px]">
      <div className="px-8 py-6 space-y-8">
        {/* Banner */}
        <div className="bg-[#FFF9E7] rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-sm text-gray-700">Get deeper insights into your payments cost by connecting your fee data with us!</span>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
            Connect your data
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Welcome Joe</h1>
              <p className="text-sm text-gray-500">Complete visibility into your card payment costs</p>
            </div>
            <FilterBar filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* Deviations Section */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium px-3 py-1 bg-red-50 text-red-700 rounded-full">September</span>
                  <h2 className="text-lg font-semibold text-gray-900">Top 3 Deviations we noticed</h2>
                </div>
                <p className="text-sm text-gray-500 mt-1">Please look into the details for detailed insights</p>
              </div>
              <button className="text-sm font-medium text-red-600 hover:text-red-700">
                View All
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.deviations.map((deviation: DeviationType) => (
                <DeviationCard
                  key={deviation.category_id}
                  deviation={deviation}
                  onClick={() => console.log('Navigate to deviation details')}
                />
              ))}
            </div>
          </div>

          {/* KPIs Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Card transactions stats</h2>
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
      </div>
      <TestDataForm />
    </div>
  );
} 