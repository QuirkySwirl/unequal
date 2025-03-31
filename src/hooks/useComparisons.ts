import useSWR from 'swr';
import { fetchCountryGDPs, fetchGlobalIndicators } from '../lib/api';

export function useCountryGDPs() {
  return useSWR('countryGDPs', fetchCountryGDPs, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });
}

export function useGlobalIndicators() {
  return useSWR('globalIndicators', fetchGlobalIndicators, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });
}