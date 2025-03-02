import { IExchangeRates } from '../../api-hook/exchange-rates';
import './ExchangeRatesCard.scss';

export interface ExchangeRatesCardProps {
    loading?: boolean;
    data: IExchangeRates[];
}

const currencyFormatter = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUR' }).format;

export function ExchangeRatesCard({ loading, data }: ExchangeRatesCardProps) {
    return (
        <div className="exchange-rate-card">
            {!data.length && loading && 'Loading...'}
            {data.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Валюта</th>
                            <th>Продать</th>
                            <th>Купить</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(rate => (
                            <tr key={rate.uuid}>
                                <th>{rate.currency_to}</th>
                                <td>
                                    {loading ? <div className="exchange-rate-card--skeleton" /> : (
                                        currencyFormatter(rate.purchase)
                                    )}
                                </td>
                                <td>
                                    {loading ? <div className="exchange-rate-card--skeleton" /> : (
                                        currencyFormatter(rate.sell)
                                    )}
                                </td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
            )}
        </div>
    )
}