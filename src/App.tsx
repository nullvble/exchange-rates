import './App.scss'
import { ExchangeRatesCard } from './components'
import { useGetExchangeRates } from './api-hook/exchange-rates'

function App() {
  const { data, loading, refetch } = useGetExchangeRates();

  return (
    <div>
      <h1>Текущий курс валют</h1>
      <button disabled={loading} onClick={refetch}>Обновить</button>
      <ExchangeRatesCard data={data} loading={loading} />
    </div>  
  )
}

export default App
