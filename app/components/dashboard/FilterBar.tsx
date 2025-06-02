import { FC } from 'react';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { DashboardFilters } from '@/types/dashboard';

interface FilterBarProps {
  filters: DashboardFilters;
  onFiltersChange: (filters: DashboardFilters) => void;
}

const FilterBar: FC<FilterBarProps> = ({ filters, onFiltersChange }) => {
  const currentMonth = format(new Date(), 'MMMM, yyyy');

  return (
    <div className="mb-6 flex items-center justify-end space-x-4">
      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          {currentMonth}
          <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Menu.Button>
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="p-2">
            {/* Date picker implementation will go here */}
            <div className="px-4 py-2 text-sm text-gray-500">
              Date picker coming soon...
            </div>
          </div>
        </Menu.Items>
      </Menu>

      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Processor
          <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Menu.Button>
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="p-2">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900`}
                >
                  All Processors
                </button>
              )}
            </Menu.Item>
            {/* Add more processor options here */}
          </div>
        </Menu.Items>
      </Menu>

      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Business Unit
          <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Menu.Button>
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="p-2">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900`}
                >
                  All Business Units
                </button>
              )}
            </Menu.Item>
            {/* Add more business unit options here */}
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default FilterBar; 