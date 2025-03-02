import { useCallback, useEffect, useState } from "react";

export interface IExchangeRates {
  uuid: string;
  currency_from: string;
  currency_to: string;
  purchase: number;
  sell: number;
}

const API_URL = 'https://uralsib.ru/api/exchange-rates'

const searchParams = new URLSearchParams({
  'filter[currency]': JSON.stringify([
    ['RUR', 'USD'],
    ['RUR', 'EUR'],
    ['RUR', 'CNY'],
  ]),
  'filter[region]': '77',
  'filter[type]': 'online',
});

export function useGetExchangeRates() {
  const [data, setData] = useState<IExchangeRates[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(() => {
    setLoading(true);

    fetch(`${API_URL}?${searchParams.toString()}`)
    .then(res => res.json())
    .then((res: { data: IExchangeRates[] }) => setData(res.data))
    .catch(e => console.log(e))
    .finally(() => setLoading(false))
  }, []);

  useEffect(() => fetchData(), []);

  return {
    data,
    loading,
    refetch: fetchData,
  };
}