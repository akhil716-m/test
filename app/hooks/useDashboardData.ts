import { useState, useEffect } from 'react';
import { DashboardData, DashboardFilters } from '@/types/dashboard';

export function useDashboardData(filters: DashboardFilters) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const searchParams = new URLSearchParams({
          start_date: filters.dateRange.start.toISOString(),
          end_date: filters.dateRange.end.toISOString(),
          ...(filters.processorId && { processor_id: filters.processorId.join(',') }),
          ...(filters.businessUnitId && { business_unit_id: filters.businessUnitId.join(',') }),
          breakdown_dimension: filters.breakdownDimension,
        });

        const response = await fetch(`/api/dashboard?${searchParams}`);
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  return { data, loading, error };
} 