import logo from "./logo.svg";
import "./App.css";
import Chart from "./components/Chart";
import { useState, useEffect } from "react";
import WatchList from "./components/WatchList";
import Wallet from "./components/Wallet";

const defaultWatchList = [
  { id: "bitcoin", symbol: "btc", name: "Bitcoin" },
  { id: "ethereum", symbol: "eth", name: "Ethereum" },
  { id: "binancecoin", symbol: "bnb", name: "BNB" },
];

function App() {
  const [allCoins, setAllCoins] = useState([]);
  const [watchListCoins, setWatchListCoins] = useState(defaultWatchList);
  const [coinPrices, setCoinPrices] = useState([]);
  // [
  //       { coindId: 'bitcoin', prices: [      ]},
  //       { coindId: 'etherum', prices: [      ]},
  //  ]
  

  const fetchCoinPrices = async (coinId) => {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=30`
    );
    const data = await res.json();
    setCoinPrices([...coinPrices, { coinId, prices: data.prices }]);
  };

  const fetchDefaultCoinsPrices = async() => {
    const result = await Promise.all(defaultWatchList.map(async (coin) => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=30`
      );
      const data = await res.json();
      return {coinId: coin.id, prices: data.prices};
    }));
    setCoinPrices(result);
  }

  const fetchAllCoins = async () => {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/list?include_platform=false"
    );
    const data = await res.json();
    setAllCoins(data);
  };

  useEffect(() => {
    fetchAllCoins();
    fetchDefaultCoinsPrices();    
  }, []);

  const onWatchListCoinAdded = (coinId) => {
    setWatchListCoins([
      ...watchListCoins,
      allCoins.find((coin) => coin.id === coinId),
    ]);
    fetchCoinPrices(coinId);
  };

  const onWatchListCoinDeleted = (coinId) => {
    setWatchListCoins(watchListCoins.filter((coin) => coin.id !== coinId));
    setCoinPrices(coinPrices.filter(coin => coin.coinId !== coinId));
  };

  
  return (
    <div className="App">
      <div className="left-panel">
        <WatchList
          allCoins={allCoins}
          watchListCoins={watchListCoins}
          onWatchListCoinAdded={onWatchListCoinAdded}
          onWatchListCoinDeleted={onWatchListCoinDeleted}
        />
        <Wallet />
      </div>
      <div className="right-panel">
        <Chart coinPrices={coinPrices} />
      </div>

      {/* <CoinList onCoinSelected={onCoinSelected}/> */}
    </div>
  );
}

export default App;
