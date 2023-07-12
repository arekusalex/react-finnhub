import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Graph from "./components/Graph";
import LeftForm from "./components/LeftForm";
import TopCards from "./components/TopCards";
import './App.css';
import {StockData} from "./interfaces/StockData";

const finnhub = require('finnhub');

function App() {
    const [stocks, setStocks] = useState<StockData[]>([]);
    const [selectedStock, setSelectedStock] = useState<string>('');
    const [alertPrice, setAlertPrice] = useState<number>(0);
    const [stockValue, setStockValue] = useState<number>(0);
    const [marginChange, setMarginChange] = useState<number>(0);
    const [stockValues, setStockValues] = useState<number[]>([]);

    useEffect(() => {
        const api_key = finnhub.ApiClient.instance.authentications['api_key'];
        api_key.apiKey = "cimees9r01qlsedsc2sgcimees9r01qlsedsc2t0";
        const finnhubClient = new finnhub.DefaultApi();

        const fetchStocks = async () => {
            try {
                const response = await axios.get('https://finnhub.io/api/v1/stock/symbol?exchange=US&token=cimees9r01qlsedsc2sgcimees9r01qlsedsc2t0');
                const availableStocks: StockData[] = response.data.map((stock: any) => ({
                    symbol: stock.symbol,
                    name: stock.description,
                    currentPrice: 0,
                    previousClosePrice: 0,
                }));
                setStocks(availableStocks);
            } catch (error) {
                console.error('Error fetching stocks:', error);
            }
        };

        fetchStocks();

        const socket = new WebSocket('wss://ws.finnhub.io?token=cimees9r01qlsedsc2sgcimees9r01qlsedsc2t0');

        socket.addEventListener('open', function (event) {
            socket.send(JSON.stringify({'type': 'subscribe', 'symbol': selectedStock}))
        });


        socket.addEventListener('message', function (event) {
            const stockData = JSON.parse(event.data);
            const newStockValue = stockData.data[0].p;
            const newMarginChange = stockData.data[0].dp;
            setStockValue(newStockValue);
            setMarginChange(newMarginChange);

            setStockValues(prevStockValues => [...prevStockValues, newStockValue]);
        });

    }, [selectedStock])

    const handleStockChange = (stock: string) => {
        setSelectedStock(stock);
    };

    const handleAlertChange = (alert: number) => {
        setAlertPrice(alert);
    };

    return (
        <div>
            <LeftForm stocks={stocks} onStockChange={handleStockChange} onAlertChange={handleAlertChange} />
            <TopCards stockName={selectedStock} stockValue={stockValue} marginChange={marginChange}
                      alertPrice={alertPrice}/>
            <Graph stockValues={stockValues}/>
        </div>
    );
}

export default App;
