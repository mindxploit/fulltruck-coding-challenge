import { useRef } from 'react'
import json1 from './json1.json'
import json2 from './json2.json'

type Props = {
  aggregateBy: 'day' | 'week' | 'month'
  timeTarget: 'pickup_date' | 'created_at'
  startDate: string | null
  endDate: string | null
}

export type StatisticsResponse = {
  data_table: Array<{
    active_carrier: number;
    active_client: number;
    aggregate_date: string;
    assigned_count: number;
    margin_abs: number;
    margin_abs_per_order: number;
    margin_perc: number;
    new_carriers: number;
    new_clients: number;
    order_count: number;
    order_per_period: number;
    revenue: number;
    revenue_assigned: number;
    revenue_per_order: number;
  }>;
  histograms: {
    time_margin_perc: {
      data: Array<{
        date: string;
        margin_perc: number;
      }>;
      index_by: string;
    };
    time_order_count: {
      data: Array<{
        date: string;
        order_count: number;
      }>;
      index_by: string;
    };
    time_revenue: {
      data: Array<{
        date: string;
        margin_abs: number;
        revenue: number;
      }>;
      index_by: string;
    };
  };
  kpis: {
    carrier: {
      [key: string]: {
        label: string;
        margin_abs: number;
        margin_abs_per_order: number;
        margin_abs_perc_on_tot: number;
        margin_perc: number;
        order_count: number;
        order_count_perc_on_tot: number;
        revenue: number;
        revenue_per_order: number;
        revenue_perc_on_tot: number;
      };
    };
  };
};


/**
 * Custom hook for fetching statistics data.
 * @returns An object containing the `fetchStatistics` function.
 */
const useStatistics = () => {
  const toggleRef = useRef(false)

  /**
   * Fetches statistics data based on the provided props.
   * This function has a delay to simulate a slow network call.
   * @param props - The props object containing the necessary parameters for fetching statistics.
   * @returns A promise that resolves to the fetched statistics data.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fetchStatistics = (_: Props) => {
    toggleRef.current = !toggleRef.current
    return new Promise((resolve) => {
      const delay = Math.random() * 3000 + 500
      setTimeout(() => {
        toggleRef.current ? resolve(json1) : resolve(json2)
      }, delay)
    })
  }

  return { fetchStatistics }
}

export default useStatistics
